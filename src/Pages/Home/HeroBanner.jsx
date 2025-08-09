import { Link } from "react-router";

const HeroBanner = () => (
    <div className="hero min-h-screen bg-[url('https://t4.ftcdn.net/jpg/08/14/51/95/360_F_814519583_aBeKi1mOCclfWWDRFOFlgtbQfrzViphL.jpg')] bg-content bg-center">
        <div className="hero-overlay bg-opacity-90"></div>
        <div className="w-[90vw] text-foreground flex justify-end align-middle">
            <div className="max-w-max text-right">
                <h1 className="text-5xl font-bold mb-6">Discover Your Perfect Getaway</h1>
                <p className="mb-8 text-lg">Explore breathtaking destinations with our expertly crafted tour packages</p>
                <Link to="/allpackages" className="btn bg-primary btn-lg text-neutral-content">
                    Explore All Packages
                </Link>
            </div>
        </div>
    </div>
);

export default HeroBanner;