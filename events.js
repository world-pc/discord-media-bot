import { DatabaseSync } from 'node:sqlite'

const events_db = new DatabaseSync('events/events.db')

function _getEvents() {
    const event_query = events_db.prepare('SELECT * from events');
    const events = event_query.all();

    return events;
}

function getEventList() {
    let ret_str = '';

    const events = _getEvents();

    for (const eventt of events) {
        ret_str += eventt.title+'\n';
    }

    return ret_str;
}

function setReminder() {
}

function checkReminders() {
}

function addCommas(given_milli) {
    let sgm = `${given_milli}`;

    for(let i = sgm.length-3; i > 0; i -= 3) {
        sgm = sgm.slice(0, i)+','+sgm.slice(i);
    }

    return sgm;
}

function timeUntil(given_title) {
    /* returns time until event with given
     * title */

    const events = _getEvents();

    let chosen_event = undefined;
    for (const eventt of events) {
        if (eventt.title == given_title) {
            chosen_event = eventt;
        }
    }

    if (chosen_event == undefined) {
        return `sorry, couldn't find an event matching '${given_title}'`;
    }
    else {
        let ce_date = new Date(chosen_event.date+'T'+chosen_event.time+'Z');
        let timeDiff = ce_date - new Date();

        const days = Math.floor(timeDiff / 1000 / 60 / 60 / 24);
        timeDiff -= days * 1000 * 60 * 60 * 24;

        const hours = Math.floor(timeDiff / 1000 / 60 / 60);
        timeDiff -= hours * 1000 * 60 * 60;

        const minutes = Math.floor(timeDiff / 1000 / 60);
        timeDiff -= minutes * 1000 * 60;

        const seconds = Math.floor(timeDiff / 1000);

        return `matching event **[${chosen_event.title}]** is in `
              +`**${days} days, ${hours} hours, ${minutes} minutes, & ${seconds} seconds**\n`;
    }
}

export default { getEventList, timeUntil };
