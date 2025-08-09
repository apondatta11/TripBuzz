import { useForm } from "react-hook-form";
import { useQuery, useMutation } from '@tanstack/react-query';
import useAxiosSecure from "@/hooks/useAxiosSecure";
import UseAuth from "@/hooks/UseAuth";
import { FiUser, FiMail, FiPhone, FiBriefcase, FiMapPin, FiUpload, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

const UpdateMerchantProfile = () => {
    const { user } = UseAuth();
    const axiosSecure = useAxiosSecure();
    const [logoFile, setLogoFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm();

    // Watch logo URL value
    const logoUrl = watch('logoUrl');

    // Fetch merchant profile
    const { data: merchant, isLoading, isError } = useQuery({
        queryKey: ['merchant-profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/merchants/profile/${user?.email}`);
            return res.data;
        },
        onSuccess: (data) => {
            reset({
                phone: data?.userInfo?.phone || '',
                businessName: data?.businessInfo?.businessName || '',
                businessType: data?.businessInfo?.businessType || '',
                description: data?.businessInfo?.description || '',
                website: data?.businessInfo?.website || '',
                yearsInOperation: data?.businessInfo?.yearsInOperation || '',
                taxId: data?.businessInfo?.taxId || '',
                street: data?.address?.street || '',
                city: data?.address?.city || '',
                state: data?.address?.state || '',
                postalCode: data?.address?.postalCode || '',
                country: data?.address?.country || '',
                // Logo is handled separately
            });
            // Set logo URL if it exists
            if (data?.businessInfo?.logoUrl) {
                setValue('logoUrl', data.businessInfo.logoUrl);
            }
        }
    });

    // Handle logo upload
    const handleLogoUpload = async () => {
        if (!logoFile) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', logoFile);

        try {
            const res = await axiosSecure.post('/merchants/upload-logo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setValue('logoUrl', res.data.url);
            toast.success('Logo uploaded successfully');
        } catch (error) {
            toast.error('Failed to upload logo');
            console.error('Upload error:', error);
        } finally {
            setIsUploading(false);
            setLogoFile(null);
        }
    };

    // Remove logo
    const handleRemoveLogo = () => {
        setValue('logoUrl', '');
    };

    // Update profile mutation
    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosSecure.patch(`/merchants/profile/${user?.email}`, {
                ...data,
                logoUrl: data.logoUrl // Include logo URL in the update
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success('Profile updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update profile');
        }
    });

    const onSubmit = (data) => {
        mutate({
            phone: data.phone,
            businessInfo: {
                businessName: data.businessName,
                businessType: data.businessType,
                description: data.description,
                website: data.website,
                yearsInOperation: data.yearsInOperation,
                taxId: data.taxId,
                logoUrl: data.logoUrl
            },
            address: {
                street: data.street,
                city: data.city,
                state: data.state,
                postalCode: data.postalCode,
                country: data.country
            }
        });
    };

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/3" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Array(8).fill(0).map((_, i) => (
                        <Skeleton key={i} className="h-10 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center py-8 text-destructive">
                Failed to load merchant profile. Please try again.
            </div>
        );
    }

    return (
        <Card className="border-none shadow-sm">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                    Merchant Profile
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Personal Info (read-only) */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                            <FiUser className="text-primary" />
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input
                                    value={user?.email || ''}
                                    readOnly
                                    className="bg-muted"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Phone *</label>
                                <Input
                                    {...register('phone', {
                                        required: 'Phone is required',
                                        pattern: {
                                            value: /^[0-9]{10,15}$/,
                                            message: 'Invalid phone number'
                                        }
                                    })}
                                    defaultValue={merchant?.userInfo?.phone || ''}
                                />
                                {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Business Info */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                            <FiBriefcase className="text-primary" />
                            Business Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Business Name *</label>
                                <Input
                                    {...register('businessName', { required: 'Business name is required' })}
                                    defaultValue={merchant?.businessInfo?.businessName || ''}
                                />
                                {errors.businessName && <p className="text-sm text-destructive">{errors.businessName.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Business Type *</label>
                                <Select
                                    {...register('businessType', { required: 'Business type is required' })}
                                    defaultValue={merchant?.businessInfo?.businessType || ''}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select business type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="partnership">Partnership</SelectItem>
                                        <SelectItem value="llc">LLC</SelectItem>
                                        <SelectItem value="corporation">Corporation</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.businessType && <p className="text-sm text-destructive">{errors.businessType.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Website</label>
                                <Input
                                    {...register('website')}
                                    defaultValue={merchant?.businessInfo?.website || ''}
                                    placeholder="yourbusiness.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Years in Business *</label>
                                <Input
                                    type="number"
                                    {...register('yearsInOperation', {
                                        required: 'Years in business is required',
                                        min: { value: 0, message: 'Must be 0 or more' }
                                    })}
                                    defaultValue={merchant?.businessInfo?.yearsInOperation || ''}
                                />
                                {errors.yearsInOperation && <p className="text-sm text-destructive">{errors.yearsInOperation.message}</p>}
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Business Description *</label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    defaultValue={merchant?.businessInfo?.description || ''}
                                    className="w-full p-2 border rounded-md min-h-[100px]"
                                />
                                {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Tax ID</label>
                                <Input
                                    {...register('taxId')}
                                    defaultValue={merchant?.businessInfo?.taxId || ''}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Address Info */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                            <FiMapPin className="text-primary" />
                            Business Address
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Street *</label>
                                <Input
                                    {...register('street', { required: 'Street is required' })}
                                    defaultValue={merchant?.address?.street || ''}
                                />
                                {errors.street && <p className="text-sm text-destructive">{errors.street.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">City *</label>
                                <Input
                                    {...register('city', { required: 'City is required' })}
                                    defaultValue={merchant?.address?.city || ''}
                                />
                                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">State *</label>
                                <Input
                                    {...register('state', { required: 'State is required' })}
                                    defaultValue={merchant?.address?.state || ''}
                                />
                                {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Postal Code *</label>
                                <Input
                                    {...register('postalCode', { required: 'Postal code is required' })}
                                    defaultValue={merchant?.address?.postalCode || ''}
                                />
                                {errors.postalCode && <p className="text-sm text-destructive">{errors.postalCode.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Country *</label>
                                <Input
                                    {...register('country', { required: 'Country is required' })}
                                    defaultValue={merchant?.address?.country || ''}
                                />
                                {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Logo Upload Section */}
                    <div className="space-y-4 p-4 border rounded-lg">
                        <h3 className="font-medium flex items-center gap-2">
                            <FiUpload className="text-primary" />
                            Business Logo
                        </h3>

                        <div className="space-y-4">
                            {/* Current Logo Preview */}
                            {logoUrl && (
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <img
                                            src={logoUrl}
                                            alt="Business Logo"
                                            className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleRemoveLogo}
                                            className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground p-1 rounded-full"
                                        >
                                            <FiTrash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Current logo
                                    </p>
                                </div>
                            )}

                            {/* Logo Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">
                                    {logoUrl ? 'Change Logo' : 'Upload Logo'}
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="file"
                                        id="logo-upload"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => setLogoFile(e.target.files?.[0])}
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="flex-1 border rounded-md p-2 cursor-pointer hover:bg-accent/10"
                                    >
                                        {logoFile ? logoFile.name : 'Choose a file...'}
                                    </label>
                                    <Button
                                        type="button"
                                        onClick={handleLogoUpload}
                                        disabled={!logoFile || isUploading}
                                        className="flex items-center gap-2"
                                    >
                                        {isUploading ? 'Uploading...' : 'Upload'}
                                    </Button>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Recommended size: 500x500px, JPG/PNG format
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={isPending}>
                            {isPending ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default UpdateMerchantProfile;