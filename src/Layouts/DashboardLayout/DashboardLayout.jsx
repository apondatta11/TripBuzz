import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router';
import {
    FaHome,
    FaBoxOpen,
    FaMoneyCheckAlt,
    FaUserEdit,
    FaUserCheck,
    FaUserClock,
    FaUserShield,
    FaMotorcycle,
    FaTasks,
    FaCheckCircle,
    FaWallet,
    FaBars,
    FaTimes,
    FaStore,
    FaClipboardCheck,
    FaClipboardList,
    FaHourglassHalf
} from 'react-icons/fa';
import useUserRole from '@/Hooks/useUserRole';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import UseAuth from '@/Hooks/UseAuth';
import { FiPackage } from 'react-icons/fi';



const DashboardLayout = () => {
    const { role, roleLoading } = useUserRole();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user } = UseAuth()

    return (
        <div className="flex h-screen w-full overflow-hidden bg-background">
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-background border-b border-border/40">
                <div className="flex h-16 items-center px-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="mr-2"
                    >
                        {sidebarOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
                    </Button>
                    <div className="flex-1 font-medium">Dashboard</div>
                    <div className="ml-auto flex items-center space-x-4">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/avatars/user.png" />
                            <AvatarFallback>US</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

            {/* Sidebar */}
            <AnimatePresence>
                {(sidebarOpen || !window.matchMedia('(max-width: 1023px)').matches) && (
                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className={cn(
                            'fixed lg:relative z-30 flex h-full w-72 flex-col border-r border-border/40 bg-background',
                            !sidebarOpen && 'hidden lg:flex'
                        )}
                    >
                        {/* Logo & user part */}
                        <div className="flex h-16 items-center px-6 border-b border-border/40">
                            <NavLink to="/" className="flex items-center gap-2 font-semibold">
                                <span className="text-lg">TripBuzz</span>
                                <Badge variant="outline" className="ml-auto">
                                    {role}
                                </Badge>
                            </NavLink>
                        </div>

                        <div className="flex-1 overflow-y-auto py-4">
                            <nav className="space-y-1 px-4">
                                <DashboardNavItem to="/dashboard" icon={<FaHome />}>
                                    Home
                                </DashboardNavItem>
                                {!roleLoading && role === 'user' && (
                                    <>
                                        <Separator className="my-2" />
                                        <p className="px-4 text-xs font-medium text-muted-foreground">User</p>
                                        <DashboardNavItem to="/dashboard/myBookings" icon={<FaBoxOpen />}>
                                            My Bookings
                                        </DashboardNavItem>
                                        <DashboardNavItem
                                            to="/dashboard/be-a-merchant"
                                            icon={<FaStore className="text-yellow-500" />}
                                        >
                                            <div className="flex items-center gap-2">
                                                Become a Merchant
                                                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
                                                    New
                                                </span>
                                            </div>
                                        </DashboardNavItem>
                                        {/* <DashboardNavItem to="/dashboard/payment" icon={<FaBoxOpen />}>
                                            Pay Now
                                        </DashboardNavItem> */}
                                    </>
                                )}
                                {!roleLoading && role === 'merchant' && (
                                    <>
                                        <Separator className="my-2" />
                                        <p className="px-4 text-xs font-medium text-muted-foreground">Rider</p>

                                        <DashboardNavItem
                                            to="/addpackages"
                                            icon={<FiPackage />} // Adding a package
                                        >
                                            Add Packages
                                        </DashboardNavItem>
                                        <DashboardNavItem
                                            to="/dashboard/update-merchant-profile"
                                            icon={<FiPackage />}
                                        >
                                            Update Profile
                                        </DashboardNavItem>

                                        <DashboardNavItem
                                            to="/manage-packages"
                                            icon={<FaClipboardList />} // Managing package list
                                        >
                                            Manage Packages
                                        </DashboardNavItem>

                                        <DashboardNavItem
                                            to="/dashboard/pending-packages"
                                            icon={<FaHourglassHalf />} // Waiting for approval
                                        >
                                            Pending Packages
                                        </DashboardNavItem>

                                        <DashboardNavItem
                                            to="/dashboard/approved-packages"
                                            icon={<FaClipboardCheck />} // Approved packages
                                        >
                                            Approved Packages
                                        </DashboardNavItem>


                                    </>
                                )}

                                {!roleLoading && role === 'admin' && (
                                    <>
                                        <Separator className="my-2" />
                                        <p className="px-4 text-xs font-medium text-muted-foreground">Admin</p>
                                        <DashboardNavItem
                                            to="/dashboard/pending-merchants"
                                            icon={<FaUserClock />}
                                        >
                                            Pending Merchants
                                        </DashboardNavItem>
                                        <DashboardNavItem
                                            to="/dashboard/active-merchants"
                                            icon={<FaUserCheck />}
                                        >
                                            Active Merchants
                                        </DashboardNavItem>
                                        <DashboardNavItem
                                            to="/dashboard/approved-packages"
                                            icon={<FaClipboardCheck />} // Approved icon
                                        >
                                            Approved Packages
                                        </DashboardNavItem>

                                        <DashboardNavItem
                                            to="/dashboard/package-approvals"
                                            icon={<FaClipboardCheck />} // Approved icon
                                        >
                                            Packages Approval
                                        </DashboardNavItem>


                                        <DashboardNavItem
                                            to="/dashboard/makeAdmin"
                                            icon={<FaUserShield />} // Admin icon
                                        >
                                            Make Admin
                                        </DashboardNavItem>


                                    </>
                                )}
                            </nav>
                        </div>

                        <div className="p-4 border-t border-border/40">
                            <div className="flex items-center gap-4">
                                <Avatar>
                                    <AvatarImage src={user.photoURL} />
                                    <AvatarFallback>US</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="truncate font-medium">{user.displayName}</p>
                                    <p className="truncate text-sm text-muted-foreground">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden pt-16 lg:pt-0">
                <main className="flex-1 overflow-y-auto p-6 bg-muted/10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

const DashboardNavItem = ({ to, icon, children }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                cn(
                    'flex items-center gap-3 rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground',
                    isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                )
            }
        >
            <span className="flex h-5 w-5 items-center justify-center">{icon}</span>
            <span>{children}</span>
        </NavLink>
    );
};

export default DashboardLayout;