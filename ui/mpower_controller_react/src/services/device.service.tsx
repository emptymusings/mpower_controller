    import { 
    ApiResponse,
    convertApiResponse
} from '../dto/api-response';
import { Device } from '../dto/device';

const api_path = process.env.REACT_APP_API ?? '';

export async function getDeviceList(): Promise<Device[] | Error> {
    try {
        const result = await fetch(api_path)
            .then((response) => {                
                if (!response.ok) {
                    return new Error('Unable to load device list');
                } 
                
                return response.json();
            })
            .then((result) => {
                const apiResponse = result as unknown as ApiResponse;
                const deviceList = convertApiResponse<Device[]>(apiResponse);
                return deviceList as Device[];
            });

        return result;
    } catch (error) {
        console.error(error) ;       
    }

    return Error('Error loading device list');
}

export async function getDeviceDetails(host: string): Promise<Device | Error> {
    try {
        const result = await fetch(`${api_path}${host}`)
            .then((response) => {
                if (!response.ok) {
                    return new Error(`Error to load device: ${host}`);
                }

                return response.json();
            })
            .then((data) => {
                const apiResponse = data as unknown as ApiResponse;
                const device = convertApiResponse<Device>(apiResponse);
                return device as Device;
            });

            return result;
    } catch (error) {
        console.error(error);
    }

    return new Error(`Error to load device: ${host}`);
}
