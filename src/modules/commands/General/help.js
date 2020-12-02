const Command = require('../../../structure/Command');

class Help extends Command {
	constructor(client) {
		super(client, {
			name: 'help',
			description: 'Displays all the available commands.',
			usage: 'help [command]'
		});
	}

	run(context) {
		if (context.message.args[0]) {
			const command = this.client.commands.find((cmd) => cmd.name === context.message.args[0] || cmd.aliases && cmd.aliases.includes(context.message.args[0]));
			if (command) {
				return context.message.channel.send({
					embed: {
						author: {
							name: `Command: ${command.name}`,
							icon_url: this.client.user.displayAvatarURL()
						},
						color: 0x6864ff,
						description: `__\`Description:\`__ ${command.description}\n  \n__\`Usage:\`__ ${command.usage}\n  \n__\`Aliases:\`__ ${command.aliases.join(', ')}`
					}
				});
			}
		}

		const fields = [];

		this.client.categories.forEach((category) => {
			fields.push({
				name: category,
				value: this.client.commands.filter((command) => command.category === category).map(command => `\`${command.name}\``).join(', ')
			})
		})

		return context.message.channel.send({
			embed: {
				author: {
					name: `${this.client.user.username}'s commands list`,
					icon_url: this.client.user.displayAvatarURL()
				},
				color: 6841599,
				description: `Use \`${this.client.config.bot.prefix}help <command>\` for details. | ${this.client.commands.size} commands.`,
				footer: {
					text: this.client.user.username,
					icon_url: this.client.user.displayAvatarURL()
				},
				fields
			}
		});
	}
}

module.exports = Help;
