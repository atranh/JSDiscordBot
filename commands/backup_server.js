module.exports = {
    name: 'backup_server',
    description: "duplicates every message sent in one channel and sends it to another",
    execute(message, args, client, dupe) {
        if(message.attachments.size === 0)
        {
            client.channels.cache.get('').send(message)
        }
        else
        {
            client.commands.get('image_mirror').execute(message,args,client,dupe);
        }
    }
}