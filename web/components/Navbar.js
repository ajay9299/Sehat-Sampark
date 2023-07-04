import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Navbar = ({ isDashboard }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(null);
  const [toggle, isSetToggle] = useState(false);
  const [className, setClassName] = useState("collapse navbar-collapse");
  const [formClass, setFormClass] = useState("form-inline my-2 my-lg-0");
  const [buttonClass, setButtonClass] = useState("btn btn-outline-danger mx-2");
  const [isConsult, setIsConsult] = useState(false);
  useEffect(() => {
    setIsLogin(isDashboard);
    const patientId = localStorage.getItem("patientId");
    if (patientId) {
      setIsConsult(true);
    }
  }, [isDashboard]);

  const handleLogoutFunctionality = () => {
    localStorage.clear();
    router.push("/");
  };

  const handleHelpFunctionality = () => {
    router.push({
      pathname: "./help",
    });
  };

  const handleMyProfileFunctionality = () => {
    router.push({ pathname: "/profile" });
  };

  const handleConsultHistoryFunctionality = () => {
    router.push({ pathname: "/patienthistory" });
  };

  const handleConsultNewPatientFunctionality = () => {
    localStorage.removeItem("patientId");
    setIsConsult(false);
    router.push({ pathname: "/dashboard" });
  };

  const handleConsultFromFunctionality = () => {
    router.push({ pathname: "/consult" });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light px-3"
        style={{ marginBottom: "50px" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => {
            setClassName(
              className === "collapse navbar-collapse"
                ? "collapse navbar-collapse show"
                : "collapse navbar-collapse"
            );
            setFormClass(
              formClass === "form-inline my-2 my-lg-0"
                ? "form-inline my-2 my-lg-0 flex-column"
                : "form-inline my-2 my-lg-0"
            );
            setButtonClass(
              buttonClass === "btn btn-outline-danger mx-2"
                ? "btn btn-outline-danger mx-2 w-100 border-0"
                : "btn btn-outline-danger mx-2"
            );
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link
          href="/"
          className="navbar-brand text-danger font-weight-bold"
          onClick={handleConsultNewPatientFunctionality}
        >
          Sehat Sampark
        </Link>
        <div className={className} id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <form className={formClass}>
            <button
              className={buttonClass}
              type="button"
              onClick={handleHelpFunctionality}
            >
              Help
            </button>

            {isConsult && (
              <button
                className={buttonClass}
                type="button"
                onClick={handleConsultHistoryFunctionality}
              >
                Consult History
              </button>
            )}
            {isConsult && (
              <button
                className={buttonClass}
                type="button"
                onClick={handleConsultNewPatientFunctionality}
              >
                Consult New Patient
              </button>
            )}
            {isConsult && (
              <button
                className={buttonClass}
                type="button"
                onClick={handleConsultFromFunctionality}
              >
                Consult Form
              </button>
            )}
            {isLogin && (
              <button
                className={buttonClass}
                type="button"
                onClick={handleMyProfileFunctionality}
              >
                MyProfile
              </button>
            )}
            {isLogin && (
              <button
                className={buttonClass}
                type="button"
                onClick={handleLogoutFunctionality}
              >
                Logout
              </button>
            )}
          </form>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
