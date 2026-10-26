import { DatabaseSync } from 'node:sqlite'

const events_db = new DatabaseSync('events/events.db')

function getEventList() {
    ret_str = '';

    const event_query = events_db.prepare('SELECT event from events');
    const events = event_query.all();
}
