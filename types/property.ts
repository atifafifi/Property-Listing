export interface LocationData {
  longitude: number;
  latitude: number;
}

export interface AgentAccount {
  id: string;
  name: string;
  email: string;
  phone: string;
  slug: string;
}

export interface Property {
  id: string;
  name: string;
  slug: string;
  type: string;
  category: string;
  section: string;
  image: string;
  bedRooms: number;
  bathRooms: number;
  floorSize: string | number;
  landSize: string | number | null;
  address: string;
  price: number;
  account: AgentAccount;
  country: string;
  state: string;
  city: string;
  postcode: string;
  furnishings: string;
  coordinates: LocationData;
  createdAt: string;
}

export interface ApiResponse {
  items: Property[];
}
