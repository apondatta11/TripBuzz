import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, X, Eye, Loader2, Package } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const PackageApprovals = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const axiosSecure = useAxiosSecure();

  // Fetch pending packages
  const {
    data: packages = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/pending");
      return res.data;
    },
  });

  // Handle package status update
  const { mutate: updatePackageStatus } = useMutation({
    mutationFn: async ({ id, status }) => {
      await axiosSecure.patch(`/packages/${id}/status`, { status });
    },
    onSuccess: () => {
      toast.success("Package status updated");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to update status", {
        description: error.response?.data?.message,
      });
    },
  });

  const handleDecision = (id, action) => {
    toast(`Are you sure you want to ${action} this package?`, {
      action: {
        label: "Confirm",
        onClick: () => updatePackageStatus({ 
          id, 
          status: action === "approve" ? "approved" : "rejected" 
        }),
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <Package className="text-primary" />
          Package Approval Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Name</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow key={pkg._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <span>{pkg.tourName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{pkg.guideName}</span>
                      <span className="text-muted-foreground text-sm">
                        {pkg.guideEmail}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{pkg.destination}</TableCell>
                  <TableCell>৳{pkg.price}</TableCell>
                  <TableCell>
                    {new Date(pkg.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSelectedPackage(pkg)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="success"
                        size="icon"
                        onClick={() => handleDecision(pkg._id, "approve")}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDecision(pkg._id, "reject")}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {packages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No pending package approvals
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Package Details Dialog */}
        <Dialog
          open={!!selectedPackage}
          onOpenChange={(open) => !open && setSelectedPackage(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Package Details</DialogTitle>
            </DialogHeader>
            {selectedPackage && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium">Tour Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Name:</span>{" "}
                        {selectedPackage.tourName}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Duration:</span>{" "}
                        {selectedPackage.duration}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Departure:</span>{" "}
                        {selectedPackage.departureDate} from {selectedPackage.departureLocation}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Price:</span>{" "}
                        ৳{selectedPackage.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium">Contact Information</h4>
                    <div className="mt-2 space-y-1 text-sm">
                      <p>
                        <span className="text-muted-foreground">Merchant:</span>{" "}
                        {selectedPackage.guideName}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Email:</span>{" "}
                        {selectedPackage.guideEmail}
                      </p>
                      <p>
                        <span className="text-muted-foreground">Phone:</span>{" "}
                        {selectedPackage.contact}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium">Package Details</h4>
                  <p className="mt-2 text-sm text-foreground">
                    {selectedPackage.details}
                  </p>
                </div>

                {selectedPackage.image && (
                  <div>
                    <h4 className="font-medium">Tour Image</h4>
                    <img
                      src={selectedPackage.image}
                      alt="Tour"
                      className="mt-2 rounded-md object-cover max-h-64"
                    />
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PackageApprovals;