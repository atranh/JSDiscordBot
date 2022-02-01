const snoowrap = require('snoowrap');
// Create a new snoowrap requester with OAuth credentials.
const r = new snoowrap({
    userAgent: "discord bot ripper",
    clientId: '',
    clientSecret: '',
});

postid = ["w", "x", "y", "z"];
counter = 0;
var sub = ['dankmemes', 'memes'];

module.exports = {
    name: 'reddit',
    description: "gets reddit posts and posts it in a channel",
    execute(client) {
        var submission = r.getSubreddit('dankmemes').getNew()[0].fetch().then(getlink);
        setTimeout(function () {
            var submission = r.getSubreddit('memes').getNew()[0].fetch().then(getlink);
        },1500);

        function getlink(data){
            postid[counter] = data.name.substring(3);
            posttitle = data.title;
            posturl = data.url;

            if(counter >= 2)
            {
                if(postid[counter] !== postid[counter-2] && postid[counter] !== postid[counter-1])
                {
                    postid[counter-2] = postid[counter];
                    link = "https://www.reddit.com/r" + "/" + sub[counter-2] + "/comments/" + postid[counter] + "/" + posttitle.replace(/[^a-zA-Z ]/g, "")
                    link = link.replace(/ /g,"_");
                    const Embed = {
                        color: 0xFF5600,
                        title: posttitle,
                        url: link,
                        image: {url : posturl}, //this needs to be posturl
                    };
                    client.channels.cache.get('').send({ embed: Embed });
                }
                if(counter === 2)
                {
                    counter++;
                }
                else
                {
                    counter--;
                }
            }
            else
            {
                link = "https://www.reddit.com/r" + "/" + sub[counter] + "/comments/" + postid[counter] + "/" + posttitle.replace(/[^a-zA-Z ]/g, "")
                link = link.replace(/ /g,"_");
                const Embed = {
                    color: 0xFF5600,
                    title: posttitle,
                    url: link,
                    image: {url : posturl}, //this needs to be posturl
                };
                client.channels.cache.get('').send({ embed: Embed });
                counter++;
            }
        }
    }
}

