import { ApiResponse } from '@/types/property';

//API Calling 
const API = "https://agents.propertygenie.com.my/.netlify/functions/properties-mock";

//Fetching API to get the properties data
export async function fetchProperties(page: number = 1): Promise<ApiResponse> {
    try {
        //Fetching API to get the properties page data
        const res = await fetch(`${API}?page=${page}`, {
            method: 'POST'
        });
        //Checking if the API is accessible
        if (!res.ok) {
            throw new Error(`Failed to fetch properties: ${res.status}`);
        }
        //Returning the properties data
        return await res.json();
        //catch the error response    
    } catch (error) {
        console.error("API Fetch Error:", error);
        // Fallback
        return { items: [] };
    }
}
