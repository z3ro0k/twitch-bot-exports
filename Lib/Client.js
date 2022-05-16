const { client } = require('tmi.js');
const fs = require('fs').promises;
const path = require('path');

class Bot extends client {
  constructor({
    identity = {},
    channels = []
  }) {
    super()
    const { username, password } = identity
    const connection = {
      server: "irc-ws.chat.twitch.tv"
    }
    if (!username && !password || !username || !password) {
      throw new Error('missing or invalid required arguments')
    }
    this.commands = new Map();
    this.client = this
    this.channels = channels.map(channel => this.formatCHANNEL(channel))
    this.opts = { identity, channels, connection }
    this.Connect()
  }

  async Connect() {
    await this.loadCommands(path.join(__dirname, '../', 'commands'));;
    this.connect().catch(console.error);
    this.on('connected', onConnectedHandler);
  }

  formatCHANNEL(channel) {
    channel = channel.toLowerCase()
    return channel.charAt(0) !== '#' ? '#' + channel : channel
  }
	
  async loadCommands(dir) {
    const commands = await fs.readdir(dir);

    for (let i = 0; i < commands.length; i++) {
      const Command = require(path.join(dir, commands[i]));
      const command = new Command(this, this.client);
      command.file = path.join(dir, commands[i]);
      this.commands.set(command.command, command);

      if (i + 1 === commands.length) {
        console.log('Loaded ' + commands.length + ' commands.');
      }
    }
  }
 // untested ban function	
  ban(target, username, reason = '') {
    try {
      this.say(target, `/ban ${username} ${reason}`)
    } catch (e) {
      console.log(e)
    }
  }
}

function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

module.exports = Bot;
