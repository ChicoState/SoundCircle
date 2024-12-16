import { Controller, Post, Body, Route } from 'tsoa';
import { createEvent } from '../../Models/Events/events.model';
import { Event } from '../../../Types/events';

export interface EventCreation {
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
}

@Route('events')
export class EventController extends Controller {
    @Post('/newEvent')
    public async postEvent(
        @Body() eventBody: EventCreation
    ): Promise<Event> {
        try {
            const eventObj = eventBody;

            if (!eventObj) {
                this.setStatus(500);
                throw new Error('Empty event passed');
            }

            const newEvent = await createEvent(eventObj);

            this.setStatus(201);

            return newEvent;
        } catch(error) {
            console.error('Error in postEvent: ', error);
            this.setStatus(500);
            throw new Error('Failed to create new event');
        }
    }
}