//Windows + R to open terminal, ctrl+c to close the bot so u can run again
//run [node .] in the terminal to activate bot

const Discord = require('discord.js'); //connecting api that we installed to this file (our main file)

const {MessageAttachment, User} = require("discord.js");

const client = new Discord.Client();

const token = ''; 

const fs = require('fs');
const { cpuUsage } = require('process');
const { userInfo } = require('os');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js')); //tells code to go into commands folder

for(const file of commandFiles)
{
    const command = require(`./commands/${file}`)

    client.commands.set(command.name, command);
}

client.once('ready', () => 
{
    console.log('You-bot is online!');
});

var dupe = false;

setInterval(function () {
    client.commands.get('reddit').execute(client);
}, 3600000)

client.on('message', message =>{
    if(message.channel.id !== "" || message.author.bot) return;
    //if(message.channel.id !== "") return;

    //    if(message.channel.id !== "" || message.author.bot) return;//(message.author.bot && message.attachments.size === 0)) return;

    const args = message.content;
    const command = args.toLowerCase();

    if(dupe === true && command !== "off") 
    {
        client.commands.get('backup_server').execute(message, args, client, dupe);  
    }
    if(command === "backup-on" && dupe === false)
    {
        dupe = true;
    }
    else if (command === "backup-off" && dupe === true)
    {
        dupe = false;
    }

    if(command === 'ping')
    {
       client.commands.get('ping').execute(message, args);
    }

    else if(command === "sup")
    {
        client.commands.get('sup').execute(message, args);
    }

    //Sends the user the image he sent back to him
    else if(message.attachments.size > 0 && dupe === false)
    {
        client.commands.get('image_mirror').execute(message, args, client, dupe);
    }

    else 
    {
        //delays the method by 1 second because when it runs too quick, embeds don't have time to load so it doesn't register anything
        //the function() part is required here to make it view the module as a function as setTimeout won't work otherwise
        setTimeout(function () {if(message.embeds.length > 0) {
            client.commands.get('embed_mirror').execute(message,args, client)}},1500);           
    }
});


client.login(token);
