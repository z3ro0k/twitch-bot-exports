const Command = require('../Lib/Command');

class Dice extends Command {
	constructor(parent, client) {
		super({
			command: 'dice',
			aliases: ['d20'],
			description: 'Hello',
		});
		Object.assign(this, parent);
		Object.assign(this, client);
	}

	execute(target, context, msg, self){

        const num = this.rollDice();
        this.client.say(target, `${context['display-name']} You rolled a ${num}. PogChamp`);    
    }
    rollDice () {
        const sides = 20;
        return Math.floor(Math.random() * sides) + 1;
    }
}

module.exports = Dice;