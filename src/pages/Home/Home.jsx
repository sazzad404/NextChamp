import React from 'react';
import HeroBanner from '../../components/HeroBanner';
import PopularContest from './popularContest';

const Home = () => {
    return (
        <div>
           <HeroBanner></HeroBanner>
           <PopularContest></PopularContest>
        </div>
    );
};

export default Home;