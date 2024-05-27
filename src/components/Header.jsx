import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "./Assets/logo.png";
import cart_icon from "./Assets/cart_icon.png";
import "./css/Header.css";
import { ShopContext } from "../Context/ShopContext";

export default function Header() {
    const { getTotalCartItems } = useContext(ShopContext);
    const location = useLocation();
    const [menu, setMenu] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        const path = location.pathname;
        if (path === "/boys") setMenu("boys");
        else if (path === "/girls") setMenu("girls");
        else if (path === "/sports") setMenu("sports");
        else if (path === "/") setMenu("home");
        else setMenu("");
    }, [location]);

    const handleClick = () => {
        navigate('/cart');
        setTimeout(() => {
          window.location.reload();
        }, 1);
    };

    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
            </div>
            <ul className="nav-menu">
                <li onClick={() => { setMenu("home") }}> 
                    <Link to="/">Home</Link>
                    {menu === "home" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("boys") }}> 
                    <Link to="/boys">Boys</Link>
                    {menu === "boys" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("girls") }}>
                    <Link to="/girls">Girls</Link>
                    {menu === "girls" ? <hr /> : null}
                </li>
                <li onClick={() => { setMenu("sports") }}>
                    <Link to="/sports">Sports</Link> 
                    {menu === "sports" ? <hr /> : null}
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/admin/login" onClick={() => { setMenu("") }}>
                    <button>Admin</button>
                </Link>
                <Link to="/cart" onClick={() => { setMenu(""); handleClick()}}>
                    <img src={cart_icon} alt="" />
                </Link>
                <div className="nav-cart-count">{getTotalCartItems()}</div>
            </div>
        </div>
    );
}
