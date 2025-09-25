// src/utils/fetchWrapper.ts

export interface ApiResponse<T = unknown> {
    success: boolean;
    message?: string;
    data?: T;
}

export async function fetchJson<T = unknown>(
    url: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(url, {
            headers: { 'Content-Type': 'application/json', ...options.headers },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return (await response.json()) as ApiResponse<T>;
    } catch (error: unknown) {
        console.error('API Error:', error);
        return { success: false, message: 'Server connection failed.' };
    }
}
