const dotenv = require('dotenv');
dotenv.config();

const opts = {
  identity: {
    username: process.env.BOT_USERNAME,
    password: process.env.OAUTH_TOKEN
  },
  channels: [
    process.env.CHANNEL_NAME
  ]
};

const Bot = require('./Lib/Client')

const client = new Bot(opts)

client.on('message', onMessageHandler);

client.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})

var prefix = "z?"

function onMessageHandler(target, context, msg, self, chatter ) {
  if (self) { return; }
  
  var cont = msg.slice(prefix.length).split(" ");
  var args = cont.slice(1);

  if (!msg.startsWith(prefix)) return;

  var cmd = client.commands.get(cont[0])
  if (!cmd) return;
  
  cmd.execute(target, context, msg, self, args, chatter )

}