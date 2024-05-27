import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ShopContextProvider from "../Context/ShopContext";
import AdminLogin from "./AdminLogin";
import Header from "./Header";
import Home from "./Home";
import Product from "./Product";
import ShopCategory from "./ShopCategory";
import ShoppingCart from "./ShoppingCart";
import SportsTshirts from "./SportsTshirts";
import Admin from "./Admin/Admin";

function AppRoutes() {
    const location = useLocation();
    const noHeaderRoutes = ['/admin'];

    const showHeader = !noHeaderRoutes.includes(location.pathname);

    return (
        <>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/boys" element={<ShopCategory category="boys" />}></Route>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/girls" element={<ShopCategory category="girls" />}></Route>
                <Route path="/sports" element={<ShopCategory category="sports" />}></Route>
                <Route path="/sports/t-shirts" element={<SportsTshirts />}></Route>
                <Route path="/product" element={<Product />}>
                    <Route path=":productId" element={<Product />} />
                </Route>
                <Route path="/cart" element={<ShoppingCart />}></Route>
                <Route path="/admin/login" element={<AdminLogin />}></Route>
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
    )
}
