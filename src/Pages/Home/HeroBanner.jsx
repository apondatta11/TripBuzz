import { Link } from "react-router";

const HeroBanner = () => (
    <div className="hero min-h-[60vh] bg-[url('https://i.imgur.com/beach-banner.jpg')] bg-cover bg-center">
        <div className="hero-overlay bg-opacity-60 bg-primary"></div>
        <div className="hero-content text-center text-neutral-content">
            <div className="max-w-2xl">
                <h1 className="text-5xl font-bold mb-6">Discover Your Perfect Getaway</h1>
                <p className="mb-8 text-lg">Explore breathtaking destinations with our expertly crafted tour packages</p>
                <Link to="/allpackages" className="btn btn-primary btn-lg text-neutral-content">
                    Explore All Packages
                </Link>
            </div>
        </div>
    </div>
);
export default HeroBanner;