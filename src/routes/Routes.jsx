import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import PlantDetails from '../pages/MealDetails/MealDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import AddPlant from '../pages/Dashboard/Seller/AddPlant'
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers'
import Profile from '../pages/Dashboard/Common/Profile'
import Statistics from '../pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'
import MyInventory from '../pages/Dashboard/Seller/MyMealsPage'
import ManageOrders from '../pages/Dashboard/Seller/OrderRequests'
import MyOrders from '../pages/Dashboard/Customer/MyOrders'
import { createBrowserRouter } from 'react-router'
import MealDetails from '../pages/MealDetails/MealDetails'
import Meals from '../pages/Meals/Meals'
import Payment from '../components/Dashboard/Payment/Payment'
import MyFavorite from '../pages/Dashboard/Customer/MyFavorite'
import MyReview from '../pages/Dashboard/Customer/MyReview'
import OrderRequests from '../pages/Dashboard/Seller/OrderRequests'
import ManageRequests from '../pages/Dashboard/Admin/ManageUsers'
import MyMealsPage from '../pages/Dashboard/Seller/MyMealsPage'
import ManageRequest from '../pages/Dashboard/Admin/AdminManageRequests'
import AdminManageRequests from '../pages/Dashboard/Admin/AdminManageRequests'
import UpdateMeal from '../pages/Dashboard/Seller/UpdateMeal'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: async () => fetch(`http://localhost:3000/meal`)
      },
      {
        path: "/meals",
        element: <Meals></Meals>
      },
      {
        path: '/meal-details/:id',
        element: <MealDetails></MealDetails>,
      },
      {
        path: '/payment-success',
        element: <Payment></Payment>
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
      {
        path: 'create-meal',
        element: (
          <PrivateRoute>
            <AddPlant />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-meals',
        element: (
          <PrivateRoute>
            <MyMealsPage></MyMealsPage>
          </PrivateRoute>
        ),
      },
      {
        path: 'update-meal/:id',   // add :id
        element: (
          <PrivateRoute>
            <UpdateMeal />
          </PrivateRoute>
        )
      },
      {
        path: 'manage-users',
        element: (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        ),
      },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: 'my-orders',
        element: (
          <PrivateRoute>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "favorite-meal",
        element: <PrivateRoute><MyFavorite></MyFavorite></PrivateRoute>

      },
      {
        path: "my-review",
        element: <MyReview></MyReview>
      },
      {
        path: 'manage-orders',
        element: <OrderRequests></OrderRequests>,
      },
      {
        path: 'manage-request',
        element: <AdminManageRequests></AdminManageRequests>
      }
    ],
  },
])
