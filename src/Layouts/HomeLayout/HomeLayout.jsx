import React, { use, useState } from 'react';
import HeroBanner from '../../Pages/Home/HeroBanner';
import { AuthContext } from '../../Provider/AuthContext';
import FeaturedPackages from '../../Pages/Home/FeaturedPackages';
import WhyChooseUs from '../../Pages/Home/WhyChooseUs';
import Testimonials from '../../Pages/Home/Testimonials';

const HomeLayout = () => {
        const { user } = use(AuthContext);
    const [featuredPackages, setFeaturedPackages] = useState([]);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch('http://localhost:4000/packages?limit=6')
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
                <Testimonials></Testimonials>
        </div>
    );
};

export default HomeLayout;