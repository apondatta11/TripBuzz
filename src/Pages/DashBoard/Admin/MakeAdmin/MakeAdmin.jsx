// import { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
// import Swal from "sweetalert2";
// import useAxiosSecure from "@/Hooks/useAxiosSecure";

// const MakeAdmin = () => {
//     const axiosSecure = useAxiosSecure();
//     const [emailQuery, setEmailQuery] = useState("");

//     const {
//         data: users = [],
//         refetch,
//         isFetching,
//     } = useQuery({
//         queryKey: ["searchedUsers", emailQuery],
//         enabled: !!emailQuery,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
//             return res.data;
//         },
//     });

//     const { mutateAsync: updateRole } = useMutation({
//         mutationFn: async ({ id, role }) =>
//             await axiosSecure.patch(`/users/${id}/role`, { role }),
//         onSuccess: () => {
//             refetch();
//         },
//     });

//     const handleRoleChange = async (id, currentRole) => {
//         const action = currentRole === "admin" ? "Remove admin" : "Make admin";
//         const newRole = currentRole === "admin" ? "user" : "admin";

//         const confirm = await Swal.fire({
//             title: `${action}?`,
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonText: "Yes",
//             cancelButtonText: "Cancel",
//         });

//         if (!confirm.isConfirmed) return;

//         try {
//             await updateRole({ id, role: newRole });
//             Swal.fire("Success", `${action} successful`, "success");
//         } catch (error) {
//             console.log(error);
//             Swal.fire("Error", "Failed to update user role", "error");
//         }
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">Make Admin</h2>

//             <div className="flex gap-2 mb-6 items-center">
//                 <FaSearch />
//                 <input
//                     type="text"
//                     className="input input-bordered w-full max-w-md"
//                     placeholder="Search user by email"
//                     value={emailQuery}
//                     onChange={(e) => setEmailQuery(e.target.value)}
//                 />
//             </div>

//             {isFetching && <p>Loading users...</p>}

//             {!isFetching && users.length === 0 && emailQuery && (
//                 <p className="text-gray-500">No users found.</p>
//             )}

//             {users.length > 0 && (
//                 <div className="overflow-x-auto">
//                     <table className="table w-full table-zebra">
//                         <thead>
//                             <tr>
//                                 <th>Email</th>
//                                 <th>Created At</th>
//                                 <th>Role</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((u) => (
//                                 <tr key={u._id}>
//                                     <td>{u.email}</td>
//                                     <td>{new Date(u.created_at).toLocaleDateString()}</td>
//                                     <td>
//                                         <span
//                                             className={`badge ${u.role === "admin" ? "badge-success" : "badge-ghost"
//                                                 }`}
//                                         >
//                                             {u.role || "user"}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         <button
//                                             onClick={() => handleRoleChange(u._id, u.role || "user")}
//                                             className={`btn btn-sm text-black ${u.role === "admin" ? "btn-error" : "btn-primary"
//                                                 }`}
//                                         >
//                                             {u.role === "admin" ? (
//                                                 <>
//                                                     <FaUserTimes className="mr-1" />
//                                                     Remove Admin
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <FaUserShield className="mr-1" />
//                                                     Make Admin
//                                                 </>
//                                             )}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MakeAdmin;

// import { useState } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { FaSearch, FaUserShield, FaUserTimes } from "react-icons/fa";
// import Swal from "sweetalert2";
// import useAxiosSecure from "@/Hooks/useAxiosSecure";

// const MakeAdmin = () => {
//     const axiosSecure = useAxiosSecure();
//     const [emailQuery, setEmailQuery] = useState("");
//     const [showAllUsers, setShowAllUsers] = useState(true);

//     const {
//         data: users = [],
//         refetch,
//         isLoading,
//     } = useQuery({
//         queryKey: ["users", emailQuery],
//         queryFn: async () => {
//             const endpoint = emailQuery 
//                 ? `/users/search?email=${emailQuery}`
//                 : "/users";
//             const res = await axiosSecure.get(endpoint);
//             return res.data;
//         },
//     });

//     const { mutateAsync: updateRole } = useMutation({
//         mutationFn: async ({ id, role }) =>
//             await axiosSecure.patch(`/users/${id}/role`, { role }),
//         onSuccess: () => {
//             refetch();
//         },
//     });

//     const handleRoleChange = async (id, currentRole) => {
//         const action = currentRole === "admin" ? "Remove admin" : "Make admin";
//         const newRole = currentRole === "admin" ? "user" : "admin";

//         const confirm = await Swal.fire({
//             title: `${action}?`,
//             icon: "question",
//             showCancelButton: true,
//             confirmButtonText: "Yes",
//             cancelButtonText: "Cancel",
//         });

//         if (!confirm.isConfirmed) return;

//         try {
//             await updateRole({ id, role: newRole });
//             Swal.fire("Success", `${action} successful`, "success");
//         } catch (error) {
//             console.log(error);
//             Swal.fire("Error", "Failed to update user role", "error");
//         }
//     };

//     const handleSearch = (e) => {
//         e.preventDefault();
//         setShowAllUsers(false);
//         refetch();
//     };

//     return (
//         <div className="p-6">
//             <h2 className="text-2xl font-semibold mb-4">User Administration</h2>

//             <form onSubmit={handleSearch} className="flex gap-2 mb-6 items-center">
//                 <FaSearch />
//                 <input
//                     type="text"
//                     className="input input-bordered w-full max-w-md"
//                     placeholder="Search user by email"
//                     value={emailQuery}
//                     onChange={(e) => setEmailQuery(e.target.value)}
//                 />
//                 <button type="submit" className="btn btn-primary">
//                     Search
//                 </button>
//                 <button 
//                     type="button" 
//                     className="btn btn-ghost"
//                     onClick={() => {
//                         setEmailQuery("");
//                         setShowAllUsers(true);
//                         refetch();
//                     }}
//                 >
//                     Show All Users
//                 </button>
//             </form>

//             {isLoading ? (
//                 <p>Loading users...</p>
//             ) : users.length === 0 ? (
//                 <p className="text-gray-500">No users found.</p>
//             ) : (
//                 <div className="overflow-x-auto">
//                     <table className="table w-full table-zebra">
//                         <thead>
//                             <tr>
//                                 <th>Email</th>
//                                 <th>Created At</th>
//                                 <th>Role</th>
//                                 <th>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((u) => (
//                                 <tr key={u._id}>
//                                     <td>{u.email}</td>
//                                     <td>{new Date(u.created_at).toLocaleDateString()}</td>
//                                     <td>
//                                         <span
//                                             className={`badge ${u.role === "admin" ? "badge-success" : "badge-ghost"
//                                                 }`}
//                                         >
//                                             {u.role || "user"}
//                                         </span>
//                                     </td>
//                                     <td>
//                                         <button
//                                             onClick={() => handleRoleChange(u._id, u.role || "user")}
//                                             className={`btn btn-sm text-black ${u.role === "admin" ? "btn-error" : "btn-primary"
//                                                 }`}
//                                         >
//                                             {u.role === "admin" ? (
//                                                 <>
//                                                     <FaUserTimes className="mr-1" />
//                                                     Remove Admin
//                                                 </>
//                                             ) : (
//                                                 <>
//                                                     <FaUserShield className="mr-1" />
//                                                     Make Admin
//                                                 </>
//                                             )}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                     <div className="mt-4 text-sm text-gray-500">
//                         Showing {users.length} user(s)
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MakeAdmin;



import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaUserTimes, FaUsers, FaFilter } from "react-icons/fa";
import { FiRefreshCw } from "react-icons/fi";
import Swal from "sweetalert2";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

const MakeAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const {
        data: users = [],
        refetch,
        isLoading,
        isRefetching,
    } = useQuery({
        queryKey: ["users", emailQuery, roleFilter],
        queryFn: async () => {
            const params = new URLSearchParams();
            if (emailQuery) params.append("search", emailQuery); // Changed from 'email' to 'search'
            if (roleFilter !== "all") params.append("role", roleFilter);

            const res = await axiosSecure.get(`/users?${params.toString()}`);
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({
        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    // const handleRoleChange = async (id, currentRole) => {
    //     const action = currentRole === "admin" ? "Remove admin" : "Make admin";
    //     const newRole = currentRole === "admin" ? "user" : "admin";

    //     const confirm = await Swal.fire({
    //         title: `${action}?`,
    //         text: `This will change the user's role to ${newRole}`,
    //         icon: "question",
    //         showCancelButton: true,
    //         confirmButtonColor: "oklch(var(--primary))",
    //         cancelButtonColor: "oklch(var(--destructive))",
    //         confirmButtonText: "Confirm",
    //         cancelButtonText: "Cancel",
    //         background: "oklch(var(--card))",
    //         color: "oklch(var(--card-foreground))",
    //     });

    //     if (!confirm.isConfirmed) return;

    //     try {
    //         await updateRole({ id, role: newRole });
    //         Swal.fire({
    //             title: "Success!",
    //             text: `${action} successful`,
    //             icon: "success",
    //             background: "oklch(var(--card))",
    //             color: "oklch(var(--card-foreground))",
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         Swal.fire({
    //             title: "Error!",
    //             text: "Failed to update user role",
    //             icon: "error",
    //             background: "oklch(var(--card))",
    //             color: "oklch(var(--card-foreground))",
    //         });
    //     }
    // };

const handleRoleChange = async (id, currentRole) => {
  const action = currentRole === "admin" ? "Remove admin" : "Make admin";
  const newRole = currentRole === "admin" ? "user" : "admin";

  const result = await Swal.fire({
    title: `Are you sure?`,
    text: `You are about to ${action.toLowerCase()} this user`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed',
    cancelButtonText: 'Cancel',
    background: '#ffffff',
    backdrop: `
      rgba(0,0,0,0.5)
      left top
      no-repeat
    `
  });

  if (result.isConfirmed) {
    try {
      await updateRole({ id, role: newRole });
      Swal.fire(
        'Success!',
        `User role has been ${newRole === 'admin' ? 'promoted to admin' : 'changed to regular user'}`,
        'success'
      );
    } catch (error) {
      Swal.fire(
        'Error!',
        'Failed to update user role',
        'error'
      );
    }
  }
};
    const stats = users.reduce((acc, user) => {
        acc.total++;
        if (user.role === "admin") acc.admins++;
        return acc;
    }, { total: 0, admins: 0 });

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col gap-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-primary-foreground">User Management</h2>
                        <p className="text-muted-foreground">Manage user roles and permissions</p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => refetch()}
                            className="btn btn-ghost gap-2"
                            disabled={isRefetching}
                        >
                            <FiRefreshCw className={`${isRefetching ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="card bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
                        <div className="card-body p-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-primary-foreground/20">
                                    <FaUsers className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Total Users</h3>
                                    <p className="text-2xl font-bold">{stats.total}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
                        <div className="card-body p-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-full bg-accent-foreground/20">
                                    <FaUserShield className="text-2xl" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Admin Users</h3>
                                    <p className="text-2xl font-bold">{stats.admins}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="card bg-card shadow-sm">
                    <div className="card-body p-4 md:p-6">
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="flex-1 w-full">
                                <label className="label">
                                    <span className="label-text text-muted-foreground mb-2">Search Users</span>
                                </label>
                                <div className="relative">
                                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                                    <input
                                        type="text"
                                        className="input input-bordered bg-secondary w-full pl-10"
                                        placeholder="Search by email..."
                                        value={emailQuery}
                                        onChange={(e) => setEmailQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-auto">
                                <label className="label">
                                    <span className="label-text text-muted-foreground mb-2">Filter by Role</span>
                                </label>
                                <select
                                    className="select select-bordered w-full bg-secondary"
                                    value={roleFilter}
                                    onChange={(e) => setRoleFilter(e.target.value)}
                                >
                                    <option value="all">All Roles</option>
                                    <option value="admin">Admins Only</option>
                                    <option value="user">Regular Users</option>
                                </select>
                            </div>
                            <button
                                className="btn btn-primary gap-2"
                                onClick={() => refetch()}
                                disabled={isLoading || isRefetching}
                            >
                                <FaFilter />
                                Apply Filters
                            </button>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="card bg-card shadow-sm overflow-hidden">
                    <div className="card-body p-0">
                        {isLoading ? (
                            <div className="p-8 flex flex-col items-center justify-center gap-4">
                                <span className="loading loading-spinner loading-lg text-primary"></span>
                                <p className="text-muted-foreground">Loading users...</p>
                            </div>
                        ) : users.length === 0 ? (
                            <div className="p-8 flex flex-col items-center justify-center gap-4 text-center">
                                <FaUsers className="text-4xl text-muted-foreground" />
                                <h3 className="text-xl font-medium">No users found</h3>
                                <p className="text-muted-foreground">
                                    {emailQuery || roleFilter !== "all"
                                        ? "Try adjusting your search filters"
                                        : "There are currently no users in the system"}
                                </p>
                                <button
                                    className="btn btn-ghost text-primary"
                                    onClick={() => {
                                        setEmailQuery("");
                                        setRoleFilter("all");
                                        refetch();
                                    }}
                                >
                                    Reset Filters
                                </button>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="table">
                                    <thead>
                                        <tr className="bg-muted/50">
                                            <th className="text-muted-foreground">User</th>
                                            <th className="text-muted-foreground">Role</th>
                                            <th className="text-muted-foreground">Joined</th>
                                            <th className="text-muted-foreground text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user._id} className="hover:bg-muted/10">
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div>
                                                            <div className="font-medium">{user.email}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge ${user.role === "admin" ? "badge-primary" : "badge-outline"}`}>
                                                        {user.role || "user"}
                                                    </span>
                                                </td>
                                                <td>
                                                    {new Date(user.created_at).toLocaleDateString()}
                                                </td>
                                                <td className="text-right">
                                                    <button
                                                        onClick={() => handleRoleChange(user._id, user.role || "user")}
                                                        className={`btn btn-sm ${user.role === "admin" ? "btn-error" : "btn-primary"}`}
                                                    >
                                                        {user.role === "admin" ? (
                                                            <>
                                                                <FaUserTimes className="mr-1" />
                                                                Remove Admin
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FaUserShield className="mr-1" />
                                                                Make Admin
                                                            </>
                                                        )}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeAdmin;