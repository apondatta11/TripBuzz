import React, { use, useState } from 'react';
import HeroBanner from '../../Pages/Home/HeroBanner';
import { AuthContext } from '../../Provider/AuthContext';
import FeaturedPackages from '../../Pages/Home/FeaturedPackages';
import WhyChooseUs from '../../Pages/Home/WhyChooseUs';
import Testimonials from '../../Pages/Home/Testimonials';
import FAQs from '@/Pages/Home/FAQ';

const HomeLayout = () => {
        const { user } = use(AuthContext);
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch('https://cse-2100-project-server.vercel.app/packages?limit=6')
            .then(res => res.json())
            .then(data => {
                setFeaturedPackages(data);
                setLoading(false);
            });
    }, []);
    return (
        <div className=''>
            <HeroBanner></HeroBanner>
            <FeaturedPackages   
                packages={featuredPackages}
                loading={loading}></FeaturedPackages>
                <WhyChooseUs></WhyChooseUs>
                <FAQs></FAQs>
        </div>
    );
};

export default HomeLayout;