import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Navbar() {
  const cartCount = useSelector((state) => state.cart.cart);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <p className="navbar-brand">Dashboard</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
          <span className="nav-link bi bi-box-arrow-right me-5 fs-2" />
          <Link to="/cart" className="nav-link bi bi-cart me-5 fs-2">
            <span className="cart-count bg-info rounded-5 fs-5 px-2 py-1">{cartCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar