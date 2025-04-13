import Manager from "@/src/models/Manager";
import connectDB from "@/src/utils/connectDB";
import { verifyToken } from "@/src/utils/functions";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (err) {
    res
      .status(500)
      .json({ status: "Failed", message: "error in connecting to DB" });
    return;
  }

  if (req.method === "POST") {
    const { data } = req.body;

    if (
      !data.firstName_EN ||
      !data.lastName_EN ||
      !data.firstName_FA ||
      !data.lastName_FA ||
      !data.email ||
      !data.birthday
    ) {
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
