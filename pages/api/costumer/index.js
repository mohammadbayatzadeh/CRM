import Manager from "@/models/Manager";
import connectDB from "@/utils/connectDB";
import { verifyToken } from "@/utils/functions";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "Failed", message: "error in connecting to DB" });
    return;
  }

  if (req.method === "POST") {
    const { data } = req.body;

    if (!data.firstName || !data.lastName || !data.email) {
      return res
        .status(400)
        .json({ status: "Failed", message: "invalid data" });
    }
    const { jwtToken } = req.cookies;
    const result = verifyToken(jwtToken);

    if (!result) {
      return res
        .status(422)
        .json({ status: "Failed", message: "you are not authorized" });
    }

    const manager = await Manager.findOne({ email: result.email });
    
    try {
      manager.costumers.push(data);
      await manager.save();
      res
        .status(201)
        .json({ status: "Success", message: "data created", data: manager });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: "Failed", message: "error in storing to DB" });
    }
  }
}
