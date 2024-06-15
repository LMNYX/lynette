let channelsData = {};

window.onload = async () => {
    let chatWindow = document.querySelector('.chat-window');

    window.electronAPI.onChatMessage((value) => {
        console.log(value); // debugf
        let newChatMessage = document.createElement("p");
        newChatMessage.className = "chat-message";
        newChatMessage.id = ""; // TO-DO
        
        let newChatMessageChatter = document.createElement("span");
        newChatMessageChatter.innerText = `${value.tags['display-name']}: `;
        newChatMessageChatter.style = `color: ${value.tags.color};`
        
        let newChatMessageMessage = document.createElement("span");
        
        // tokenize the message
        let _message = value.message.split(' ');

        for (word in _message)
        {
            let _word = _message[word];
            let _find = channelsData[value.channel.substr(1)]['7tv'].emote_set.emotes.find(x => x.name == _word);
            console.log(_find);
            if (_find !== undefined)
                _message[word] = `<img src="https:${_find.data.host.url}/2x.webp">`
        }

        _message = _message.join(' ');

        newChatMessageMessage.innerHTML = _message;

        newChatMessage.append(newChatMessageChatter);
        newChatMessage.append(newChatMessageMessage);

        chatWindow.append(newChatMessage);        
    });

    window.electronAPI.on7TVEmotesLoaded((value) => {
        channelsData[value.channel] = value.channelData;
    });

};