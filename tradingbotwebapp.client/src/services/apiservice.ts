import { REACT_APP_API_KEY, REACT_APP_API_URL } from '../../config.js';

// Define a custom error type
interface FetchError extends Error {
    status?: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errorData?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchSymbolValue = async (symbol: string | undefined): Promise<{ data: any; error: FetchError | null }> => {
    try {
        const response = await fetch(`${REACT_APP_API_URL}/get-latest-price-by-symbol?symbol=${symbol}`, {
            headers: {
                'X-Api-Key': REACT_APP_API_KEY
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            const error: FetchError = new Error(`Failed to fetch symbol value. Response Status-${response.status}, and Response Text-${response.statusText}. Error: ${JSON.stringify(errorData)}`);
            error.status = response.status;
            error.errorData = errorData;
            throw error;
        }

        const data = await response.json();
        return { data, error: null };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { data: null, error };
    }
};