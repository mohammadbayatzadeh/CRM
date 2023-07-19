import Costumer from "@/models/Manager";
import connectDB from "@/utils/connectDB";

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

    if (!data.firstName || !data.lastName || !data.email)
      return res
        .status(400)
        .json({ status: "Failed", message: "invalid data" });

    try {
      const costumer = await Costumer.create(data);
      res
        .status(201)
        .json({ status: "Success", message: "data created", data: costumer });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ status: "Failed", message: "error in storing to DB" });
    }
  }
}
