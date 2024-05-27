import React, { useState } from "react";
import '../css/admin.css';
import { useNavigate } from 'react-router-dom';
import s2 from '../Assets/admin-sports.png';
import t1 from '../Assets/admin-transaction.png';
import boy from '../Assets/admin-boy.png';
import girl from '../Assets/admin-girl.png';
import BoyProducts from "./BoyProducts";
import GirlProducts from "./GirlProducts";
import SportsProduct from "./SportsProduct";
import Transaction from './Transactions';
import Swal from 'sweetalert2';

const Admin = () => {
    const navigate = useNavigate();

    const handleSignout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to Logout",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Signout !"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Signed Out Successfully.",
                    icon: "success"
                });
                navigate('/');
            }
        });
    };

    const [activeComponent, setActiveComponent] = useState();

    const renderComponent = () => {
        switch (activeComponent) {
            case "BoysProducts":
                return <BoyProducts />;
            case "GirlProducts":
                return <GirlProducts />;
            case "SportsProduct":
                return <SportsProduct />;
            case "Transactions":
                return <Transaction />;
            default:
                return <BoyProducts />;
        }
    };

    return (
        <div className="admin-dashboard">
            {/* for header part */}
            <header>
                <div className="logosec">
                    <div className="logo">Admin Dashboard</div>
                </div>
                <div className="message">
                    <div className="dp">
                        <img
                            src="https://media.geeksforgeeks.org/wp-content/uploads/20221210180014/profile-removebg-preview.png"
                            className="dpicn"
                            alt="dp"
                            onClick={() => handleSignout()}
                        />
                    </div>
                </div>
            </header>

            <div className="main-container">
                <div className="navcontainer">
                    <nav className="nav">
                        <div className="nav-upper-options">
                            <div
                                className="nav-option option1"
                                onClick={() => setActiveComponent("BoysProducts")}
                            >
                                <img src={boy} className="nav-img" alt="boys wear" />
                                <h3> Boy's Wear</h3>
                            </div>

                            <div
                                className="nav-option option1"
                                onClick={() => setActiveComponent("GirlProducts")}
                            >
                                <img src={girl} className="nav-img" alt="girls wear" />
                                <h3> Girl's Wear </h3>
                            </div>

                            <div
                                className="nav-option option1"
                                onClick={() => setActiveComponent("SportsProduct")}
                            >
                                <img src={s2} className="nav-img" alt="sports wear" />
                                <h3> Sport's Wear </h3>
                            </div>

                            <div
                                className="nav-option option1"
                                onClick={() => setActiveComponent("Transactions")}
                            >
                                <img src={t1} className="nav-img" alt="transactions" />
                                <h3> Transactions </h3>
                            </div>

                            <div
                                className="nav-option option1"
                                onClick={() => handleSignout()}
                            >
                                <img
                                    src="https://media.geeksforgeeks.org/wp-content/uploads/20221210183321/7.png"
                                    className="nav-img"
                                    alt="logout"
                                />
                                <h3>Logout</h3>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="main">
                    {renderComponent()}
                </div>
            </div>
        </div>
    );
};

export default Admin;
