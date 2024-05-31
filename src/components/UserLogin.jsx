import React, { useEffect, useState, lazy, Suspense } from 'react';
import Swal from 'sweetalert2';
import './css/AdminLogin.css';
import logo from "./Assets/logo.png";
import { useNavigate } from 'react-router-dom';


const Index = lazy(() => import('./Index'));

export default function UserLogin() {
    const [menu, setMenu] = useState(""); // 'admin' or 'sales'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showIndex, setShowIndex] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (menu) {
            setEmail('');
            setPassword('');
            setShowIndex(false);
        }
    }, [menu]);

    const handleLogin = () => {
        if (menu === 'sales' && email === 'salesuser@gmail.com' && password === 'sales$123') {
            return { sales: true, username: 'salesuser', pwd: 'sales$123' };
        } else if (menu === 'admin' && email === 'adminuser@gmail.com' && password === 'admin$123') {
            return { sales: false, username: 'adminuser', pwd: 'admin$123' };
        } else {
            return null;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = handleLogin();
        if (user) {
           // Cookies.set('authToken', JSON.stringify(user), { expires: 1 });
           // console.log( Cookies.get('authToken'));
            Swal.fire({
                title: 'Success!',
                text: 'Login successful!!!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate(menu === 'sales' ? '/home' : '/admin');
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Invalid email or password.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleLogoClick = () => {
        setMenu("");
        setShowIndex(true);
        navigate('/');
    };

    return (
        <>
            <div className="navbar">
                <div className="nav-logo" onClick={handleLogoClick}>
                    <img src={logo} alt="logo" />
                </div>
                <div className="nav-login-cart">
                    <button onClick={() => setMenu('admin')}>Admin</button>
                    <button onClick={() => setMenu('sales')}>Sales</button>
                </div>
            </div>

            {showIndex ? (
                <Suspense fallback={<div>Loading...</div>}>
                    <Index />
                </Suspense>
            ) : (
                <div className="adminlogin">
                    <div className="login-container">
                        <h1>{menu === 'sales' ? 'Sales Login' : 'Admin Login'}</h1>
                        <form className="login-fields" autoComplete="off" onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={email}
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                autoComplete="off"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit">Continue</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
