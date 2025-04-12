import connectDB from "@/src/utils/connectDB";
import { verifyToken } from "@/src/utils/functions";

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

    if (!jwtToken) {
      return res
        .status(404)
        .json({ status: "failed", message: "you are not logged in" });
    }

    const result = jwtToken && verifyToken(jwtToken);

    if (result) {
      return res.status(200).json({ status: "success", data: result.email });
    } else {
      return res
        .status(422)
        .json({ status: "failed", message: "you are not authorized" });
    }
  }
}
