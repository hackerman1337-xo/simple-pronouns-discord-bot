class MessageReactionRemove {
	constructor() {
		this.name = 'message reaction remove';
	}

	async handle(client, reaction, user) {
		let message = reaction.message;

		if (reaction.message.partial) message = await reaction.message.fetch();

		let member = message.guild.members.cache.get(user.id);

		if (!member) member = await message.guild.members.fetch(user.id);
		if (member.id === client.user.id) return;

		if (reaction.partial) await reaction.fetch();

		
		let reactionEmoji = reaction.emoji.name;
		if (reactionEmoji in client.config.setup.reactionRoles )
		{
			let reactionRole = client.config.setup.reactionRoles[reactionEmoji];
			client.utils.Logger.debug(`${member.username} reacted in ${client.guild.name} with ${reaction.emoji.name} - adding role ${reactionRole}.`);
			
			const role = message.guild.roles.cache.find((r) => r.name === reactionRole);
			member.roles.remove(role, reactionRole).catch((error) => client.logger.error(error));
		}
	}
}

module.exports = MessageReactionRemove;
