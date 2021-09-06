import { Relay } from "./relay";

export interface Device {
    name: string;
    host: string;
    relays: Relay[];    
}