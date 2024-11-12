import axios from "axios";
import { useNavigate } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    console.log({ email, password });

    try {
      const response = await axios.post("http://localhost:5000/auth/login", { email, password });
      console.log(response.data);

      // Navigate to the main page if the user is authenticated
      if (response.data) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle login error here, like showing a message to the user
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
          >
            Sign In
          </button>
        </form>
       
        <GoogleAuth/>

        <p className="text-center text-sm text-gray-500">
          Not a member?{" "}
          <a href="#" onClick={()=>{navigate("/register")}} className="text-indigo-600 hover:text-indigo-500">
            Register here
          </a>
        </p>
      </div>

    </div>
  );
}
