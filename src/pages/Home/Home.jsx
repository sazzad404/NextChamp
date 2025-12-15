import React, { useContext } from "react";
import HeroBanner from "../../components/HeroBanner";
import PopularContest from "./popularContest";
import { AuthContext } from "../../Provider/AuthProvider";
import FeaturesSection from "../../components/FeaturesSection";
import HowItWorksSection from "../../components/HowItWorkSection";
import UpcomingContest from "../../components/UpcomingContest";
import SponsorsSection from "../../components/SponsorsSection ";
import WinnerAdSctions from "../../components/WinnerAdSctions";

const Home = () => {
  return (
    <div>
      <HeroBanner></HeroBanner>
      <FeaturesSection></FeaturesSection>

      <PopularContest></PopularContest>
      <WinnerAdSctions></WinnerAdSctions>
      <HowItWorksSection></HowItWorksSection>
      <UpcomingContest></UpcomingContest>
      <SponsorsSection></SponsorsSection>
    </div>
  );
};

export default Home;
