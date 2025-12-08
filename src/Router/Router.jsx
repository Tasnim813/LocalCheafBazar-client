import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/Home/Home";
import SignIn from "../Page/SignIN/SignIn";
import SignUp from "../Page/SignUp/SignUp";

export const router=createBrowserRouter([
    {
        path:'/',
        element:<MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<SignIn></SignIn>
            },
            {
                path:"/register",
                element:<SignUp></SignUp>
            }
        ]
    }
])