import { useEffect, useState } from "react";
import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    const tokenObtained = localStorage.getItem("token");
    if (tokenObtained) {
      router.replace("/dashboard");
    } else {
      setIsShow(true);
    }
  }, []);

  return (
    <>
      {isShow && (
        <>
          <Navbar isDashboard={false} />
          <LandingPage />
        </>
      )}
    </>
  );
}
