import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Home() {
  return (
    <>
      <Navbar isDashboard={false} />
      <LandingPage />
    </>
  );
}
