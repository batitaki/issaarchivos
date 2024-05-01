import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchProducts } from "../../services/fetchProducts";
import CartPreview from "../sections/cart/CartPreview";

import "./Navbar.css";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isHoveringItemCount, setIsHoveringItemCount] = useState(false); // State to track mouse hover

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItemCount(storedCart.length);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      const results = await searchProducts(searchTerm);

      const searchParams = new URLSearchParams({ search: searchTerm });

      window.location.href = `/issaarchivos/shop?${searchParams.toString()}`;
    }
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const handleMouseEnter = () => {
    setIsHoveringItemCount(true);
  };

  const handleMouseLeave = () => {
    setIsHoveringItemCount(false);
  };

  return (
    <div className="sidenav">
      <div className="nav-container">
        <Link className="nav-logo" to="/issaarchivos/">
          AIM
        </Link>
        <div className={`nav-options ${showSearchInput ? "active" : ""}`}>
          <Link className="nav-link" to="/issaarchivos/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/issaarchivos/collection">
            Collections
          </Link>
          <Link className="nav-link" to="/issaarchivos/collabs">
            Virtual Fiting
          </Link>
          <Link className="nav-link" to="/issaarchivos/about">
            About
          </Link>
        </div>
        <div className="side-options">
          {showSearchInput ? (
            <form className="search-form" onSubmit={handleSearch}>
              <div
                className={`search-input-wrapper ${showSearchInput ? "active" : ""}`}
              >
                <input
                  className="search-input"
                  type="text"
                  placeholder="SEARCH"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
                <button className="search-button" type="submit">
                  SEARCH
                </button>
              </div>
            </form>
          ) : (
            <span className="search-text" onClick={toggleSearchInput}>
              SEARCH
            </span>
          )}
          {!showSearchInput && (
            <>
              <Link className="search-text" to="/issaarchivos/login">
                LOG IN
              </Link>
              <Link
                className="nav-link"
                to="/issaarchivos/cart"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {" "}
                ({cartItemCount})
              </Link>
            </>
          )}
          {/* Conditionally render CartPreview component */}
          {isHoveringItemCount && <CartPreview />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
