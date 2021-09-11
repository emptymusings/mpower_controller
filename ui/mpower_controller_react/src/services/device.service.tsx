    import { 
    ApiResponse,
    convertApiResponse
} from '../dto/api-response';
import { Device } from '../dto/device';
import { Relay } from '../dto/relay';

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
        const result = await fetch(`${api_path}/${host}`)
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

export async function setRelayState(host: string, port: number, new_state: number): Promise<Relay | Error> {
    try {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaiton/json'
            }
        }

        const result = await fetch(`${api_path}/commands/${host}/${port}/${new_state}`, options)
            .then((response) => {
                if (!response.ok) {
                    return new Error('Failed to change Relay: Invalid response from server');
                }
                
                return response.json();
            })
            .then((data) => {
                const response = data as unknown as ApiResponse;
                
                if (response.results !== 'success') {
                    return undefined;
                }

                const device = convertApiResponse<Device>(response);
                
                if (device?.relays === undefined) {
                    return undefined;
                }

                const relay = device.relays.find(relay => relay.port === port);

                return relay;
            });
        
            return result as Relay;
    } catch (error) {
        console.error(error);
    }

    return new Error('Error changing relay');
}

export function getRelayDetails(host: string, port: number): Promise<Relay | undefined> {
    return getDeviceDetails(host)
        .then((result) => {
            const d = result as Device;
            if (d.relays){
                return d.relays.find(r => r.port === port);
            };

            return undefined;
        });
}
