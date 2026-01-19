import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import { useLoaderData } from 'react-router';
import LatestArtCard from '../Components/LatestArtCard';
import TopArtists from '../Components/TopArtists';
import CommunityHighlights from '../Components/CommunityHighlights';
import { Fade } from "react-awesome-reveal"; 
import SparkLightAnimation from '../Components/SparkLightAnimation';

const Home = () => {
    const data = useLoaderData();

    return (
        <div>
            {/* <HeroSlider /> */}
            <SparkLightAnimation />

            <section className='py-5'>
                <h1 className='text-3xl text-center font-bold py-3'>Featured Artworks</h1>
                
                
                <Fade cascade damping={0.1} triggerOnce>
                    <div className='w-8/12 mt-3 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3'>
                        {
                            data.map(art => <LatestArtCard key={art._id} art={art} />)
                        }
                    </div>
                </Fade>

                <TopArtists />
                <CommunityHighlights />
            </section>
        </div>
    );
};

export default Home;
