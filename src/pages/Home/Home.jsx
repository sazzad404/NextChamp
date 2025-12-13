import React, { useContext } from "react";
import HeroBanner from "../../components/HeroBanner";
import PopularContest from "./popularContest";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {


  return (
    <div>
      <HeroBanner></HeroBanner>
      
      <PopularContest></PopularContest>
    </div>
  );
};

export default Home;
