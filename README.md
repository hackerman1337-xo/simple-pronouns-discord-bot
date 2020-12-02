# Simple Discord Pronouns Bot

Simple, minimal bot to enable react roles for the three most common personal pronouns:

- He/Him
- She/Her
- They/Them

## Instructions

0. (Optional) If you'd like to self-host, clone the repo and run `npm install` on your server. Copy `src/config.example.js` to `src/config.js` and edit appropriately. Edit `.env` to include your bot token and environment, then run `npm start` to start the bot.

1. Create three roles in your discord (or however many you set up in your config file):

- He/Him
- She/Her
- They/Them

2. Invite the bot to your discord: [https://discord.com/oauth2/authorize?client_id=783782475146723339&scope=bot&permissions=268774464](https://discord.com/oauth2/authorize?client_id=783782475146723339&scope=bot&permissions=268774464)

3. Type "=setup" (or the prefix you set up in your own config file) in the channel you want the bot to post a message to. The bot will need permissions to read and send message, and add reactions in that channel.

4. Enjoy!