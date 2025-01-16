import React, { useEffect, useState } from "react";
import Header from "@/components/Header/Header";
import BoulderItem from "@/components/BoulderItem/BoulderItem";
import { fetchBoulders } from "@/api/BoulderApi"; // Use an API utility
import styles from "./styles.module.css";

const BouldersPage = () => {
  const [boulders, setBoulders] = useState([]);
  const [filteredBoulders, setFilteredBoulders] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortType, setSortType] = useState("");

  // Fetch boulders on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBoulders(); // Fetch boulders using the API utility
        setBoulders(data);
        setFilteredBoulders(data);
      } catch (error) {
        console.error("Error fetching boulders:", error);
      }
    };

    fetchData();
  }, []);

  // Handle sorting logic
  const handleSortChange = (event) => {
    const value = event.target.value;
    setSortType(value);

    let sortedBoulders = [...boulders];

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

  // Toggle sorting order
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));

    let sortedBoulders = [...filteredBoulders];
    sortedBoulders.reverse();

    setFilteredBoulders(sortedBoulders);
  };

  return (
    <div className={styles.container}>
      <Header />

      {/* Filter Section */}
      <div className={styles.filters}>
        <label htmlFor="sortType">Sort By: </label>
        <select
          id="sortType"
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

      {/* Boulder List Section */}
      <div className={styles.boulderList}>
        {filteredBoulders.map((boulder) => (
          <BoulderItem key={boulder.id} boulder={boulder} />
        ))}
      </div>
    </div>
  );
};

export default BouldersPage;
