'use strict';

const config = require('../../config/config'),
    request = require('request-promise'),
    baseURL = config.get('audioApi').v1.url;

let api,
    playlist = [
        {
            artist: 'st. vincent',
            track: '1i6N76fftMZhijOzFQ5ZtL'
        },
        {
            artist: 'talking heads',
            track: '6aBUnkXuCEQQHAlTokv9or'
        },
        {
            artist: 'sylvan esso',
            track: '71cUqXJ3h1r0Ees6YdENLU'
        },
        {
            artist: 'yann tiersen',
            track: '0Sw6vAB39WQg5WXKurnnEm'
        },
        {
            artist: 'mother\'s',
            track: '6h3FOkiOixsUUEgIHS0qR5'
        }
    ];


function getPlaylist(name) {
    console.log('name', name);
    let artistName = name.toLowerCase();
    for (let i in playlist) {
        if (playlist[i].artist === artistName) {
            console.log('artistName', playlist[i]);
            let URL = `${baseURL}${playlist[i].track}`,
                options = {
                    method: 'GET',
                    uri: URL,
                    headers: {
                        Accept: 'application/json',
                        Authorization: bearerToken
                    },
                    transform: function (body) {
                        console.log(body);
                        body = JSON.parse (body);
                        return body;
                    }
                };
            return request(options);
        }
    }
}
function getTracklist(name) {
    console.log('name', name);
    let artistName = name.toLowerCase();
    let URL = `https://api.spotify.com/v1/search?q=${artistName}&type=track&limit=1`,
        options = {
            method: 'GET',
            uri: URL,
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.BEARER}`
            },
            transform:function (body) {
                body = JSON.parse (body);
                return body;
            }
        }
        console.log(URL)
        return request(options);
}

api = {
    getTracklist: getTracklist
};

module.exports = api;
