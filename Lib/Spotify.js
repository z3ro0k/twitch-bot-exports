const superagent = require('superagent');
const fetch = require('isomorphic-unfetch');
const { stringify } = require('querystring');

const { REFRESH_TOKEN: refresh_token } = process.env 

class SpotifyManager {
    constructor(keys) {
        this.clientId = keys.clientId;
        this.clientSecret = keys.clientSecret;
    }

    async getAuthorizationToken() {
        const basic = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString("base64");
        const Authorization = `Basic ${basic}`;
        const url = new URL("https://accounts.spotify.com/api/token");
        const body = stringify({
            grant_type: "refresh_token",
            refresh_token,
        });
        const response = await fetch(`${url}`, {
            method: "POST",
            headers: {
                Authorization,
                "Content-Type": "application/x-www-form-urlencoded",
            }, body,
        }).then((r) => r.json());

        return `Bearer ${response.access_token}`;
    }

    async nowPlaying() {
        const Authorization = await this.getAuthorizationToken();
		var data; 

		const { body: response } = await superagent.get(`https://api.spotify.com/v1/me/player/currently-playing`)
			.set('Authorization', `${Authorization}`);

        data = await response
        return { track: data.item, status: data.is_playing ? 'online' : 'offline' };
    }
}


module.exports = SpotifyManager;