import Manager from "@/models/Manager";
import connectDB from "@/utils/connectDB";
import { hashPassword } from "@/utils/functions";
import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
    } catch (err) {
      return res
        .status(500)
        .json({ status: "failed", message: " error in connecting to db" });
    }
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(404)
        .json({ status: "failed", message: "invalid data" });
    }

    const exitingManager = await Manager.findOne({ email });
    if (exitingManager) {
      return res.status(401).json({
        status: "failed",
        message: "this Manager already hast an account",
      });
    }
    const hashedPassword = await hashPassword(password);
    const expireTime = 60 * 60 * 24;
    const secretKey = process.env.SECRET_KEY;
    const token = sign({ email }, secretKey, {
      expiresIn: expireTime,
    });
    const serialized = serialize("jwtToken", token, {
      httpOnly: true,
      maxAge: expireTime,
      path: "/",
      sameSite: true,
    });
    const manager = await Manager.create({ email, password: hashedPassword });
    return res
      .status(200)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "success", message: "account created", data: manager });
  }
}
