import React from "react";
import { Link } from "@reach/router";

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          <Link to="/weather-history">Weather History</Link>
        </li>
        <li>
          <Link to="/crypto-tracker">Crypto Tracker</Link>
        </li>
        <li>
          <Link to="/asdfasf">Not Found</Link>
        </li>
      </ul>
    </div>
  );
};

export default HomePage;
