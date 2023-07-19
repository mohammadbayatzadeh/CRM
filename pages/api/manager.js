import Manager from "@/models/Manager";
import connectDB from "@/utils/connectDB";
import { verifyToken } from "@/utils/functions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
    } catch (err) {
      return res
        .status(500)
        .json({ status: "failed", message: " error in connecting to db" });
    }

    const { jwtToken } = req.cookies;
    const secretKey = process.env.SECRET_KEY;

    if (!jwtToken) {
      return res
        .status(404)
        .json({ status: "failed", message: "you are not logged in" });
    }

    const result = verifyToken(jwtToken, secretKey);

    const manager = await Manager.findOne({ email: result.email });

    if (result ) {
      return res.status(200).json({ status: "success", data: manager });
    } else {
      return res
        .status(422)
        .json({ status: "failed", message: "you are not authorized" });
    }
  }
}
