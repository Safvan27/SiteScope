import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { USER_ROLES } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import "./Login.css";

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();

    // Function to detect role from email
    const detectRoleFromEmail = (email) => {
        const emailLower = email.toLowerCase();

        // Admin detection - emails starting with 'admin'
        if (emailLower.startsWith("admin@")) {
            return USER_ROLES.ADMIN;
        }

        // Supervisor detection - emails starting with 'supervisor' or 'super'
        if (
            emailLower.startsWith("supervisor@") ||
            emailLower.startsWith("super@")
        ) {
            return USER_ROLES.SUPERVISOR;
        }

        // Client detection - default for all other emails
        return USER_ROLES.CLIENT;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(credentials);
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="login-container min-h-screen flex items-center justify-center bg-gradient-to-br from-[#ffe8b8] via-[#ffd78f] to-[#ffaf40] px-4">
            <div className="w-full max-w-4xl flex rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-white/70">
                {/* Left Side - Logo / Branding */}
                <div className="w-1/2 bg-white/30 flex items-center justify-center p-8">
                    <img
                        src={"/images/Logo_transparent.png"}
                        alt="SiteScope Logo"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="w-1/2 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-center">
                        SiteScope Login
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-medium"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <div className="mt-6 text-sm bg-white/60 p-4 rounded-md">
                        <h4 className="font-semibold mb-2">
                            Demo Credentials:
                        </h4>
                        <p>
                            <strong>Admin:</strong> admin@construction.com /
                            admin123
                        </p>
                        <p>
                            <strong>Supervisor:</strong>{" "}
                            supervisor@construction.com / super123
                        </p>
                        <p>
                            <strong>Client:</strong> client@construction.com /
                            client123
                        </p>
                        <p className="italic mt-2">
                            Role is automatically detected from email prefix
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
