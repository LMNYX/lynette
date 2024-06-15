const axios = require('axios').default;

let channelsData = {};

async function RunTwitch(webcontents)
{

    const tmi = require('tmi.js');

    const twitchClient = new tmi.Client({
        channels: [ 'mishashto' ]
    });

    twitchClient.connect();

    twitchClient.on('roomstate', (channel, state) => {
        let channelName = channel.substr(1);
        
        if (!(channelName in channelsData))
        {
            channelsData[channelName] = {
                "id": state['room-id']
            };

            load7tvEmotes(channelName, webcontents);
        }

        console.log(channel);
        console.log(state);
    });

    twitchClient.on('message', (channel, tags, message, self) => {
        webcontents.send("onChatMessage", {
            "channel": channel,
            "tags": tags,
            "message": message,
            "self": self
        });
    });
}

async function load7tvEmotes(channelName, webcontents)
{
    let response = await axios.get(`https://7tv.io/v3/users/twitch/${channelsData[channelName].id}`);
    if (response.status != 200)
        return false;
    channelsData[channelName]['7tv'] = response.data;
    console.log(response);
    webcontents.send("on7TVEmotesLoaded", {
        "channel": channelName,
        "channelData": channelsData[channelName]
    });
}

module.exports = RunTwitch;