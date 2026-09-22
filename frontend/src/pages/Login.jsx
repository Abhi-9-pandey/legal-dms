import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
   });

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(false);

   const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
   };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        setLoading(true);
        setError("");

        const response = await api.post("/auth/login", formData);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        navigate("/dashboard");
    } catch (error) {
        setError(
            error.response?.data?.message || "Login failed"
        );
    } finally {
        setLoading(false);
    }
   };

   return (
    <div className="min-h-screen flex items-center justify-center bg-grey-100">

        <form 
            onSubmit={handleSubmit}
            className="w-full max-w-md bg-white p-8 rounded-xl shadow"
        >
            <h1 className="text-2xl font-bold mb-6">
                Secure Legal DMS
            </h1>

            <h2 className="text-xl mb-6">
                Login
            </h2>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                    {error}
                </div>
            )}

            <input 
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border p-3 rounded mb-4"
                required
            />

            <input 
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-3 rounded mb-6"
                required
            />

            <button 
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white p-3 rounded"
            >
                {loading? "Loggin in...": "Login"}
            </button>


        </form>
    </div>
   );
}

export default Login;












