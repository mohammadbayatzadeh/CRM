import HomePage from "@/components/templates/HomePage";
import Costumer from "@/models/Costumer";
import connectDB from "@/utils/connectDB";
import React from "react";

function Home({ costumers }) {
  return <HomePage costumers={costumers} />;
}

export default Home;

export async function getServerSideProps() {
  try {
    await connectDB();
    const costumers = await Costumer.find();
    return {
      props: {
        costumers: JSON.parse(JSON.stringify(costumers)),
      },
    };
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }
}
