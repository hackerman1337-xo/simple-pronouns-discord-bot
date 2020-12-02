class Ready {
	constructor() {
		this.name = 'ready';
	}

	handle(client) {
		client.user.setPresence({
			activity: {
				name: `${client.config.bot.prefix}help`,
				type: 'PLAYING'
			},
			status: 'dnd'
		});

		client.utils.Logger.log(`[${client.user.username}] - ${client.users.cache.size} users in ${client.guilds.cache.size} servers.`);
	}
}

module.exports = Ready;
