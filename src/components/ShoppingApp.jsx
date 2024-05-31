import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ShopContextProvider from "../Context/ShopContext";
import Admin from "./Admin/Admin";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import ShopCategory from "./ShopCategory";
import ShoppingCart from "./ShoppingCart";
import SportsTshirts from "./SportsTshirts";
import UserLogin from "./UserLogin";


function AppRoutes() {
    const location = useLocation();
    const noHeaderRoutes = ['/admin', '/'];
     

    const showHeader = !noHeaderRoutes.includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <Routes>
            <Route path="/" element={<UserLogin />} />

                <Route path="/home" element={<Home />} />
                <Route path="/boys" element={<ShopCategory category="boys" />} />
                <Route path="/girls" element={<ShopCategory category="girls" />} />
                <Route path="/sports" element={<ShopCategory category="sports" />} />
                <Route path="/sports/t-shirts" element={<SportsTshirts />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </>
    );
}

export default function ShoppingApp() {
    return (
        <div className="ShoppingApp">
            <ShopContextProvider>
                <BrowserRouter>
                    <AppRoutes />
                </BrowserRouter>
            </ShopContextProvider>
        </div>
    );
}