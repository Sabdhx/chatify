import HomePage from "./components/HomePage";
// import Login from "./loginPage/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

axios.defaults.withCredentials = true;
import axios from "axios";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Context from "./context/Context";
import FirstPage from "./components/firstPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <FirstPage />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/home", 
      element: <HomePage />,
    },
    {
      path: "/Register", 
      element: <Register />,
    },
    
  ]);

  return (
    <>
    <Context>

    <RouterProvider router={router} />

    </Context>
    </>
  );
}

export default App;
