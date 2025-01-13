import React, { useEffect, useState } from "react";
import axios from "axios";
import BoulderItem from "../../components/BoulderItem/BoulderItem";
import Header from "../../components/Header/Header";

const BouldersPage = () => {
  const [boulders, setBoulders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3002/boulders")
      .then((response) => setBoulders(response.data.boulders))
      .catch((error) => console.error("Error fetching boulders:", error));
  }, []);

  return (
    <div>
      <Header />
      {boulders.map((boulder) => (
        <BoulderItem key={boulder.id} boulder={boulder} />
      ))}
    </div>
  );
};

export default BouldersPage;
