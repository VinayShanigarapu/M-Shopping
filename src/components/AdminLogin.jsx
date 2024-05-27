import React, { useEffect, useState } from 'react';
import './css/AdminLogin.css';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toast, setToast] = useState({ message: '', type: '', show: false });
    const navigate = useNavigate()
    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => {
                setToast(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'admin@gmail.com' && password === 'admin@123') {
            setToast({ message: 'Login successful!!!', type: 'success', show: true });
            navigate('/admin')
        } else if (!email || !password) {
            setToast({ message: 'All fields are mandatory.', type: 'warning', show: true });
        } else {
            setToast({ message: 'Invalid email or password.', type: 'danger', show: true });
        }
    };

    return (
        <div className="adminlogin">
            {toast.show && <Toast message={toast.message} toastType={toast.type} />}
            <div className="login-container">
                <h1>Login</h1>
                <form className="login-fields" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Continue</button>
                </form>
            </div>
        </div>
    );
}
