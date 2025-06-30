const express = require("express");
const jwt = require("jsonwebtoken");
const supabase = require("../config/database");

const router = express.Router();

// Login route
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Authenticate with Supabase Auth
        const { data: authData, error: authError } =
            await supabase.auth.signInWithPassword({
                email,
                password,
            });

        if (authError) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Get user profile from our users table
        const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .single();

        if (userError || !userData) {
            return res.status(404).json({ error: "User profile not found" });
        }
        const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;
        // Generate JWT token
        const token = jwt.sign(
            {
                userId: userData.id,
                email: userData.email,
                role: userData.role,
            },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({
            token,
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                status: userData.status,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Register route
router.post("/register", async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Create user in Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp(
            {
                email,
                password,
            }
        );

        if (authError) {
            return res.status(400).json({ error: authError.message });
        }

        // Create user profile in our users table
        const { data: userData, error: userError } = await supabase
            .from("users")
            .insert([
                {
                    email,
                    name,
                    role: role || "client",
                    auth_user_id: authData.user?.id,
                },
            ])
            .select()
            .single();

        if (userError) {
            return res
                .status(400)
                .json({ error: "Failed to create user profile" });
        }

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
            },
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

// Verify token route
router.get("/verify", async (req, res) => {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "");
        const JWT_SECRET = import.meta.env.VITE_JWT_SECRET;

        if (!token) {
            return res.status(401).json({ error: "No token provided" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        // Get current user data
        const { data: userData, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", decoded.userId)
            .single();

        if (error || !userData) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            user: {
                id: userData.id,
                email: userData.email,
                name: userData.name,
                role: userData.role,
                status: userData.status,
            },
        });
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
});

module.exports = router;
