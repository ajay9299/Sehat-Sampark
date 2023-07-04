import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";

const DashboardPage = () => {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (!tokenObtained) {
      router.replace("/");
    } else {
      setIsShow(true);
    }
  }, []);
  return (
    <>
      {isShow && (
        <>
          <Navbar isDashboard={true} />
          <Dashboard />
        </>
      )}
    </>
  );
};

export default DashboardPage;
