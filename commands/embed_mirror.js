const {MessageAttachment, User} = require("discord.js");

module.exports = {
    name: 'embed_mirror',
    description: "send a mirror of embedded images",
    execute(message, args, client) {
        link = '';
        author = '';
        authoricon ='';
        text = '';
        retweets = 0;
        likes = 0;
        count = 0;

        //message.delete();
        message.channel.send("i see embedded papi");
        var images = ["x", "x", "x", "x"];

        message.embeds.forEach(embeds1 => {
            //Gets the data from the first image only as the later images contain no data
            if(count === 0)
            {
                //Checking if the links and values exist, then getting them if they do
               if (embeds1.hasOwnProperty('url')) {link = embeds1.url;}
               if (embeds1.author !== null) {
                    if (embeds1.author.hasOwnProperty('name')) {author = embeds1.author.name;}
                    if (embeds1.author.hasOwnProperty('iconURL')) {authoricon = embeds1.author.iconURL;}
                }
                if (embeds1.hasOwnProperty('description')) {text = embeds1.description;}    

                //Twitter sometimes does not show the Likes/Retweets because of a glitch on
                //their end so this accounts for that
                if (embeds1.fields.length == 2)
               {
                   if (embeds1.fields[0].value !== null) {retweets = embeds1.fields[0].value;}
                   if (embeds1.fields[1].value !== null) {likes = embeds1.fields[1].value;}
               }
               else if(embeds1.fields.length == 1)
               {
                    if (embeds1.fields[0].value !== null) {likes = embeds1.fields[0].value;}
               }
            }


            //Checks if an image exists, if it does, get it
            if (embeds1.image !== null) {
                images[count] = embeds1.image.url;        
                var attachment = new MessageAttachment(images[count], "pic.png");
                message.channel.send(attachment);

                var temp 
                client.channels.cache.get('').messages.fetch({ limit: message.embeds.length })

                .then(messages => {
                    newmessages =Array.from(messages);

                    console.log(newmessages[0][0])
                    console.log(newmessages[1][0])
                    message.channel.send(newmessages[count][0])

                    for(i = 0; i > message.embeds.length; i++)
                    {
                        message.channel.send(newmessages[i][0])
                }
                    //newmessages.attachments.forEach(attachment1 => {
                        //newattatchments = Array.from(attachment1.attachments);
                        //console.log(newattatchments);
                        //temp = newattatchments.url;
                        //message.channel.send(temp)
                    //})
                 })
                .catch(console.error);
                setTimeout(function () { wait(message)},3000)
            }
            else if (embeds1.thumbnail !== null) {
                images[count] = embeds1.thumbnail.url;
                var attachment = new MessageAttachment(images[count], "pic.png");
                setTimeout(function () { wait(message)},3000)

            }
            else {
                images[count] = '';
            }
        })
        count = 0;

        function wait(message)
        {            
            if(client.user.lastMessage !== null)
            {
                user = client.users.fetch('');
                client.user.lastMessage.attachments.forEach(attachment1 => {;
                    const url = attachment1.url;
                    //console.log(url);
                    images[count] = url;
                })
            }
            //console.log(images)           
            //embedCREATE(message);
            count++;

        }

        function embedCREATE(message)
        {
            //Embed creation
            const Embed = {
                color: 0x1DA1F2,
                author: {
                    name: author,
                    url: link,
                    icon_url: authoricon
                },
                description: text,
                image: {url : images[count]}, 
                fields: [
                    {
                        name: "Retweets",
                        value: retweets,
                        inline:true
                    },
                    {
                        name: "Likes",
                        value: likes,
                        inline: true,
                    },
                ],
                footer:
                {
                    icon_url: "",
                    text: "You-bot"
                }           
            };
            message.channel.send({embed: Embed});
        }
    }
}



