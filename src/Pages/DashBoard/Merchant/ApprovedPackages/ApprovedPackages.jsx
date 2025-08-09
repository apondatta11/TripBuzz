import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Filter, PackageCheck, Star, CalendarDays, MapPin, DollarSign } from "lucide-react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ApprovedPackages = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const axiosSecure = useAxiosSecure();

  // Price range labels
  const priceRangeLabels = {
    "all": "Price Range",
    "under-10k": "Under ৳10K",
    "10k-20k": "৳10K-20K",
    "20k-50k": "৳20K-50K",
    "over-50k": "Over ৳50K"
  };

  // Fetch approved packages
  const {
    data: packages = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["approved-packages"],
    queryFn: async () => {
      const res = await axiosSecure.get("/packages/approved");
      return res.data;
    },
  });

  // Filter packages based on search and filters
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = searchTerm === "" ||
      pkg.tourName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.guideName.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDuration = durationFilter === "all" ||
      pkg.duration.toLowerCase().includes(durationFilter.toLowerCase());

    const matchesPrice = priceRange === "all" || (
      priceRange === "under-10k" && pkg.price < 10000 ||
      priceRange === "10k-20k" && pkg.price >= 10000 && pkg.price < 20000 ||
      priceRange === "20k-50k" && pkg.price >= 20000 && pkg.price < 50000 ||
      priceRange === "over-50k" && pkg.price >= 50000
    );

    return matchesSearch && matchesDuration && matchesPrice;
  });

  const getFeaturedBadge = (createdAt) => {
    const daysSinceApproval = Math.floor((new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24));
    return daysSinceApproval < 7 ? (
      <Badge variant="premium" className="ml-2">
        <Star className="h-3 w-3 mr-1" /> New
      </Badge>
    ) : null;
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-destructive">
        Failed to load packages. Please try again.
      </div>
    );
  }

  return (
    <Card className="border-none shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold flex items-center gap-2">
          <PackageCheck className="text-primary" />
          Approved Tour Packages
          <Badge variant="outline" className="ml-2">
            {packages.length} total
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search packages..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              value={durationFilter}
              onValueChange={setDurationFilter}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span>{durationFilter === "all" ? "Duration" : durationFilter}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Durations</SelectItem>
                <SelectItem value="1 day">1 Day</SelectItem>
                <SelectItem value="2 days">2 Days</SelectItem>
                <SelectItem value="3 days">3 Days</SelectItem>
                <SelectItem value="1 week">1 Week</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={priceRange}
              onValueChange={setPriceRange}
            >
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{priceRangeLabels[priceRange]}</span>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-10k">Under ৳10K</SelectItem>
                <SelectItem value="10k-20k">৳10K - ৳20K</SelectItem>
                <SelectItem value="20k-50k">৳20K - ৳50K</SelectItem>
                <SelectItem value="over-50k">Over ৳50K</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Packages Table */}
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tour Package</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array(5).fill(0).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell><Skeleton className="h-6 w-48" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20 ml-auto" /></TableCell>
                  </TableRow>
                ))
              ) : filteredPackages.length > 0 ? (
                filteredPackages.map((pkg) => (
                  <TableRow key={pkg._id} className="hover:bg-accent/10">
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-medium flex items-center">
                            {pkg.tourName}
                            {getFeaturedBadge(pkg.updatedAt || pkg.createdAt)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            by {pkg.guideName}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <MapPin className="h-3 w-3 mr-1" />
                        {pkg.destination}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-muted-foreground" />
                        {pkg.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(pkg.departureDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ৳{pkg.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <PackageCheck className="h-8 w-8" />
                      <p>No packages found matching your criteria</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSearchTerm("");
                          setDurationFilter("all");
                          setPriceRange("all");
                        }}
                      >
                        Clear filters
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Stats Footer */}
        {!isLoading && (
          <div className="flex justify-between items-center mt-4 text-sm text-muted-foreground">
            <div>
              Showing {filteredPackages.length} of {packages.length} packages
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>New this week</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApprovedPackages;