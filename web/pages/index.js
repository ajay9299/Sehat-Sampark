import LandingPage from "../components/LandingPage";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar isDashboard={false} />
      <LandingPage />
    </>
  );
}
