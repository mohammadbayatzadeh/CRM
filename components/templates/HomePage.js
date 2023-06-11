import React from "react";
import Card from "../modules/Card";

function HomePage({ costumers }) {
  return (
    <>
      {costumers.map((costumer) => (
        <Card key={costumer._id} {...costumer} />
      ))}
    </>
  );
}

export default HomePage;
