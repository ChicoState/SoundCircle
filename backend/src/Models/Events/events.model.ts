import db from '../../db/db';
import { Event } from '../../../Types/events';
import { EventCreation } from 'Controllers/Events/EventsController';

export const createEvent = async (eventObj: EventCreation) => {
    try {
      // Create and insert the new event into the 'events' table of our database
      const [newEvent] = await db<Event>('events')
        .insert({
            event_name: eventObj.event_name,
            event_date: eventObj.event_date,
            start_time: eventObj.start_time,
            end_time: eventObj.end_time,
            location: eventObj.location,
            latitude: eventObj.latitude,
            longitude: eventObj.longitude,
            location_name: eventObj.location_name,
            bands: eventObj.bands,
            description: eventObj.description,
            genres: eventObj.genres,
            ticket_price: eventObj.ticket_price,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .returning([
          'id', 'event_name', 'event_date', 'start_time', 'end_time', 
          'location', 'latitude', 'longitude', 'location_name', 
          'bands', 'description', 'genres', 'ticket_price', 'created_at',
          'updated_at'
        ]);
  
      if (!newEvent) {
        throw new Error('No event was created.');
      }
  
      console.log('New event created successfully');
      return newEvent;
    } catch (error) {
      console.error('Error creating event:', error);
      throw new Error('Failed to create event.');
    }
  }