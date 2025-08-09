import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, X, Eye, Loader2, Package, Clock, Calendar } from "lucide-react";
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
import { Progress } from "@/components/ui/progress";

const PendingPackages = () => {
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
      toast.success(`Package ${status === "approved" ? "approved" : "rejected"}`);
      refetch();
    },
    onError: (error) => {
      toast.error("Update failed", {
        description: error.response?.data?.message || "Please try again",
      });
    },
  });

  const getDaysPending = (createdAt) => {
    const created = new Date(createdAt);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
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
          Packages Awaiting Review
          <Badge variant="secondary" className="ml-2">
            {packages.length} pending
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour</TableHead>
                <TableHead>Merchant</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Days Pending</TableHead>
                <TableHead>Review Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((pkg) => (
                <TableRow 
                  key={pkg._id}
                  className="hover:bg-accent/10 cursor-pointer"
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-medium">{pkg.tourName}</div>
                        <div className="text-sm text-muted-foreground">
                          {pkg.duration}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {pkg.guidePhoto && (
                        <img
                          src={pkg.guidePhoto}
                          alt="Guide"
                          className="h-6 w-6 rounded-full"
                        />
                      )}
                      <span>{pkg.guideName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {pkg.destination}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{getDaysPending(pkg.createdAt)} days</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Progress 
                        value={Math.min(getDaysPending(pkg.createdAt) * 10, 100)} 
                        className="h-2 w-24" 
                      />
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPackage(pkg);
                        }}
                      >
                        Review
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {packages.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <Package className="h-8 w-8" />
                      <p>No packages awaiting approval</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Package Review Dialog */}
        <Dialog
          open={!!selectedPackage}
          onOpenChange={(open) => !open && setSelectedPackage(null)}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Review Tour Package</DialogTitle>
            </DialogHeader>
            {selectedPackage && (
              <div className="grid gap-6 py-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Tour Overview</h4>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>
                            {new Date(selectedPackage.departureDate).toLocaleDateString()} • {selectedPackage.duration}
                          </span>
                        </p>
                        <p className="font-medium text-lg">
                          {selectedPackage.tourName}
                        </p>
                        <p className="text-primary font-medium">
                          ৳{selectedPackage.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Merchant Info</h4>
                      <div className="flex items-center gap-3">
                        {selectedPackage.guidePhoto && (
                          <img
                            src={selectedPackage.guidePhoto}
                            alt="Guide"
                            className="h-10 w-10 rounded-full"
                          />
                        )}
                        <div>
                          <p className="font-medium">{selectedPackage.guideName}</p>
                          <p className="text-sm text-muted-foreground">
                            {selectedPackage.guideEmail}
                          </p>
                          <p className="text-sm">{selectedPackage.contact}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedPackage.image && (
                      <img
                        src={selectedPackage.image}
                        alt="Tour"
                        className="rounded-lg object-cover w-full h-48"
                      />
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Package Details</h4>
                  <div className="prose prose-sm max-w-none text-foreground">
                    {selectedPackage.details}
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Submitted: {new Date(selectedPackage.createdAt).toLocaleString()}</span>
                    <span>Pending for: {getDaysPending(selectedPackage.createdAt)} days</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PendingPackages;