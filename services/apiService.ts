// This is a placeholder for the backend URL.
// In a real deployment, this would be set via environment variables.
const API_BASE_URL = 'http://localhost:5000'; 

interface ApiOptions extends RequestInit {
    headers: {
        'Content-Type': 'application/json',
        [key: string]: string;
    }
}

/**
 * A centralized utility for making API calls to the backend.
 * @param endpoint The API endpoint to call (e.g., '/api/stats').
 * @param method The HTTP method ('GET', 'POST', etc.).
 * @param body Optional request body for 'POST', 'PUT' methods.
 * @returns {Promise<T>} A promise that resolves with the JSON response.
 */
export const fetchApi = async <T>(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: unknown): Promise<T> => {
    const options: ApiOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body && (method === 'POST' || method === 'PUT')) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
        // Attempt to parse error response from the backend
        const errorData = await response.json().catch(() => ({ message: 'An unknown API error occurred.' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // For 204 No Content, we might not have a body
    if (response.status === 204) {
        return null as T;
    }

    return response.json() as Promise<T>;
};