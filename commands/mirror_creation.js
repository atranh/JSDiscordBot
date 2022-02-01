const { DiscordAPIError, MessageAttachment, MessageEmbed } = require("discord.js");
module.exports = {
    name: 'mirror_creation',
    description: "creates a mirror of images",
    execute(message,args, linktomirror) {
        var attachment = new MessageAttachment("", "pic.png");
        
        message.channel.send(attachment);
    }
}






