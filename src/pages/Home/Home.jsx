import React, { useContext } from "react";
import HeroBanner from "../../components/HeroBanner";
import PopularContest from "./popularContest";
import { AuthContext } from "../../Provider/AuthProvider";
import FeaturesSection from "../../components/FeaturesSection";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <FeaturesSection></FeaturesSection>

      <PopularContest></PopularContest>
    </div>
  );
};

export default Home;
