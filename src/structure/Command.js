class Command {
	constructor(client, {
		name = null,
		description = 'No description provided',
		usage = 'No usage provided',
		category = 'Other',
		aliases = []
	}) {
		this.client = client;
		this.name = name;
		this.description = description;
		this.usage = usage;
		this.category = category;
		this.aliases = aliases;
	}
}
module.exports = Command;
