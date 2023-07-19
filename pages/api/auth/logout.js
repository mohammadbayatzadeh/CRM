import connectDB from "@/utils/connectDB";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
    } catch (err) {
      return res
        .status(500)
        .json({ status: "failed", message: " error in connecting to db" });
    }

    const serialized = serialize("jwtToken", "", {
      httpOnly: true,
      maxAge: 0,
      path: "/",
    });

    return res
      .status(200)
      .setHeader("Set-Cookie", serialized)
      .json({ status: "success", message: "logged out" });
  }
}
