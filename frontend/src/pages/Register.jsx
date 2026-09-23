import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        organizationName: "",
        organizationType: "POLICE"
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

            const response = await api.post(
                "/auth/register",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            navigate("/dashboard");

        } catch(error) {
            setError(
                error.response?.data?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 rounded-xl shadow"
            >
                <h1 className="text-2xl font-bold mb-2">
                    Secure Legal DMS
                </h1>

                <p className="text-gray-500 mb-6">
                    Create your organization account
                </p>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                <input 
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

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
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <input 
                    type="text" 
                    name="organizationName"
                    placeholder="Organization Name"
                    value={formData.organizationName}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-4"
                    required
                />

                <select 
                    name="organizationType"
                    value={formData.organizationType}
                    onChange={handleChange}
                    className="w-full border p-3 rounded mb-6"
                >
                    <option value="POLICE">
                        Police Department
                    </option>

                    <option value="LAW_FIRM">
                        Law Firm
                    </option>

                    <option value="COURT">
                        Court
                    </option>
                    <option value="INVESTIGATION_AGENCY">
                        Investigation Agency
                    </option>
                </select>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-black text-white p-3 rounded hover:bg-gray-800"
                >
                    {loading
                        ? "Creating Account..."
                        : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-500 mt-5">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="text-black font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>

            </form>
        </div>
    );
}

export default Register;