import Manager from "@/src/models/Manager";
import connectDB from "@/src/utils/connectDB";
import { verifyToken } from "@/src/utils/functions";

export default async function handler(req, res) {
  const id = req.query.costumerID;
  const { jwtToken } = req.cookies;
  const { data } = req.body || {};
  try {
    await connectDB();
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "error in connecting to db" });
  }
  const result = verifyToken(jwtToken);
  if (result) {
    const manager = await Manager.findOne({ email: result.email });
    if (req.method === "DELETE") {
      try {
        const newCostumers = manager.costumers.filter((item) => item._id != id);
        manager.costumers = newCostumers;
        await manager.save();

        res
          .status(200)
          .json({ status: "success", message: "costumer deleted" });
      } catch (err) {
        res
          .status(500)
          .json({ status: "failed", message: "error in deleting costumer" });
      }
    }
    if (req.method === "PATCH") {
      try {
        const oldCostumer = manager.costumers.filter((item) => item._id != id);
        manager.costumers = [
          { ...data, updatedAt: Date.now() },
          ...oldCostumer,
        ];

        await manager.save();
        res.status(200).json({
          status: "success",
          message: "data updated in db",
          data: manager,
        });
      } catch (err) {
        res
          .status(500)
          .json({ status: "failed", message: "error in updating data in db" });
      }
    }
  } else {
    return res
      .staus(422)
      .json({ status: "failed", message: "you are not authorized" });
  }
}
