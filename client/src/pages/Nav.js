import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav({ fetchUrl }) {
  const [show, handleShow] = useState(false);
  const [searchTerm, setSearchTeam] = useState();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, [fetchUrl]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    fetch(fetchUrl + searchTerm)
      .then((res) => res.json())
      .then((data) => {
        searchTerm(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTeam(e.target.value);
    
  };

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="logo__links">
        <Link to="/">
          <img
            className="website-logo"
            src="https://fontmeme.com/permalink/210902/ea52f9be615d012bb9369788bfdc977f.png"
            alt="netflix-font"
            border="0"
          />
        </Link>
        <ul>
          <li>
            <a className="text-decoration-none" href="/">Home</a>
          </li>
          <li>
            <a className="text-decoration-none" href="/mylist">My List</a>
          </li>
          <li>
            <a className="text-decoration-none" href="/signin">Log In</a>
          </li>
          <li>
            <a className="text-decoration-none" href="/list">List</a>
          </li>
          <li>
            <a className="text-decoration-none" href="/foobar">Foobar</a>
          </li>
        </ul>
      </div>
      <div>
        <form onSubmit={handleOnSubmit}>
          <input
            className="search__bar"
            type="search"
            placeholder="Search-bar"
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </div>
    </div >
  );
}

export default Nav;
