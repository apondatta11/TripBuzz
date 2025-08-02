import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';

const AllPackages = () => {
    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/packages')
            .then(res => res.json())
            .then(data => {
                setPackages(data);
                setFilteredPackages(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching packages:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const results = packages.filter(pkg =>
            pkg.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPackages(results);
    }, [searchTerm, packages]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-base-100 to-base-200 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-4">
                        Discover Your Next Adventure
                    </h1>
                    <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                        Explore our curated collection of travel packages designed to create unforgettable experiences.
                    </p>
                    
                    {/* Search Bar */}
                    <div className="mt-8 max-w-md mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search packages..."
                            className="w-full px-6 py-3 rounded-full border border-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="absolute right-2 top-2 btn btn-primary btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-pulse flex space-x-4">
                            <div className="rounded-full bg-primary h-12 w-12"></div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Filter Tags (optional) */}
                        <div className="flex flex-wrap justify-center gap-2 mb-8">
                            {['All', 'Adventure', 'Luxury', 'Family', 'Cultural'].map((tag) => (
                                <button
                                    key={tag}
                                    className="px-4 py-2 rounded-full border border-base-300 hover:bg-primary hover:text-primary-content transition-colors"
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>

                        {/* Packages Grid */}
                        {filteredPackages.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredPackages.map((pkg) => (
                                    <div 
                                        key={pkg._id}
                                        className="group relative overflow-hidden rounded-2xl shadow-2xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
                                    >
                                        <div className="relative h-64 overflow-hidden">
                                            <img
                                                src={pkg.image}
                                                alt={pkg.tourName}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                            <div className="absolute bottom-0 left-0 p-6">
                                                <h2 className="text-2xl font-bold text-white">{pkg.tourName}</h2>
                                                <div className="badge badge-primary mt-2">${pkg.price}</div>
                                            </div>
                                        </div>
                                        <div className="bg-base-100 p-6">
                                            <p className="text-base-content/80 mb-4 line-clamp-3">{pkg.description}</p>
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center space-x-1 text-yellow-400">
                                                    {/* Star ratings - you can replace with actual rating data */}
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <svg key={star} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    ))}
                                                </div>
                                                <Link 
                                                    to={`/packages/${pkg._id}`}
                                                    className="btn btn-primary btn-outline hover:btn-primary transition-all"
                                                >
                                                    Explore
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <div className="text-6xl mb-4">🧭</div>
                                <h3 className="text-2xl font-bold mb-2">No Packages Found</h3>
                                <p className="text-base-content/70">Try adjusting your search or filters to find what you're looking for.</p>
                                <button 
                                    className="mt-4 btn btn-ghost text-primary"
                                    onClick={() => setSearchTerm('')}
                                >
                                    Clear Search
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllPackages;