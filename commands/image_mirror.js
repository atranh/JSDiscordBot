module.exports = {
    name: 'image_mirror',
    description: "sends a mirror of an image sent",
    execute(message, args, client, dupe) {
        message.attachments.forEach(attachment1 => {
            const url = attachment1.url;
            message.channel.send("i see an image senpai");
            message.channel.send(url);
            if(dupe === true) 
            {
                client.channels.cache.get('').send(url)
            }
        })
    }
}
