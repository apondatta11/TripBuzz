// import React, { use } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '@/Provider/AuthContext';
// import axios from 'axios';

// const AddPackages = () => {
//     const { user } = use(AuthContext);
//     console.log(user)

//     const handleAddPackages = e => {
//         e.preventDefault();
//         const form = e.target;
//         const formData = new FormData(form);
//         const newPost = Object.fromEntries(formData.entries())
//         console.log(newPost);

//         axios.post('https://cse-2100-project-server.vercel.app/packages', newPost)
//             .then(res => {
//                 if (res.data.insertedId) {
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "Package added successfully!",
//                         showConfirmButton: false,
//                         timer: 1500,
//                         background: 'var(--color-neutral)',
//                         color: 'var(--color-text)'
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }
//     return (
//         <div className="bg-neutral min-h-screen py-10 px-4">
//             <div className="max-w-4xl mx-auto bg-neutral p-8 rounded-2xl shadow-lg border border-secondary/20">
//                             {/* Header Section */}
//                                             <div className="bg-primary p-6 text-neutral-content">
//                                                     <div className="flex items-center gap-3">
//                                                         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                                                     </svg>
//                                                     <h2 className="text-2xl font-bold">Create New Tour Package</h2>
//                                                 </div>
//                                                 <p className="mt-1 opacity-90">Fill out the form to list your travel experience</p>
//                                             </div>
//                 <h2 className="text-3xl font-bold mb-6 text-center text-primary">📋 Submit Tour Package</h2>

//                 <form onSubmit={handleAddPackages} className="grid grid-cols-1 md:grid-cols-2 gap-6">

//                     {/* Tour Name */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Tour Name</label>
//                         <input 
//                             type="text" 
//                             name="tourName" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Image Upload */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Tour Image</label>
//                         <input 
//                             type="url" 
//                             name="image" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             placeholder="Image URL" 
//                             required 
//                         />
//                     </div>

//                     {/* Duration */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Duration</label>
//                         <input 
//                             type="text" 
//                             name="duration" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             placeholder="3 Days 2 Nights" 
//                             required 
//                         />
//                     </div>

//                     {/* Departure Date */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Departure Date</label>
//                         <input 
//                             type="date" 
//                             name="departureDate" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Departure Location */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Departure Location</label>
//                         <input 
//                             type="text" 
//                             name="departureLocation" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Destination */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Destination</label>
//                         <input 
//                             type="text" 
//                             name="destination" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Price */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Price (in BDT)</label>
//                         <input 
//                             type="number" 
//                             name="price" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Contact No */}
//                     <div>
//                         <label className="block font-medium mb-1 text-text">Contact Number</label>
//                         <input 
//                             type="tel" 
//                             name="contact" 
//                             className="input input-bordered w-full bg-neutral-focus border-secondary/20" 
//                             required 
//                         />
//                     </div>

//                     {/* Package Details - Full width */}
//                     <div className="md:col-span-2">
//                         <label className="block font-medium mb-1 text-text">Package Details</label>
//                         <textarea 
//                             name="details" 
//                             rows="4" 
//                             className="textarea textarea-bordered w-full bg-neutral-focus border-secondary/20" 
//                             placeholder="Describe the tour package..." 
//                             required 
//                         />
//                     </div>

//                     {/* Guide Info */}
//                     <div className="md:col-span-2 border-t border-secondary/20 pt-6 mt-4">
//                         <h3 className="text-xl font-semibold mb-4 text-primary">👨‍💼 Guide Info (Auto-filled)</h3>

//                         <div className="grid md:grid-cols-3 gap-4">
//                             <input 
//                                 type="text" 
//                                 name="guideName" 
//                                 className="input input-bordered w-full bg-neutral border-secondary/20" 
//                                 value={user?.displayName || ''} 
//                                 readOnly 
//                             />
//                             <input 
//                                 type="email" 
//                                 name="guideEmail" 
//                                 className="input input-bordered w-full bg-neutral border-secondary/20" 
//                                 value={user?.email || ''} 
//                                 readOnly 
//                             />
//                             <input 
//                                 type="url" 
//                                 name="guidePhoto" 
//                                 className="input input-bordered w-full bg-neutral border-secondary/20" 
//                                 value={user?.photoURL || ''} 
//                                 readOnly 
//                             />
//                         </div>
//                     </div>

//                     {/* Submit Button */}
//                     <div className="md:col-span-2 text-center mt-6">
//                         <button 
//                             type="submit" 
//                             className="btn bg-primary hover:bg-primary/90 text-neutral-content px-8 py-3 rounded-lg"
//                         >
//                             Submit Tour Package
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default AddPackages;
import React, { use } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '@/Provider/AuthContext';
import axios from 'axios';
import { FiPlusCircle, FiCalendar, FiMapPin, FiDollarSign, FiPhone, FiInfo } from 'react-icons/fi';
import { FaBus, FaHotel, FaUserTie } from 'react-icons/fa';
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAxiosSecure from '@/Hooks/useAxiosSecure';


const AddPackages = () => {
    const { user } = use(AuthContext);
const axiosSecure = useAxiosSecure()


// ... other imports

const handleAddPackages = async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const newPackage = Object.fromEntries(formData.entries());

  try {
    const res = await axiosSecure.post('/packages', {
      ...newPackage,
      status: 'pending' // Explicitly set status
    });

    if (res.data.insertedId) {
      toast.success("Package submitted for approval. Admin will review your package shortly.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    //   form.reset();
    }
  } catch (error) {
    console.error('Submission error:', error);
    
    let errorMessage = "Failed to submit package. Please try again.";
    if (error.response) {
      // Handle backend validation errors
      errorMessage = error.response.data.message || errorMessage;
    } else if (error.request) {
      // Handle network errors
      errorMessage = "Network error. Please check your connection.";
    }

    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

    // const handleAddPackages = async(e) => {
    //     e.preventDefault();
    //     const form = e.target;
    //     const formData = new FormData(form);
    //     const newPackage = Object.fromEntries(formData.entries())

    //     axios.post('https://cse-2100-project-server.vercel.app/packages', newPost)
    //         .then(res => {
    //             if (res.data.insertedId) {
    //                 Swal.fire({
    //                     position: "center",
    //                     icon: "success",
    //                     title: "Package Added!",
    //                     text: "Your tour package has been successfully listed",
    //                     showConfirmButton: false,
    //                     timer: 2000,
    //                     background: 'var(--color-card)',
    //                     color: 'var(--color-foreground)',
    //                     customClass: {
    //                         popup: 'shadow-2xl border border-accent/20'
    //                     }
    //                 });
    //                 form.reset();
    //             }
    //         })
    //         .catch(error => {
    //             console.log(error);
    //             Swal.fire({
    //                 icon: "error",
    //                 title: "Error",
    //                 text: "Failed to add package. Please try again.",
    //                 confirmButtonColor: "var(--color-primary)"
    //             });
    //         })

    //     };
    

    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-background to-accent/5">
            <div className="max-w-5xl mx-auto">
                {/* Modern Card Header */}
                <div className="relative mb-10 group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
                    <div className="relative bg-card rounded-xl p-8 shadow-xl border border-accent/20 overflow-hidden">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="p-4 rounded-lg bg-primary/10 text-primary">
                                <FiPlusCircle className="h-10 w-10" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground">Create New Tour Package</h1>
                                <p className="text-muted-foreground mt-2">Fill out the details to list your amazing travel experience</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-card rounded-xl shadow-lg border border-accent/20 overflow-hidden">
                    <form onSubmit={handleAddPackages} className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Tour Information Section */}
                        <div className="md:col-span-2">
                            <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                                <FaBus className="h-5 w-5" />
                                Tour Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Tour Name */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Tour Name</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="tourName"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <FiMapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Image URL */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Image URL</label>
                                    <div className="relative">
                                        <input
                                            type="url"
                                            name="image"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="https://example.com/image.jpg"
                                            required
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Duration</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="duration"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="3 Days 2 Nights"
                                            required
                                        />
                                        <FiCalendar className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Departure Date */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Departure Date</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            name="departureDate"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Departure Location */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Departure From</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="departureLocation"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <FiMapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Destination */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Destination</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="destination"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <svg className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Price (BDT)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            name="price"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <FaBangladeshiTakaSign className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Contact Number</label>
                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="contact"
                                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            required
                                        />
                                        <FiPhone className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Package Details */}
                        <div className="md:col-span-2 space-y-2">
                            <label className="block text-sm font-medium text-foreground/80 flex items-center gap-2">
                                <FiInfo className="h-5 w-5" />
                                Package Details
                            </label>
                            <textarea
                                name="details"
                                rows="5"
                                className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                placeholder="Describe the itinerary, accommodations, inclusions, exclusions..."
                                required
                            />
                        </div>

                        {/* Guide Information */}
                        <div className="md:col-span-2 mt-6 pt-6 border-t border-accent/20">
                            <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                                <FaUserTie className="h-5 w-5" />
                                Guide Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Guide Name</label>
                                    <input
                                        type="text"
                                        name="guideName"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background/50"
                                        value={user?.displayName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Guide Email</label>
                                    <input
                                        type="email"
                                        name="guideEmail"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background/50"
                                        value={user?.email || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground/80">Guide Photo URL</label>
                                    <input
                                        type="url"
                                        name="guidePhoto"
                                        className="w-full px-4 py-3 rounded-lg border border-input bg-background/50"
                                        value={user?.photoURL || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="md:col-span-2 mt-8">
                            <button
                                type="submit"
                                className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg hover:shadow-primary/20"
                            >
                                Submit Tour Package
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddPackages;