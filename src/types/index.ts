export interface StationInput {
    _id?: string;
    name: string;
    title: string;
    location: string;
    images: string[];
    pricing: number;
    description: string;
    shortDescription: string;
    powerOutput: number;
    connectorType: string;
    accessType: 'Public' | 'Private';
    amenities: string[];
    status: 'active' | 'inactive';
    createdAt?: string;
}