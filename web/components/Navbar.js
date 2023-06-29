import React, { useState } from "react";

import Link from "next/link";
const Navbar = ({ isDashboard }) => {
  const [isLogin, setIsLogin] = useState(isDashboard);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-light bg-light"
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
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
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
