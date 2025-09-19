import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import App from "../components/App";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetails from "../pages/catalog/ProductDetails";
import AuthPage from "../pages/AuthPage";
import RegisterPage from "../pages/RegisterPage";  
export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "/about", element: <AboutPage /> },
            { path: "/contact", element: <ContactPage /> },
            { path: "/catalog", element: <CatalogPage /> },
            { path: "/catalog/:id", element: <ProductDetails /> },
            { path: "/auth", element: <AuthPage /> },
            { path:"/register", element: <RegisterPage/>    }
        ]
    }
]);
