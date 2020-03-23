const Command = require('../Lib/Command');

class Twitter extends Command {
	constructor(parent, client) {
		super({
			command: 'twitter',
			aliases: ['twitter'],
			description: 'Hello',
		});
		Object.assign(this, parent);
	}

	execute(target, context, msg, self) {
        this.client.say(target, `${context['display-name']} you can find it at twitter.com/z3ro0k`);    
    }
}

module.exports = Twitter;