import React from 'react';
import { useLoaderData } from 'react-router';
import ArtCard from '../Components/ArtCard';

const ExploreArtworks = () => {
    const data = useLoaderData();
    console.log(data);
    
    return (
        <div className="min-h-screen bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] py-20 px-6">
            <h1 className='text-4xl text-white font-bold text-center mt-3'>All Arts</h1>
            <div className='w-8/12 mt-3 mx-auto grid grid-cols-1 lg:grid-cols-3 gap-3'>
                {
                    data.map(art => <ArtCard art={art}></ArtCard>)
                }
            </div>
        </div>
    );
};

export default ExploreArtworks;