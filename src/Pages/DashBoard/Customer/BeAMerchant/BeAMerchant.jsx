// import { useForm } from "react-hook-form";
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';

// const BeAMerchant = () => {
//   const { register, handleSubmit, reset } = useForm();

//   const { mutate, isPending } = useMutation({
//     mutationFn: async (data) => {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       formData.append('phone', data.phone);
//       formData.append('businessName', data.businessName);
//       formData.append('experience', data.experience);
//       formData.append('document', data.document[0]);

//       const res = await axios.post('https://cse-2100-project-server.vercel.app/merchants', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success('Application submitted successfully!');
//       reset();
//     },
//     onError: () => {
//       toast.error('Something went wrong!');
//     }
//   });

//   const onSubmit = (data) => {
//     mutate(data);
//   };

//   return (
//     <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl space-y-4">
//       <h2 className="text-2xl font-bold text-center">Become a Merchant</h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <div>
//           <label className="block font-medium">Name</label>
//           <input type="text" {...register('name')} className="w-full p-2 border rounded" />
//         </div>

//         <div>
//           <label className="block font-medium">Email</label>
//           <input type="email" {...register('email')} className="w-full p-2 border rounded" />
//         </div>

//         <div>
//           <label className="block font-medium">Phone</label>
//           <input type="tel" {...register('phone')} className="w-full p-2 border rounded" />
//         </div>

//         <div>
//           <label className="block font-medium">Business Name</label>
//           <input type="text" {...register('businessName')} className="w-full p-2 border rounded" />
//         </div>

//         <div>
//           <label className="block font-medium">Experience / Background</label>
//           <textarea {...register('experience')} className="w-full p-2 border rounded" />
//         </div>

//         <div>
//           <label className="block font-medium">Upload Document (NID/Trade License)</label>
//           <input type="file" {...register('document')} className="w-full p-2 border rounded" />
//         </div>

//         <button
//           type="submit"
//           disabled={isPending}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           {isPending ? 'Submitting...' : 'Submit'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BeAMerchant;


// import { useForm } from "react-hook-form";
// import { useMutation } from '@tanstack/react-query';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { FiUpload, FiUser, FiMail, FiPhone, FiBriefcase, FiFileText } from 'react-icons/fi';


//just simple info
// const BeAMerchant = () => {
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const { mutate, isPending } = useMutation({
//     mutationFn: async (data) => {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('email', data.email);
//       formData.append('phone', data.phone);
//       formData.append('businessName', data.businessName);
//       formData.append('experience', data.experience);
//       formData.append('document', data.document[0]);

//       const res = await axios.post('https://cse-2100-project-server.vercel.app/merchants', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });
//       return res.data;
//     },
//     onSuccess: () => {
//       toast.success('Application submitted successfully!');
//       reset();
//     },
//     onError: () => {
//       toast.error('Something went wrong!');
//     }
//   });

//   const onSubmit = (data) => {
//     mutate(data);
//   };

//   return (
//     <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border">
//         <div className="bg-primary p-6 text-primary-foreground">
//           <h2 className="text-2xl font-bold">Become a Merchant</h2>
//           <p className="text-primary-foreground/90 mt-1">
//             Join our marketplace and start selling your products
//           </p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//           {/* Name Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiUser className="inline mr-2" />
//               Full Name
//             </label>
//             <input
//               type="text"
//               {...register('name', { required: 'Name is required' })}
//               className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//               placeholder="Your full name"
//             />
//             {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
//           </div>

//           {/* Email Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiMail className="inline mr-2" />
//               Email Address
//             </label>
//             <input
//               type="email"
//               {...register('email', { 
//                 required: 'Email is required',
//                 pattern: {
//                   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                   message: 'Invalid email address'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//               placeholder="your@email.com"
//             />
//             {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
//           </div>

//           {/* Phone Field */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiPhone className="inline mr-2" />
//               Phone Number
//             </label>
//             <input
//               type="tel"
//               {...register('phone', { 
//                 required: 'Phone number is required',
//                 pattern: {
//                   value: /^[0-9]{10,15}$/,
//                   message: 'Invalid phone number'
//                 }
//               })}
//               className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//               placeholder="+1 (123) 456-7890"
//             />
//             {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
//           </div>

//           {/* Business Name */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiBriefcase className="inline mr-2" />
//               Business Name
//             </label>
//             <input
//               type="text"
//               {...register('businessName', { required: 'Business name is required' })}
//               className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//               placeholder="Your business name"
//             />
//             {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
//           </div>

//           {/* Experience */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiFileText className="inline mr-2" />
//               Experience / Background
//             </label>
//             <textarea
//               {...register('experience', { required: 'Please describe your experience' })}
//               rows={4}
//               className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
//               placeholder="Tell us about your business experience..."
//             />
//             {errors.experience && <p className="text-sm text-destructive">{errors.experience.message}</p>}
//           </div>

//           {/* Document Upload */}
//           <div className="space-y-2">
//             <label className="block text-sm font-medium text-foreground">
//               <FiUpload className="inline mr-2" />
//               Upload Document (NID/Trade License)
//             </label>
//             <div className="flex items-center justify-center w-full">
//               <label className="flex flex-col w-full max-w-lg cursor-pointer">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6 border-2 border-dashed border-input rounded-lg hover:bg-accent/10 transition-colors">
//                   <FiUpload className="w-8 h-8 mb-3 text-muted-foreground" />
//                   <p className="mb-2 text-sm text-muted-foreground">
//                     <span className="font-semibold">Click to upload</span> or drag and drop
//                   </p>
//                   <p className="text-xs text-muted-foreground">
//                     PDF, JPG, PNG (MAX. 5MB)
//                   </p>
//                 </div>
//                 <input
//                   type="file"
//                   {...register('document', { required: 'Document is required' })}
//                   className="hidden"
//                   accept=".pdf,.jpg,.jpeg,.png"
//                 />
//               </label>
//             </div>
//             {errors.document && <p className="text-sm text-destructive">{errors.document.message}</p>}
//           </div>

//           {/* Submit Button */}
//           <div className="pt-4">
//             <button
//               type="submit"
//               disabled={isPending}
//               className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
//             >
//               {isPending ? 'Submitting...' : 'Submit Application'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default BeAMerchant;

//many info 
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import {
  FiUpload, FiUser, FiMail, FiPhone, FiBriefcase,
  FiFileText, FiMapPin, FiGlobe, FiDollarSign,
  FiCreditCard, FiCalendar, FiHash
} from 'react-icons/fi';
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import UseAuth from "@/Hooks/UseAuth";

const BeAMerchant = () => {
  const { user } = UseAuth();
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm();
  const axiosSecure = useAxiosSecure();
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [logoUrl, setLogoUrl] = useState('');

  // Handle Cloudinary logo upload
  const handleLogoUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setIsLogoUploading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

      const res = await axios.post(uploadUrl, formData);
      const imageUrl = res.data.secure_url;

      setLogoUrl(imageUrl);
      setValue('businessLogo', imageUrl); // Set form value
      toast.success('Logo uploaded successfully!');
    } catch (err) {
      toast.error('Logo upload failed. Please try again.');
      console.error('Cloudinary Upload Error:', err);
    } finally {
      setIsLogoUploading(false);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => {
      const merchantData = {
        userInfo: {
          userId: user?.uid,
          name: data.name || user?.displayName,
          email: data.email || user?.email,
          phone: data.phone,
          photoURL: user?.photoURL || ''
        },
        businessInfo: {
          businessName: data.businessName,
          businessType: data.businessType,
          description: data.businessDescription,
          website: data.website,
          yearsInOperation: data.yearsInBusiness,
          taxId: data.taxId,
          logoUrl: data.businessLogo || ''
        },
        address: {
          street: data.address.street,
          city: data.address.city,
          state: data.address.state,
          postalCode: data.address.postalCode,
          country: data.address.country
        },
        status: 'pending',
        createdAt: new Date().toISOString().split('T')[0],
        lastUpdated: new Date().toISOString().split('T')[0]
      };

      // Send as plain JSON (no FormData needed)
      const res = await axiosSecure.post('/merchants', merchantData);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Application submitted successfully!');
      reset();
      setLogoUrl('');
    },
    onError: (error) => {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Submission failed. Please try again.');
    }
  });

  const onSubmit = (data) => {
    mutate(data);
  };


  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-card rounded-xl shadow-lg overflow-hidden border border-border">
        <div className="bg-gradient-to-r from-primary to-accent p-6 text-primary-foreground">
          <h2 className="text-2xl font-bold">Merchant Application</h2>
          <p className="text-primary-foreground/90 mt-1">
            Complete this form to start selling on our platform
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Personal Information Section */}
          <div className="space-y-6 p-4 border border-border rounded-lg">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FiUser className="text-primary" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ''}
                  readOnly
                  {...register('name')}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-muted text-muted-foreground cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Email *
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  readOnly
                  {...register('email')}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-muted text-muted-foreground cursor-not-allowed"
                />
              </div>


              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10,15}$/,
                      message: 'Invalid phone number'
                    }
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Tax Identification Number
                </label>
                <input
                  type="text"
                  {...register('taxId')}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Business Information Section */}
          <div className="space-y-6 p-4 border border-border rounded-lg">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FiBriefcase className="text-primary" />
              Business Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Business Name *
                </label>
                <input
                  type="text"
                  {...register('businessName', { required: 'Business name is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Business Type *
                </label>
                <select
                  {...register('businessType', { required: 'Business type is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  <option value="">Select business type</option>
                  <option value="individual">Individual/Sole Proprietor</option>
                  <option value="partnership">Partnership</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                </select>
                {errors.businessType && <p className="text-sm text-destructive">{errors.businessType.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Business Website
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-input bg-muted text-muted-foreground">
                    https://
                  </span>
                  <input
                    type="text"
                    {...register('website')}
                    className="flex-1 px-4 py-3 rounded-r-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="yourbusiness.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Years in Business *
                </label>
                <input
                  type="number"
                  {...register('yearsInBusiness', {
                    required: 'This field is required',
                    min: { value: 0, message: 'Must be 0 or more' }
                  })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.yearsInBusiness && <p className="text-sm text-destructive">{errors.yearsInBusiness.message}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-medium text-foreground">
                  Business Description *
                </label>
                <textarea
                  {...register('businessDescription', { required: 'Business description is required' })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.businessDescription && <p className="text-sm text-destructive">{errors.businessDescription.message}</p>}
              </div>
            </div>
          </div>

          {/* Business Address Section */}
          <div className="space-y-6 p-4 border border-border rounded-lg">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FiMapPin className="text-primary" />
              Business Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Street Address *
                </label>
                <input
                  type="text"
                  {...register('address.street', { required: 'Street address is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.address?.street && <p className="text-sm text-destructive">{errors.address.street.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  City *
                </label>
                <input
                  type="text"
                  {...register('address.city', { required: 'City is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.address?.city && <p className="text-sm text-destructive">{errors.address.city.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  State/Province *
                </label>
                <input
                  type="text"
                  {...register('address.state', { required: 'State is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.address?.state && <p className="text-sm text-destructive">{errors.address.state.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  ZIP/Postal Code *
                </label>
                <input
                  type="text"
                  {...register('address.postalCode', { required: 'Postal code is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.address?.postalCode && <p className="text-sm text-destructive">{errors.address.postalCode.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Country *
                </label>
                <input
                  type="text"
                  {...register('address.country', { required: 'Country is required' })}
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                {errors.address?.country && <p className="text-sm text-destructive">{errors.address.country.message}</p>}
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="space-y-6 p-4 border border-border rounded-lg">
            <h3 className="text-lg font-medium text-foreground flex items-center gap-2">
              <FiFileText className="text-primary" />
              Business Logo
            </h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Business Logo (Optional)
              </label>
              <div className="flex items-center gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-input rounded-lg cursor-pointer hover:bg-accent/10 transition-colors">
                  {logoUrl ? (
                    <img src={logoUrl} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <div className="p-4 text-center">
                      <FiUpload className="w-6 h-6 mx-auto text-muted-foreground" />
                      <p className="text-xs mt-2 text-muted-foreground">Upload Logo</p>
                    </div>
                  )}
                  <input
                    type="file"
                    onChange={handleLogoUpload}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.svg"
                  />
                </label>
                <div>
                  {isLogoUploading ? (
                    <p className="text-sm text-muted-foreground">Uploading...</p>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      {logoUrl ? 'Logo ready!' : 'No logo selected'}
                    </p>
                  )}
                </div>
              </div>
              {/* Hidden input to store the URL in form data */}
              <input type="hidden" {...register('businessLogo')} />
            </div>
          </div>

          {/* Terms and Submit */}
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  {...register('termsAccepted', { required: 'You must accept the terms' })}
                  className="w-4 h-4 rounded border-input focus:ring-primary text-primary"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-medium text-foreground">
                  I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Merchant Agreement</a> *
                </label>
              </div>
            </div>
            {errors.termsAccepted && <p className="text-sm text-destructive">{errors.termsAccepted.message}</p>}

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-medium rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg hover:shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Reusable File Upload Component
const FileUpload = ({ register, name, required, accept, description }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label className="flex flex-col w-full cursor-pointer">
        <div className="flex flex-col items-center justify-center pt-5 pb-6 border-2 border-dashed border-input rounded-lg hover:bg-accent/10 transition-colors">
          <FiUpload className="w-8 h-8 mb-3 text-muted-foreground" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            {accept} {description && `• ${description}`}
          </p>
        </div>
        <input
          type="file"
          {...register(name, { required: required && 'This file is required' })}
          className="hidden"
          accept={accept}
        />
      </label>
    </div>
  );
};

export default BeAMerchant;




