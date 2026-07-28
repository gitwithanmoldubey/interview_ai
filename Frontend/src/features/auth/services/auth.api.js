import api from "../../../services/api";

export async function register({ username, email, password }) {
    try {
        const response = await api.post('/api/auth/register', {
            username, email, password
        });
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || err.message || "Registration failed";
    }
}

export async function login({ email, password }) {
    try {
        const response = await api.post("/api/auth/login", {
            email, password
        });
        return response.data;
    } catch (err) {
        throw err.response?.data?.message || err.message || "Login failed";
    }
}

export async function logout() {
    try {
        const response = await api.get("/api/auth/logout");
        return response.data;
    } catch (err) {
        console.error("Logout error:", err);
    }
}

export async function getMe() {
    try {
        const response = await api.get("/api/auth/get-me");
        return response.data;
    } catch (err) {
        if (err.response?.status === 401) {
            return { user: null };
        }
        console.error("Error fetching current user:", err);
        return { user: null };
    }
}