const Command = require('../Lib/Command');
const Manager = require('../Lib/Spotify');

const { CLIENT_ID: clientId, CLIENT_SECRET: clientSecret} = process.env 
const Spotify = new Manager({ clientId, clientSecret });

class Song extends Command {
	constructor(parent, client) {
		super({
			command: 'song',
			aliases: ['playing'],
			description: 'Hello',
		});
		Object.assign(this, parent);
		Object.assign(this, client);
	}
    
	async execute(target, context, msg, self){
        var {track } = await Spotify.nowPlaying();

        this.client.say(target, `${context['display-name']} Atzu is now playing ${this.shorten(track.name, 20)} by ${this.shorten(track.artists.map(a=> a.name).join(', '), 30)} on spotify `);    
    }
    shorten(text, len) {
        if (typeof text !== "string") return "";
        if (text.length <= len) return text;
        return text.substr(0, len).trim() + "...";
    }
}

module.exports = Song;