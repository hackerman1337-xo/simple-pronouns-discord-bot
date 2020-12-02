const Command = require('../../../structure/Command');

class Setup extends Command {
	constructor(client) {
		super(client, {
			name: 'setup',
			description: 'Launch the reaction role.',
			usage: 'setup'
		});
	}

	run(context) {
		const configuration = this.client.config.setup.roles.map((role, emote) => {
			return {
				role: role,
				emoji: this.client.config.setup.emotes[emote]
			};
		});

		const embed = {
			embed: {
				author: {
					name: 'Reaction Role',
					icon_url: context.message.guild.iconURL()
				},
				color: 6841599,
				fields: []
			}
		};

		for (const { role, emoji } of configuration) {
			if (!context.message.guild.roles.cache.find((r) => r.name === role)) return context.message.channel.send(`The role \`${role}\` doesn't exist.`);

			const guildEmoji = this.client.emojis.cache.find((emote) => emote.name === emoji);

			if (!guildEmoji) embed.embed.fields.push({ name: role, value: `React to ${emoji} to get the \`${role}\` role.` });
			else embed.embed.fields.push({ name: role, value: `React to ${guildEmoji} to get the **"${role}"** role.` });
		}

		return context.message.channel.send(embed).then(async (msg) => {
			for (const emoji of this.client.config.setup.emotes) {
				const guildEmoji = this.client.emojis.cache.find((emote) => emote.name === emoji);

				if (!guildEmoji) await msg.react(emoji);
				else await msg.react(guildEmoji.id);
			}
		});
	}
}

module.exports = Setup;
