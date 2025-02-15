process.on('unhandledRejection', console.error)
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client()
const express = require('express');
const app = express();
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.queue = new Map();
bot.skipvote = new Map();
bot.discord = require('discord.js')
bot.logger = require("./Modules/logger.js");
require("./Modules/functions.js")(bot);
require("./Modules/logs.js")(bot);
require('dotenv').config();



let folders = ["songcommands", "musiccommands", "imagecommands", "funcommands", "imagecommands/gifcommands", "modcommands", "maincommands", "ownercommands"]

folders.forEach(function(folder) {
  fs.readdir(`./BotCommands/${folder}/`, (err, files) => {
    if(err) console.log(err);

     let jsfile = files.filter(f => f.split(".").pop() === "js")
      if(jsfile.length <= 0){
        console.log("Could not find commands");
        return;
      } 

      jsfile.forEach((f, i) => {
        let props = require(`./BotCommands/${folder}/${f}`);
        console.log(`${f} Files loaded`);
        bot.commands.set(props.help.name, props);
        if (props.help.aliases) {
          props.help.aliases.forEach(alias => {
            bot.aliases.set(alias, props);
          });
        }
    });
  });
});


let token = process.env.TOKEN;

bot.login("NTkwNTgwODQyOTMwMzcyNjA4.XQkTXw.hcUpUdHYqbDs-Q53KfDP8yBW4tA");

try {
  app.use(express.static('public'));
  app.get('/', function(res, response) {
    response.sendFile(__dirname + '/public/index.html');

  });
  
  const listener = app.listen(3000, function() {
    console.log('Your app is listening on port ' + listener.address().port);
  });
} catch (error) {
  console.log(error) 
}