import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import App from "../components/App";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetails from "../pages/catalog/ProductDetails";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import ConfirmEmailPage from "../pages/ConfirmEmailPage"; 
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AllOrderPage from "../pages/AllOrdersPage";


export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            { path: "home", element: <HomePage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/shop", element: <CatalogPage /> },
            { path: "/catalog/:id", element: <ProductDetails /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/confirm-email", element: <ConfirmEmailPage /> },
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute requireVerifiedEmail>
                        <DashboardPage />
                    </ProtectedRoute>)
            }, 

            {
                path: "/orders", element: (
                    <ProtectedRoute requireVerifiedEmail>
                        <AllOrderPage/>
                    </ProtectedRoute>)
            }

        ]
    }
]);
