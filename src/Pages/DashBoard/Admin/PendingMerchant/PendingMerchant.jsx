import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Check, X, Eye, Loader2 } from "lucide-react";
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

const PendingMerchants = () => {
    const [selectedMerchant, setSelectedMerchant] = useState(null);
    const axiosSecure = useAxiosSecure();

    const {
        data: merchants = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ["pending-merchants"],
        queryFn: async () => {
            const res = await axiosSecure.get("/merchants/pending");
            return res.data;
        },
    });

    const { mutate: updateStatus } = useMutation({
        mutationFn: async ({ id, status, email }) => {
            await axiosSecure.patch(`/merchants/${id}/status`, { status, email });
        },
        onSuccess: () => {
            toast.success("Merchant status updated");
            refetch();
        },
        onError: (error) => {
            toast.error("Failed to update status", {
                description: error.response?.data?.message,
            });
        },
    });

    const handleDecision = (id, action, email) => {
        console.log('Button clicked', id, action); // Check if this logs

        toast(`Are you sure you want to ${action} this merchant?`, {
            action: {
                label: "Confirm",
                onClick: () =>
                    updateStatus({ id, status: action === "approve" ? "active" : "rejected", email }),
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
                <CardTitle className="text-2xl font-semibold">
                    Pending Merchant Applications
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Business</TableHead>
                                <TableHead>Owner</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Applied</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {merchants.map((merchant) => (
                                <TableRow key={merchant._id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            {merchant.businessInfo.logoUrl && (
                                                <img
                                                    src={merchant.businessInfo.logoUrl}
                                                    alt="Logo"
                                                    className="h-8 w-8 rounded-md object-cover"
                                                />
                                            )}
                                            <span>{merchant.businessInfo.businessName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{merchant.userInfo.name}</span>
                                            <span className="text-muted-foreground text-sm">
                                                {merchant.userInfo.email}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">
                                            {merchant.businessInfo.businessType}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {merchant.address.city}, {merchant.address.country}
                                    </TableCell>
                                    <TableCell>
                                        {new Date(merchant.createdAt).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => setSelectedMerchant(merchant)}

                                            >
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            {/* <Button
                                                variant="success"
                                                size="icon"
                                                onClick={() =>
                                                    handleDecision(
                                                        merchant._id,
                                                        "approve",
                                                        merchant.userInfo.email
                                                    )
                                                }
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={() =>
                                                    handleDecision(
                                                        merchant._id,
                                                        "reject",
                                                        merchant.userInfo.email
                                                    )
                                                }
                                            >
                                                <X className="h-4 w-4" />
                                            </Button> */}
                                            <Button
                                                variant="success"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDecision(merchant._id, "approve", merchant.userInfo.email);
                                                }}
                                                className="hover:bg-green-600"
                                            >
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleDecision(merchant._id, "reject", merchant.userInfo.email);
                                                }}
                                                className="hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Merchant Details Dialog */}
                <Dialog
                    open={!!selectedMerchant}
                    onOpenChange={(open) => !open && setSelectedMerchant(null)}
                >
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Merchant Details</DialogTitle>
                        </DialogHeader>
                        {selectedMerchant && (
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="font-medium">Business Information</h4>
                                        <div className="mt-2 space-y-1 text-sm">
                                            <p>
                                                <span className="text-muted-foreground">Name:</span>{" "}
                                                {selectedMerchant.businessInfo.businessName}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Type:</span>{" "}
                                                {selectedMerchant.businessInfo.businessType}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">
                                                    Description:
                                                </span>{" "}
                                                {selectedMerchant.businessInfo.description}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">
                                                    Years in Business:
                                                </span>{" "}
                                                {selectedMerchant.businessInfo.yearsInOperation}
                                            </p>
                                            {selectedMerchant.businessInfo.website && (
                                                <p>
                                                    <span className="text-muted-foreground">
                                                        Website:
                                                    </span>{" "}
                                                    <a
                                                        href={`https://${selectedMerchant.businessInfo.website}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-primary hover:underline"
                                                    >
                                                        {selectedMerchant.businessInfo.website}
                                                    </a>
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Owner Information</h4>
                                        <div className="mt-2 space-y-1 text-sm">
                                            <p>
                                                <span className="text-muted-foreground">Name:</span>{" "}
                                                {selectedMerchant.userInfo.name}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Email:</span>{" "}
                                                {selectedMerchant.userInfo.email}
                                            </p>
                                            <p>
                                                <span className="text-muted-foreground">Phone:</span>{" "}
                                                {selectedMerchant.userInfo.phone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-medium">Business Address</h4>
                                    <div className="mt-2 space-y-1 text-sm">
                                        <p>{selectedMerchant.address.street}</p>
                                        <p>
                                            {selectedMerchant.address.city},{" "}
                                            {selectedMerchant.address.state}
                                        </p>
                                        <p>
                                            {selectedMerchant.address.postalCode},{" "}
                                            {selectedMerchant.address.country}
                                        </p>
                                    </div>
                                </div>

                                {selectedMerchant.businessInfo.logoUrl && (
                                    <div>
                                        <h4 className="font-medium">Business Logo</h4>
                                        <img
                                            src={selectedMerchant.businessInfo.logoUrl}
                                            alt="Business Logo"
                                            className="mt-2 h-32 w-32 rounded-md object-cover"
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

export default PendingMerchants;