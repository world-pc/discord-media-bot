import { DatabaseSync } from 'node:sqlite'

const events_db = new DatabaseSync('events/events.db')

function getEventList() {
    let ret_str = '';

    const event_query = events_db.prepare('SELECT * from events');
    const events = event_query.all();

    for (const eventt of events) {
        ret_str += eventt.title+'\n';
    }

    return ret_str;
}

function setReminder() {
}

function checkReminders() {
}

function timeUntil(given_title) {
    /* returns time until event with given
     * title */
}

export default { getEventList, timeUntil };
