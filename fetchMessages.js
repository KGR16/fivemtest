const fs = require('fs');
const { Client } = require('discord.js');
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });

client.once('ready', () => {
    console.log('Discord client ready!');
    
    const channelId = '920596423454646306'; // Replace with your channel ID
    const channel = client.channels.cache.get(channelId);

    if (!channel) {
        console.error('Channel not found!');
        return;
    }

    channel.messages.fetch({ limit: 1 }).then(messages => {
        const lastMessage = messages.first();
        if (!lastMessage) {
            console.error('No messages found in channel!');
            return;
        }

        const messageData = {
            content: lastMessage.content,
            author: lastMessage.author.username,
            timestamp: lastMessage.createdTimestamp
        };

        fs.writeFileSync('lastMessage.json', JSON.stringify(messageData, null, 2));
        console.log('Last message saved to lastMessage.json');
        client.destroy();
    }).catch(console.error);
});

client.login('MTIyMDc1ODY0MDYwNTI3MDE3Nw.G16AA8.nSUJFzmnOtS5YlN-vhW9xmKfWIkFtlyhM30GKw'); // Replace with your bot token
