import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import { Provider, useSelector } from "react-redux"
import { store } from "./store/store"
import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import { isError, isLoading } from "./services/uiSlice"
import LoadingSpinner from "./components/UI/LoadingSpinner"
import ErrorOverlay from "./components/UI/ErrorOverlay"

const AppWrapper = () => {
  const loading = useSelector(isLoading)
  const error = useSelector(isError)
  return (
    <>
      {loading && <LoadingSpinner />}
      {error && <ErrorOverlay errorMessage={error} />}
      <RouterProvider router={router} />
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppWrapper />
    </Provider>
  </React.StrictMode>
)
