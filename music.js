import { DatabaseSync } from 'node:sqlite'

const music_db = new DatabaseSync('music/music_db');

function getMusicFilepath(title, artist, album) {
    let query_str = 'SELECT * FROM pieces WHERE ';
    query_str += `title='${title}' AND artist='${artist}' AND album='${album}'`;

    console.log(query_str);

    const query = music_db.prepare(query_str);
    const path = query.all()[0].path;
    query.close();

    return path;
}

export default {getMusicFilepath}
