import React from "react";
import Card from "../modules/Card";

function HomePage({ costumers }) {
  return (
    <>
      {costumers.length ? costumers.map((costumer) => (
        <Card key={costumer._id} {...costumer} />
      )) : <h2>there is no costumer...</h2>}
    </>
  );
}

export default HomePage;
