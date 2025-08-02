import { Link } from "react-router";

const PackageCard = ({ pkg }) => (
    <div className="card bg-neutral shadow-xl hover:shadow-2xl transition-shadow">
        <figure className="h-48 overflow-hidden">
            <img src={pkg.image} alt={pkg.tourName} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body">
            <h3 className="card-title text-text">{pkg.tourName}</h3>
            <div className="flex items-center mt-2">
                <div className="avatar mr-3">
                    <div className="w-8 rounded-full">
                        <img src={pkg.guidePhoto} alt={pkg.guideName} />
                    </div>
                </div>
                <span className="text-sm text-text">{pkg.guideName}</span>
            </div>
            <div className="flex justify-between mt-4 text-sm">
                <span>⏱️ {pkg.duration}</span>
                <span>📅 {new Date(pkg.departureDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-primary">৳{pkg.price}</span>
                <Link to={`/packages/${pkg._id}`} className="btn btn-sm btn-primary text-neutral-content">
                    View Details
                </Link>
            </div>
        </div>
    </div>
);
export default PackageCard;