import React from 'react';
import HeroSlider from '../Components/HeroSlider';
import { useLoaderData } from 'react-router';
import LatestArtCard from '../Components/LatestArtCard';
import TopArtists from '../Components/TopArtists';
import CommunityHighlights from '../Components/CommunityHighlights';

const Home = () => {
    const data = useLoaderData()
    return (
        <div>
            <HeroSlider></HeroSlider>
            <section className='py-5'>
                <h1 className='  text-3xl text-center font-bold py-3'>Featured Artworks</h1>
                <div className='w-8/12 mt-3 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3'>
                    {
                        data.map(art => <LatestArtCard art={art}></LatestArtCard>)
                    }
                </div>
                <TopArtists />
                <CommunityHighlights />
            </section>
        </div>
    );
};

export default Home;