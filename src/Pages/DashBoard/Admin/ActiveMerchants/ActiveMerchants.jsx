// import { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import Swal from "sweetalert2";
// import { FaSearch, FaUserSlash, FaUserCheck, FaEye } from "react-icons/fa";
// import useAxiosSecure from "@/hooks/useAxiosSecure";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// const ActiveMerchants = () => {
//   const axiosSecure = useAxiosSecure();
//   const [searchTerm, setSearchTerm] = useState("");

//   // Fetch active merchants
//   const { 
//     data: merchants = [], 
//     isLoading, 
//     refetch, 
//     error 
//   } = useQuery({
//     queryKey: ["activeMerchants"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/merchants/active");
//       return res.data;
//     },
//   });

//   // Handle merchant status change
//   const handleStatusChange = async (id, action) => {
//     const confirm = await Swal.fire({
//       title: `${action === "deactivate" ? "Deactivate" : "Suspend"} this merchant?`,
//       text: action === "suspend" 
//         ? "Suspended merchants can be reactivated later" 
//         : "Deactivated merchants will need to reapply",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: `Yes, ${action}`,
//       cancelButtonText: "Cancel",
//       confirmButtonColor: action === "deactivate" ? "#ef4444" : "#f59e0b",
//     });

//     if (!confirm.isConfirmed) return;

//     try {
//       await axiosSecure.patch(`/merchants/${id}/status`, { 
//         status: action === "deactivate" ? "inactive" : "suspended"
//       });
      
//       Swal.fire(
//         "Success",
//         `Merchant has been ${action}d`,
//         "success"
//       );
//       refetch();
//     } catch (error) {
//       console.error(error);
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || `Failed to ${action} merchant`,
//         "error"
//       );
//     }
//   };

//   // Filter merchants by search term
//   const filteredMerchants = merchants.filter(merchant => 
//     merchant.businessInfo?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     merchant.userInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     merchant.userInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <Card className="border-none shadow-sm">
//       <CardHeader>
//         <CardTitle className="text-2xl font-semibold">
//           Active Merchants
//         </CardTitle>
//       </CardHeader>
//       <CardContent>
//         {/* Search Bar */}
//         <div className="relative mb-6 max-w-md">
//           <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             type="text"
//             placeholder="Search by business, owner or email"
//             className="pl-10"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         {/* Loading/Error States */}
//         {isLoading && (
//           <div className="flex justify-center py-8">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
//           </div>
//         )}
        
//         {error && (
//           <div className="text-center py-8 text-destructive">
//             Failed to load merchants: {error.message}
//           </div>
//         )}

//         {/* Merchants Table */}
//         {!isLoading && !error && (
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Business</TableHead>
//                   <TableHead>Owner</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredMerchants.map((merchant) => (
//                   <TableRow key={merchant._id}>
//                     <TableCell className="font-medium">
//                       <div className="flex items-center gap-3">
//                         {merchant.businessInfo?.logoUrl && (
//                           <img
//                             src={merchant.businessInfo.logoUrl}
//                             alt="Logo"
//                             className="h-8 w-8 rounded-md object-cover"
//                           />
//                         )}
//                         <span>{merchant.businessInfo?.businessName}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex flex-col">
//                         <span>{merchant.userInfo?.name}</span>
//                         <span className="text-muted-foreground text-sm">
//                           {merchant.userInfo?.email}
//                         </span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant="outline">
//                         {merchant.businessInfo?.businessType}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       {merchant.address?.city}, {merchant.address?.country}
//                     </TableCell>
//                     <TableCell>
//                       <Badge 
//                         variant={merchant.status === "active" ? "default" : "secondary"}
//                         className={
//                           merchant.status === "suspended" 
//                             ? "bg-amber-100 text-amber-800" 
//                             : ""
//                         }
//                       >
//                         {merchant.status}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex justify-end gap-2">
//                         <Button variant="outline" size="sm">
//                           <FaEye className="mr-2" /> View
//                         </Button>
//                         <Button 
//                           variant="secondary" 
//                           size="sm"
//                           onClick={() => handleStatusChange(merchant._id, "suspend")}
//                         >
//                           <FaUserSlash className="mr-2" /> Suspend
//                         </Button>
//                         <Button 
//                           variant="destructive" 
//                           size="sm"
//                           onClick={() => handleStatusChange(merchant._id, "deactivate")}
//                         >
//                           <FaUserSlash className="mr-2" /> Deactivate
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//                 {filteredMerchants.length === 0 && (
//                   <TableRow>
//                     <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
//                       No merchants found matching your search
//                     </TableCell>
//                   </TableRow>
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// };

// export default ActiveMerchants;


import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSearch, FaUserSlash, FaUserCheck, FaEye, FaLock } from "react-icons/fa";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const ActiveMerchants = () => {
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch active merchants (only 'active' status)
  const { 
    data: merchants = [], 
    isLoading, 
    refetch, 
    error 
  } = useQuery({
    queryKey: ["activeMerchants"],
    queryFn: async () => {
      const res = await axiosSecure.get("/merchants?status=active");
      return res.data;
    },
  });

  // Handle merchant status change
  const handleStatusChange = async (id, action, email) => {
    const actionConfig = {
      suspend: {
        title: "Suspend this merchant?",
        text: "Suspended merchants will be moved to pending status for review",
        confirmText: "Suspend",
        status: "pending",
        color: "#f59e0b",
        icon: "warning"
      },
      block: {
        title: "Block this merchant?",
        text: "Blocked merchants will be permanently removed from the system",
        confirmText: "Block",
        status: "blocked",
        color: "#ef4444",
        icon: "error"
      },
      reactivate: {
        title: "Reactivate this merchant?",
        text: "Merchant will be restored to active status",
        confirmText: "Reactivate",
        status: "active",
        color: "#10b981",
        icon: "success"
      }
    };

    const config = actionConfig[action];
    
    const confirm = await Swal.fire({
      title: config.title,
      text: config.text,
      icon: config.icon,
      showCancelButton: true,
      confirmButtonText: config.confirmText,
      cancelButtonText: "Cancel",
      confirmButtonColor: config.color,
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/merchants/${id}/status`, { 
        status: config.status,
        email 
      });
      
      Swal.fire(
        "Success",
        `Merchant has been ${action}d`,
        "success"
      );
      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        error.response?.data?.message || `Failed to ${action} merchant`,
        "error"
      );
    }
  };

  // Filter merchants by search term
  const filteredMerchants = merchants.filter(merchant => 
    merchant.businessInfo?.businessName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.userInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    merchant.userInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          Active Merchants
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search Bar */}
        <div className="relative mb-6 max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by business, owner or email"
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Loading/Error States */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary" />
          </div>
        )}
        
        {error && (
          <div className="text-center py-8 text-destructive">
            Failed to load merchants: {error.message}
          </div>
        )}

        {/* Merchants Table */}
        {!isLoading && !error && (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Business</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMerchants.map((merchant) => (
                  <TableRow key={merchant._id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-3">
                        {merchant.businessInfo?.logoUrl && (
                          <img
                            src={merchant.businessInfo.logoUrl}
                            alt="Logo"
                            className="h-8 w-8 rounded-md object-cover"
                          />
                        )}
                        <span>{merchant.businessInfo?.businessName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>{merchant.userInfo?.name}</span>
                        <span className="text-muted-foreground text-sm">
                          {merchant.userInfo?.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {merchant.businessInfo?.businessType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {merchant.address?.city}, {merchant.address?.country}
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          <FaEye className="mr-2" /> View
                        </Button>
                        <Button 
                          variant="warning" 
                          size="sm"
                          onClick={() => handleStatusChange(
                            merchant._id, 
                            "suspend",
                            merchant.userInfo?.email
                          )}
                        >
                          <FaUserSlash className="mr-2" /> Suspend
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => handleStatusChange(
                            merchant._id, 
                            "block",
                            merchant.userInfo?.email
                          )}
                        >
                          <FaLock className="mr-2" /> Block
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredMerchants.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                      No active merchants found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ActiveMerchants;