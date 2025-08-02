import { Link } from "react-router";
import PackageCard from "./PackageCard";

const FeaturedPackages = ({ packages, loading }) => (
    <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-primary">Featured Tour Packages</h2>
        
        {loading ? (
            <div className="flex justify-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        ) : (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map(pkg => (
                        <PackageCard key={pkg._id} pkg={pkg} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <Link to="/allpackages" className="btn btn-outline btn-primary">
                        Show All Packages
                    </Link>
                </div>
            </>
        )}
    </section>
);


export default FeaturedPackages;