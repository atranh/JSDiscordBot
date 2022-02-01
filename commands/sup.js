module.exports = {
    name: 'sup',
    description: "this is a sup command",
    execute(message, args){
        message.channel.send('yo');
    }
}