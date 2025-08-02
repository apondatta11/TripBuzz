import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
// import { Helmet } from "react-helmet";
import { showSuccessToast } from "../../../Utilities/Toasterror";


const ForgotPassword = () => {
  const location = useLocation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [location]);

  const handleReset = (e) => {
    e.preventDefault();
    if (!email) return;
    showSuccessToast("Reset email sent. Check your Gmail.");
    setTimeout(() => {
      window.open("https://mail.google.com/", "_blank");
    }, 2000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-[90vw] mx-auto">
      {/* <Helmet>
        <title>Password Reset</title>
      </Helmet> */}
      <div className="card bg-cyan-50 shadow-xl w-full max-w-sm p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <label className="label">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-info btn-outline w-full">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
