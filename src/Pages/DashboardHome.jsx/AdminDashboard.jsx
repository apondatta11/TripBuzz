import { useQuery } from '@tanstack/react-query'
import { FiPackage, FiUsers, FiCheckCircle, FiDollarSign, FiAlertCircle, FiClock } from 'react-icons/fi'
import useAxiosSecure from '@/hooks/useAxiosSecure'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { FaBangladeshiTakaSign } from 'react-icons/fa6'
import { NavLink } from 'react-router'

const AdminDashboard = () => {
  const axiosSecure = useAxiosSecure()

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/stats')
      return res.data.data
    }
  })


  const { data: pendingPackages, isLoading: packagesLoading } = useQuery({
    queryKey: ['pending-packages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/pending-packages')
      return res.data.data 
    }
  })

  const { data: recentPackages, isLoading: recentLoading } = useQuery({
    queryKey: ['recent-packages'],
    queryFn: async () => {
      const res = await axiosSecure.get('/dashboard/recent-packages?limit=5')
      return res.data.data 
    }
  })


  return (
    <div className="container py-6 space-y-6">
      {/* Dashboard Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>
        <p className="text-muted-foreground text-center">
          Overview of your tour package management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Packages</CardTitle>
            <FiPackage className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{stats?.totalPackages || 0}</div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              All packages in the system
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <FiClock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{stats?.pendingPackages || 0}</div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Needs your review
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Approved Packages</CardTitle>
            <FiCheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">{stats?.approvedPackages || 0}</div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              Currently active
            </p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <FaBangladeshiTakaSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {statsLoading ? (
              <Skeleton className="h-8 w-1/2" />
            ) : (
              <div className="text-2xl font-bold">৳{stats?.totalRevenue?.toLocaleString() || 0}</div>
            )}
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">
              All-time earnings
            </p>
          </CardFooter>
        </Card>
      </div>

      {/* Pending Approvals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FiAlertCircle className="h-5 w-5 text-yellow-500" />
            Packages Pending Approval
          </CardTitle>
        </CardHeader>
        <CardContent>
          {packagesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : pendingPackages?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingPackages.map((pkg) => (
                  <TableRow key={pkg._id}>
                    <TableCell className="font-medium">{pkg.tourName}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>৳ {pkg.price.toLocaleString()}</TableCell>
                    <TableCell>
                      {new Date(pkg.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <NavLink to={`/dashboard/package-approvals`}>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                      </NavLink>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No packages pending approval
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Packages Section */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Added Packages</CardTitle>
        </CardHeader>
        <CardContent>
          {recentLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          ) : recentPackages?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tour Name</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Date Added</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPackages.map((pkg) => (
                  <TableRow key={pkg._id}>
                    <TableCell className="font-medium">{pkg.tourName}</TableCell>
                    <TableCell>{pkg.destination}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pkg.status === 'approved' ? 'default' :
                            pkg.status === 'pending' ? 'secondary' : 'destructive'
                        }
                      >
                        {pkg.status} 
                      </Badge>
                    </TableCell>
                    <TableCell>${pkg.price.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      {new Date(pkg.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No packages found
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline">View All Packages</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default AdminDashboard