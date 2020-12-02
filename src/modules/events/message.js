class Message {
	constructor() {
		this.name = 'message';
	}

	handle(client, message) {
		if (message.author.bot) return;

		if (!message.content.toLowerCase().startsWith(client.config.bot.prefix)) return;

		message.args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g);
		const commandArgs = message.args.shift().toLowerCase();

		const command = client.commands.find((cmd) => cmd.name === commandArgs || cmd.aliases && cmd.aliases.includes(commandArgs));

		if (!command) return;

		command.run({ message });
	}
}

module.exports = Message;
