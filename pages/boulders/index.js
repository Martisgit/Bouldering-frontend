import React, { useEffect, useState } from "react";
import axios from "axios";
import BoulderItem from "@/components/BoulderItem/BoulderItem";
import Header from "@/components/Header/Header";
import styles from "./styles.module.css";

const BouldersPage = () => {
  const [boulders, setBoulders] = useState([]);
  const [filteredBoulders, setFilteredBoulders] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    axios
      .get("http://localhost:3002/boulders")
      .then((response) => {
        setBoulders(response.data.boulders);
        setFilteredBoulders(response.data.boulders);
      })
      .catch((error) => console.error("Error fetching boulders:", error));
  }, []);

  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortType(value);

    let sortedBoulders = [...filteredBoulders];

    if (value === "difficulty") {
      sortedBoulders.sort((a, b) =>
        sortOrder === "asc"
          ? a.difficulty - b.difficulty
          : b.difficulty - a.difficulty
      );
    } else if (value === "gym") {
      sortedBoulders.sort((a, b) =>
        sortOrder === "asc"
          ? a.gym.localeCompare(b.gym)
          : b.gym.localeCompare(a.gym)
      );
    }

    setFilteredBoulders(sortedBoulders);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");

    let sortedBoulders = [...filteredBoulders];

    if (sortType === "difficulty") {
      sortedBoulders.reverse();
    } else if (sortType === "gym") {
      sortedBoulders.reverse(); // Reverse order
    }

    setFilteredBoulders(sortedBoulders);
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.filters}>
        <label>Sort By: </label>
        <select
          value={sortType}
          onChange={handleSortChange}
          className={styles.select}
        >
          <option value="">None</option>
          <option value="difficulty">Difficulty</option>
          <option value="gym">Gym</option>
        </select>

        <button onClick={toggleSortOrder} className={styles.sortButton}>
          {sortOrder === "asc" ? "⬆ Ascending" : "⬇ Descending"}
        </button>
      </div>

      <div className={styles.boulderList}>
        {filteredBoulders.map((boulder) => (
          <BoulderItem key={boulder.id} boulder={boulder} />
        ))}
      </div>
    </div>
  );
};

export default BouldersPage;
