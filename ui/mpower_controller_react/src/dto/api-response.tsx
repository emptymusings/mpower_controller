export interface ApiResponse {
    results: string;
    data: any;
}

export function convertApiResponse<T>(apiResponse: ApiResponse): T | undefined {
    if (apiResponse.results === 'success') {
        const result = apiResponse.data as T;
        return result;
    } else {
        return undefined;
    }
}
