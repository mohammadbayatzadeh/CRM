import Costumer from "@/models/Costumer";
import connectDB from "@/utils/connectDB";

export default async function handler(req, res) {
  const id = req.query.costumerID;
  const { data } = req.body || {};
  try {
    await connectDB();
  } catch (err) {
    res
      .status(500)
      .json({ status: "failed", message: "error in connecting to db" });
  }
  if (req.method === "GET") {
    try {
      console.log(id);
      const costumer = await Costumer.findById(id);
      res.status(200).json({
        status: "success",
        message: "data fetched from db",
        data: costumer,
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "failed", message: "error in fetching data from db" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Costumer.findByIdAndDelete(id);
      res.status(200).json({ status: "success", message: "costumer deleted" });
    } catch (err) {
      res
        .status(500)
        .json({ status: "failed", message: "error in deleting costumer" });
    }
  }
  if (req.method === "PATCH") {
    try {
      const costumer = await Costumer.findOneAndUpdate(
        { _id: id },
        { ...data }
      );
      res.status(200).json({
        status: "success",
        message: "data updated in db",
      });
    } catch (err) {
      res
        .status(500)
        .json({ status: "failed", message: "error in updating data in db" });
    }
  }
}
