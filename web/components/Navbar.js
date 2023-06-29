import React, { useState } from "react";
import Link from "next/link";
const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-light bg-light"
        style={{ marginBottom: "100px" }}
      >
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo03"
          aria-controls="navbarTogglerDemo03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <Link href="/" class="navbar-brand text-danger font-weight-bold">
          Sehat Sampark
        </Link>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul class="navbar-nav mr-auto mt-2 mt-lg-0"></ul>
          <form class="form-inline my-2 my-lg-0">
            {}
            {isLogin && (
              <button
                class="btn btn-outline-danger my-2 my-sm-0 mr-3"
                type="submit"
              >
                MyProfile
              </button>
            )}

            {isLogin && (
              <button class="btn btn-outline-danger my-2 my-sm-0" type="submit">
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
