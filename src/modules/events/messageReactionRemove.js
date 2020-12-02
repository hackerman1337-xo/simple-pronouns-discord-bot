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

		// He/Him emoji
		if ((reaction.emoji.name === '👨') || (reaction.emoji.toString() === '👨') || (reaction.emoji.id === '👨')) {
			const role = message.guild.roles.cache.find((r) => r.name === 'He/Him');
			member.roles.remove(role, 'He/Him').catch((error) => client.logger.error(error));
		}
		// She/Her emoji
		if ((reaction.emoji.name === '👩') || (reaction.emoji.toString() === '👩') || (reaction.emoji.id === '👩')) {
			const role = message.guild.roles.cache.find((r) => r.name === 'She/Her');
			member.roles.remove(role, 'She/Her').catch((error) => client.logger.error(error));
		}
		// They/Them emoji
		if ((reaction.emoji.name === '🧑') || (reaction.emoji.toString() === '🧑') || (reaction.emoji.id === '🧑')) {
			const role = message.guild.roles.cache.find((r) => r.name === 'They/Them');
			member.roles.remove(role, 'They/Them').catch((error) => client.logger.error(error));
		}
	}
}

module.exports = MessageReactionRemove;
