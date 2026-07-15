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

export interface UserInput {
  _id: string;
  name: string;
  email: string;
  image?: string;
  role: "admin" | "driver" | "user" | string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}