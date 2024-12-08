export interface Event {
  id: number;
  event_name: string;
  event_date: Date;
  start_time: string;
  end_time: string;
  location: string;
  latitude: number;
  longitude: number;
  location_name: string;
  bands: string[];
  description: string;
  genres: string[];
  ticket_price: number;
  created_at: Date;
  updated_at: Date;
}