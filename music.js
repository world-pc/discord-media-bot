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

function getMusicList() {
    let ret_str = '';

    const artist_query = music_db.prepare('SELECT artist FROM pieces');
    const artists = artist_query.all();

    for (const artist of artists) {
        ret_str += artist.artist + '\n';

        const album_query = music_db.prepare(
            `SELECT album FROM pieces WHERE artist = '${artist.artist}'`
        );
        const albums = album_query.all();

        for (const album of albums) {
            ret_str += '        '+ album.album + '\n';

            const title_query = music_db.prepare(
                `SELECT title from pieces WHERE artist = '${artist.artist}' AND album = '${album.album}'`;
            );
            const titles = title_query.all();

            for(const title of titles) {
                ret_str += '                ' + title.title + '\n';
            }
        }
    }
    
    return ret_str;
}

export default {getMusicFilepath, getMusicList}
