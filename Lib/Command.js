class BaseCommand {
	constructor(options) {
		this.command = options.command;
		this.aliases = options.aliases;
		this.description = options.description;
	}
}

module.exports = BaseCommand;
