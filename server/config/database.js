const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error("Missing Supabase environment variables");
}

// Create Supabase client with service role key for server-side operations
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});

// Test the connection
const testConnection = async () => {
    try {
        const { data, error } = await supabase
            .from("users")
            .select("count")
            .limit(1);

        if (error && error.code !== "PGRST116") {
            // PGRST116 is "relation does not exist"
            console.error("Supabase connection error:", error);
        } else {
            console.log("Connected to Supabase database");
        }
    } catch (err) {
        console.error("Supabase connection test failed:", err);
    }
};

testConnection();

module.exports = supabase;
