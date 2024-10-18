import HomePage from "./components/HomePage";
import Login from "./loginPage/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
axios.defaults.withCredentials = true;
import axios from "axios";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home", 
      element: <HomePage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
