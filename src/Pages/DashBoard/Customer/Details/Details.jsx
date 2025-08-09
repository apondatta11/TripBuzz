

// without shadcn's components
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { FaCalendarAlt, FaMapMarkerAlt, FaClock, FaDollarSign, FaUser } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from 'react-icons/fa6';


const Details = () => {
    const { id } = useParams();
    const [listing, setListing] = useState(null);

    useEffect(() => {
        fetch(`https://cse-2100-project-server.vercel.app/packages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setListing(data);
            });
    }, [id]);

    if (!listing) return (
        <div className="flex justify-center items-center h-screen">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );

    const { tourName,image, duration, departureDate, departureLocation, destination, price, details, guidePhoto, guideName, guideEmail } = listing;

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <h1 className="text-4xl font-bold text-foreground">{tourName}</h1>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{details}</p>
                </div>

                {/* Main Image */}
                <div className="rounded-xl overflow-hidden shadow-lg">
                    <img 
                        // src="https://i.ibb.co/mCk4Nj3n/photo-1549300461-11c5b94e8855.jpg" 
                        src={image}
                        alt={tourName}
                        className="w-full object-cover"
                    />
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Package Info */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Tour Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FaMapMarkerAlt className="text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Destination</p>
                                            <p className="font-medium text-foreground">{destination}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <FaMapMarkerAlt className="text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Departure From</p>
                                            <p className="font-medium text-foreground">{departureLocation}</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <FaCalendarAlt className="text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Departure Date</p>
                                            <p className="font-medium text-foreground">
                                                {new Date(departureDate).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        <FaClock className="text-primary" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Duration</p>
                                            <p className="font-medium text-foreground">{duration}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex items-center gap-3">
                                <FaBangladeshiTakaSign className="text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Price</p>
                                    <p className="text-2xl font-bold text-foreground">{price}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Description</h2>
                            <p className="text-foreground">{details}</p>
                        </div>
                    </div>
                    
                    {/* Right Column - Guide Info */}
                    <div className="space-y-6">
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Your Guide</h2>
                            
                            <div className="flex flex-col items-center text-center space-y-4">
                                <div className="relative">
                                    <img 
                                        src={guidePhoto} 
                                        alt={guideName}
                                        className="w-24 h-24 rounded-full object-cover border-4 border-primary/20"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground rounded-full p-2">
                                        <FaUser className="h-4 w-4" />
                                    </div>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-foreground">{guideName}</h3>
                                    <p className="text-muted-foreground">{guideEmail}</p>
                                </div>
                                
                                <div className="w-full pt-4 border-t border-border">
                                    <p className="text-sm text-muted-foreground">Certified Tour Guide</p>
                                    <div className="flex justify-center mt-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                                key={star}
                                                className="w-5 h-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="bg-card p-6 rounded-xl shadow-sm border border-border">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">Ready to Book?</h2>
                            <p className="text-muted-foreground mb-6">Secure your spot on this amazing adventure today!</p>
                            <Link 
                                to={`/bookings/${id}`} 
                                className="btn bg-primary w-full text-primary-foreground hover:bg-primary/70"
                            >
                                Book Now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details; 

