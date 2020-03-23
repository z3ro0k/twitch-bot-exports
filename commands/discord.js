const Command = require('../Lib/Command');

class Discord extends Command {
	constructor(parent, client) {
		super({
			command: 'discord',
			aliases: ['dis'],
			description: 'Hello',
		});
		Object.assign(this, parent);
	}

	execute(target, context, msg, self) {
        this.client.say(target, `${context['display-name']} Join my discord server here discord.gg/q99CQEP`);    
    }
}

module.exports = Discord;