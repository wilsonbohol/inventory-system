import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Register from "../pages/Register";
import UserPanel from "../pages/UserPanel";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import Dashboard from "../pages/Dashboard";
import Inventory from "../pages/Inventory";
import AllProduct from "../pages/AllProduct";
import Audit from "../pages/Audit";

const router = createBrowserRouter([
    {
        path: "/",
        element:  <App></App>,
        children: [
            {
                path: "",
                element: <Home></Home>
            },
            {
                path: "login",
                element: <Login></Login>
            },
            {
                path: "forgot-password",
                element: <ForgotPassword></ForgotPassword>
            },
            {
                path: "register",
                element: <Register></Register>
            },
            {
                path: "user-panel",
                element: <UserPanel></UserPanel>
            },
            {
                path: "admin-panel",
                element: <AdminPanel></AdminPanel>,
                children: [
                    {
                        path: "all-users",
                        element: <AllUsers></AllUsers>
                    },
                    {
                        path: "dashboard",
                        element: <Dashboard></Dashboard>
                    },
                    {
                        path: "inventory",
                        element: <Inventory></Inventory>
                    },
                    {
                        path: "category/:slug",
                        element: <AllProduct></AllProduct>
                    },
                    {
                        path: "audit",
                        element: <Audit></Audit>
                    }

                    
                    
                ]
            }
        ]
    },
])


export default router