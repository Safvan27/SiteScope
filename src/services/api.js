import { createClient } from "@supabase/supabase-js";

// For Supabase, we'll use the REST API endpoints directly
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
// Supabase client for direct operations
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

class ApiService {
    constructor() {
        this.token = localStorage.getItem("token");
        this.baseURL = SUPABASE_URL;
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/rest/v1${endpoint}`;
        const config = {
            headers: {
                "Content-Type": "application/json",
                apikey: SUPABASE_ANON_KEY,
                ...options.headers,
            },
            ...options,
        };

        if (this.token) {
            config.headers.Authorization = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(url, config);

            if (!response.ok) {
                const errorText = await response.text();
                let error;
                try {
                    error = JSON.parse(errorText);
                } catch {
                    error = { error: errorText || "Request failed" };
                }
                throw new Error(
                    error.error || error.message || "Request failed"
                );
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error("API request failed:", error);
            throw error;
        }
    }

    // Auth methods using Supabase Auth directly
    async login(credentials) {
        try {
            // Use Supabase auth directly
            const { data: authData, error: authError } =
                await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

            if (authError) {
                console.log("authError", authError);
                throw new Error(authError.message || "Invalid credentials");
            }

            // Get user profile from our users table
            const { data: userData, error: userError } = await supabase
                .from("users")
                .select("*")
                .eq("email", credentials.email)
                .single();

            if (userError || !userData) {
                throw new Error("User profile not found");
            }

            // Store the session token
            this.setToken(authData.session.access_token);

            return {
                token: authData.session.access_token,
                user: {
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                    role: userData.role,
                    status: userData.status,
                },
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    async register(userData) {
        try {
            // Create user in Supabase Auth
            const { data: authData, error: authError } =
                await supabase.auth.signUp({
                    email: userData.email,
                    password: userData.password,
                });

            if (authError) {
                throw new Error(authError.message);
            }

            // Create user profile in our users table
            const { data: profileData, error: profileError } = await supabase
                .from("users")
                .insert([
                    {
                        email: userData.email,
                        name: userData.name,
                        role: userData.role || "client",
                        auth_user_id: authData.user?.id,
                    },
                ])
                .select()
                .single();

            if (profileError) {
                throw new Error("Failed to create user profile");
            }

            return {
                message: "User registered successfully",
                user: {
                    id: profileData.id,
                    email: profileData.email,
                    name: profileData.name,
                    role: profileData.role,
                },
            };
        } catch (error) {
            console.error("Registration error:", error);
            throw error;
        }
    }

    // User methods
    async getUsers() {
        const { data, error } = await supabase.from("users").select("*");

        if (error) throw new Error(error.message);
        return data;
    }

    async getUserProfile() {
        const { data, error } = await supabase.auth.getUser();
        if (error) throw new Error(error.message);

        const { data: profile, error: profileError } = await supabase
            .from("users")
            .select("*")
            .eq("auth_user_id", data.user.id)
            .single();

        if (profileError) throw new Error(profileError.message);
        return profile;
    }

    async updateUser(id, userData) {
        console.log("id", id);
        console.log("userData", userData);
        const { data, error } = await supabase
            .from("users")
            .update(userData)
            .eq("id", id)
            .select()
            .maybeSingle();
        if (error) throw new Error(error.message);
        return data;
    }

    // Project methods
    async getProjects() {
        const { data, error } = await supabase.from("projects").select(`
        *,
        client:client_id(name),
        supervisor:supervisor_id(name)
      `);

        if (error) throw new Error(error.message);
        return data;
    }

    async createProject(projectData) {
        const { data, error } = await supabase
            .from("projects")
            .insert([projectData])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async updateProjectProgress(id, progress) {
        const { data, error } = await supabase
            .from("projects")
            .update({ progress })
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Task methods
    async getProjectTasks(projectId) {
        const { data, error } = await supabase
            .from("tasks")
            .select(
                `
        *,
        assigned_user:assigned_to(name)
      `
            )
            .eq("project_id", projectId);

        if (error) throw new Error(error.message);
        return data;
    }

    async createTask(taskData) {
        const { data, error } = await supabase
            .from("tasks")
            .insert([taskData])
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    async updateTaskStatus(id, status, progress) {
        const { data, error } = await supabase
            .from("tasks")
            .update({ status, progress })
            .eq("id", id)
            .select()
            .single();

        if (error) throw new Error(error.message);
        return data;
    }

    // Photo methods using Supabase Storage
    async uploadPhotos(formData) {
        try {
            const files = formData.getAll("photos");
            const uploadPromises = files.map(async (file, index) => {
                const fileName = `${Date.now()}_${index}_${file.name}`;

                const { data: uploadData, error: uploadError } =
                    await supabase.storage
                        .from("photos")
                        .upload(fileName, file);

                if (uploadError) throw uploadError;

                // Get public URL
                const { data: urlData } = supabase.storage
                    .from("photos")
                    .getPublicUrl(fileName);

                // Save photo record to database
                const photoData = {
                    project_id: formData.get("project_id"),
                    task_id: formData.get("task_id"),
                    uploaded_by: formData.get("uploaded_by"),
                    filename: fileName,
                    original_name: file.name,
                    file_path: urlData.publicUrl,
                    file_size: file.size,
                    category: formData.get("category"),
                    description: formData.get("description"),
                };

                const { data: dbData, error: dbError } = await supabase
                    .from("photos")
                    .insert([photoData])
                    .select()
                    .single();

                if (dbError) throw dbError;
                return dbData;
            });

            const results = await Promise.all(uploadPromises);
            return { photos: results };
        } catch (error) {
            console.error("Upload error:", error);
            throw error;
        }
    }

    async getProjectPhotos(projectId) {
        const { data, error } = await supabase
            .from("photos")
            .select(
                `
        *,
        uploader:uploaded_by(name)
      `
            )
            .eq("project_id", projectId);

        if (error) throw new Error(error.message);
        return data;
    }

    async getPhotos(filters = {}) {
        let query = supabase.from("photos").select(`
        *,
        uploader:uploaded_by(name),
        project:project_id(name)
      `);

        if (filters.project_id) {
            query = query.eq("project_id", filters.project_id);
        }
        if (filters.category) {
            query = query.eq("category", filters.category);
        }

        const { data, error } = await query;
        if (error) throw new Error(error.message);
        return data;
    }

    async deletePhoto(id) {
        // First get the photo to get file path
        const { data: photo, error: fetchError } = await supabase
            .from("photos")
            .select("filename")
            .eq("id", id)
            .single();

        if (fetchError) throw new Error(fetchError.message);

        // Delete from storage
        const { error: storageError } = await supabase.storage
            .from("photos")
            .remove([photo.filename]);

        if (storageError) throw new Error(storageError.message);

        // Delete from database
        const { error: dbError } = await supabase
            .from("photos")
            .delete()
            .eq("id", id);

        if (dbError) throw new Error(dbError.message);
        return { message: "Photo deleted successfully" };
    }

    // Real-time subscriptions
    async subscribeToPhotos(projectId, callback) {
        return supabase
            .channel("photos")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "photos",
                    filter: `project_id=eq.${projectId}`,
                },
                callback
            )
            .subscribe();
    }

    async subscribeToTasks(projectId, callback) {
        return supabase
            .channel("tasks")
            .on(
                "postgres_changes",
                {
                    event: "*",
                    schema: "public",
                    table: "tasks",
                    filter: `project_id=eq.${projectId}`,
                },
                callback
            )
            .subscribe();
    }
}

export default new ApiService();
