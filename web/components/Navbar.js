import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const Navbar = ({ isDashboard }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(isDashboard);

  const handleLogoutfunctionality = () => {
    console.log("hello");
    localStorage.clear();
    router.push("http://localhost:3000");
  };
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light "
        style={{ marginBottom: "100px" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link href="/" className="navbar-brand text-danger font-weight-bold">
          Sehat Sampark
        </Link>
        <div className="collapse navbar-collapse " id="navbarTogglerDemo03">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <form className="form-inline my-2 my-lg-0">
            {!isLogin && (
              <button
                className="btn btn-outline-danger my-2 my-sm-0 mr-3"
                type="submit"
              >
                Help
              </button>
            )}
            {isLogin && (
              <button
                className="btn btn-outline-danger my-2 my-sm-0 mr-3"
                type="submit"
              >
                MyProfile
              </button>
            )}

            {isLogin && (
              <button
                className="btn btn-outline-danger my-2 my-sm-0"
                type="submit"
                onClick={handleLogoutfunctionality}
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
