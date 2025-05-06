export interface AttractionInterface {
  id: number;
  name: string;
  category: string;
  description: string;
  address: string;
  transport: string;
  mrt: string | null;
  latitude: number;
  longitude: number;
  images: string[] | null;
}
