import React from "react";
import Dashboard from "../../components/Dashboard";
import Navbar from "@/components/Navbar";

const DashboardPage = () => {
  return (
    <>
      <Navbar isDashboard={true} />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
