import React, { useContext } from "react";
import HeroBanner from "../../components/HeroBanner";
import PopularContest from "./popularContest";
import { AuthContext } from "../../Provider/AuthProvider";

const Home = () => {
  const { setIsdark, isdark } = useContext(AuthContext);

  return (
    <div>
      <HeroBanner></HeroBanner>
      <input
        type="checkbox"
        checked={isdark}
        onChange={() => setIsdark(!isdark)}
        value={isdark}
        className="toggle theme-controller"
      />
      <PopularContest></PopularContest>
    </div>
  );
};

export default Home;
