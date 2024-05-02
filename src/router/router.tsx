import { Navigate, createBrowserRouter, useNavigate } from "react-router-dom"
import React, { ReactNode } from "react"
import Home from "../views/Home"
import Auth from "../views/Auth"
import { useSelector } from "react-redux"
import { getToken } from "../services/authSlice"
import NotFound from "../views/NotFound"
import Task from "../views/Task"

/**
 * A wrapper component that checks if a user is authenticated.
 * If not authenticated, redirects to the authentication page.
 * Otherwise, it renders the child components passed to it.
 */
const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const token = useSelector(getToken)
  // Redirect to login page if no token is present
  if (!token) return <Navigate to="/auth" replace />
  return <>{children}</>
}

/**
 * Router configuration for the application using createBrowserRouter.
 * Defines routes for the application and integrates private route handling.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/tasks/:taskID",
    element: (
      <PrivateRoute>
        <Task />
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: (
      <PrivateRoute>
        <NotFound />
      </PrivateRoute>
    ),
  },
])

export default router
