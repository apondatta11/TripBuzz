import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FiCalendar, FiUsers, FiPackage, FiBarChart2 } from 'react-icons/fi'

const DashboardHome = () => {
  return (
    <div className="container py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Merchant!</h1>
        <p className="text-muted-foreground mt-2">
          Here's what's happening with your platform today
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <FiUsers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary/10 to-secondary/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Packages
            </CardTitle>
            <FiPackage className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground mt-1">
              5 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-accent/10 to-accent/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Pending Approvals
            </CardTitle>
            <FiCalendar className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs your review
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-muted/10 to-muted/5">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <FiBarChart2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,780</div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <Button variant="outline" className="gap-2">
              <FiPackage className="h-4 w-4" />
              Add New Package
            </Button>
            <Button variant="outline" className="gap-2">
              <FiUsers className="h-4 w-4" />
              Manage Users
            </Button>
            <Button variant="outline" className="gap-2">
              <FiCalendar className="h-4 w-4" />
              View Approvals
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                id: 1,
                action: 'New package submitted',
                user: 'Travel Explorer',
                time: '2 hours ago',
                icon: <FiPackage className="h-4 w-4 text-primary" />
              },
              {
                id: 2,
                action: 'User registration',
                user: 'john.doe@example.com',
                time: '5 hours ago',
                icon: <FiUsers className="h-4 w-4 text-secondary" />
              },
              {
                id: 3,
                action: 'Package approved',
                user: 'Mountain Adventure',
                time: '1 day ago',
                icon: <FiCalendar className="h-4 w-4 text-accent" />
              },
              {
                id: 4,
                action: 'Revenue processed',
                user: 'System',
                time: '2 days ago',
                icon: <FiBarChart2 className="h-4 w-4 text-muted-foreground" />
              }
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-muted/50">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{item.action}</div>
                  <div className="text-sm text-muted-foreground">
                    {item.user} • {item.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardHome