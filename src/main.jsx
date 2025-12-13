import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./DashboardLayout/Dashboard.jsx";

import DashboardHome from "./DashboardLayout/DashboardHome.jsx";
import AddContest from "./pages/CreatorPage/AddContest.jsx";
import ApproveContest from "./pages/AdminPage/ApproveContest.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageUser from "./pages/AdminPage/ManageUsers.jsx";
import MyContests from "./pages/CreatorPage/MyContests.jsx";
import ContestDetails from "./pages/Contest/ContestDetails.jsx";
import Payment from "./pages/Payments/Payment.jsx";
import PaymentSuccess from "./pages/Payments/PaymentSuccess.jsx";
import PaymentCancelled from "./pages/Payments/PaymentCancelled.jsx";
import MyParticipation from "./pages/UserPage/MyParticipation.jsx";
import AllContest from "./pages/Home/AllContest.jsx";
import MyProfile from "./pages/UserPage/MyProfile.jsx";
import SeeSubmissions from "./pages/CreatorPage/SeeSubmissions.jsx";
import DeclareWinner from "./pages/CreatorPage/DeclareWinner.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        element: <Navigate to={"/home"}></Navigate>,
      },
      {
        path: "/home",
        Component: Home,
      },
      {
        path: "/all-contest",
        Component: AllContest,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/contest-details/:id",
        Component: ContestDetails,
      },
      {
        path: "/payment/:id",
        Component: Payment,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: Dashboard,
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      //User Route
      {
        path: "my-participation",
        Component: MyParticipation,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      //Creator Route
      {
        path: "add-contest",
        Component: AddContest,
      },
      {
        path: "my-contests",
        Component: MyContests,
      },
      {
        path: "see-submissions/:id",
        Component: SeeSubmissions,
      },
      {
        path: "declare-winner",
        Component: DeclareWinner,
      },

      //admin Route
      {
        path: "approve-contest",
        Component: ApproveContest,
      },
      {
        path: "manage-users",
        Component: ManageUser,
      },
      //payment route
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancelled,
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
