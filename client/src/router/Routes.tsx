import { createBrowserRouter } from "react-router";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import App from "../components/App";
import CatalogPage from "../pages/catalog/CatalogPage";
import ProductDetails from "../pages/catalog/ProductDetails";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage"; 
import ConfirmEmailPage from "../pages/ConfirmEmailPage"; 
import DashboardPage from "../pages/DashboardPage";
import ProtectedRoute from "../components/ProtectedRoute";
import AllOrderPage from "../pages/AllOrdersPage";
import BlogPage from "../pages/BlogList";
import BlogFoam from "../pages/BlogFoam";
import BlogCopper from "../pages/BlogCopper";
import ExploreCezves from "../pages/ExploreCezves";
import DiscoverCoffee from "../pages/DiscoverCoffee";
import UserOrdersPage from "../pages/UserOrdersPage"

export const router = createBrowserRouter([

    {
        path: "/",
        element: <App />,
        children: [
            { path: "home", element: <HomePage /> },
            { path: "/aboutdoa's cezve", element: <AboutPage /> },
            { path: "/blog", element: <BlogPage /> },
            { path: "/shop", element: <CatalogPage /> },
            { path: "/catalog/:id", element: <ProductDetails /> },
            { path: "/login", element: <LoginPage /> },
            { path: "/register", element: <RegisterPage /> },
            { path: "/confirm-email", element: <ConfirmEmailPage /> },
            { path: "/blog/foam", element: <BlogFoam /> },  
            { path: "/blog/copper", element: <BlogCopper /> },
            { path: "/explore-cezves", element: <ExploreCezves /> },
            { path: "discover-coffee", element: <DiscoverCoffee /> },
            { path: "/orders", element: <UserOrdersPage />},
            {
                path: "/dashboard",
                element: (
                    <ProtectedRoute requireVerifiedEmail>
                        <DashboardPage />
                    </ProtectedRoute>)
            }, 

            {
                path: "/checkout", element: (
                    <ProtectedRoute requireVerifiedEmail>
                        <AllOrderPage/>
                    </ProtectedRoute>)
            }

        ]
    }
]);
