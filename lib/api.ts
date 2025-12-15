import { ApiResponse } from '@/types/property';

//API Calling 
const API = "https://agents.propertygenie.com.my/.netlify/functions/properties-mock";

//Fetching API
export async function fetchProperties(page: number = 1): Promise<ApiResponse> {
    try {
        const res = await fetch(`${API}?page=${page}`, {
            method: 'POST'
        });
        if (!res.ok) {
            throw new Error(`Failed to fetch properties: ${res.status}`);
        }
        return await res.json();
    } catch (error) {
        console.error("API Fetch Error:", error);
        // Fallback
        return { items: [] };
    }
}
