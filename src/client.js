if (Number(process.version.slice(1).split('.')[0]) < 12) throw new Error('Node 12.0.0 or newer is required. Update Node on your system.');

require('dotenv').config();

const { Client, Collection } = require('discord.js');
const { readdir } = require('fs').promises;
const { join } = require('path');

/**
 * @typedef {Object} ReactionRole
 * @prop {Map<string, string>} commands
 * @prop {import("./config.js").Handlers} config The config file
 * @prop {import("./utils/index.js").Utils} utils Some util methods and classes
 */

/**
 * @class ReactionRole
 * @extends {Client}
 */
class ReactionRole extends Client {
	constructor() {
		super({ partials: ['MESSGE', 'CHANNEL', 'REAACTION'] });
		/** @type {Map<string, string>} */
		this.commands = new Collection(undefined);
		/** @type {Array<>} */
		this.categories = [];

		/** @type {import("./config.js")} */
		this.config = require('./config');
		/** @type {import("./utils").Utils} */
		this.utils = require('./utils');

		this._run()
	}

	/**
	 * @description Connects the Client to a Websocket
	 * @private
	 * @returns {void}
	 */
	_run() {
		// Enable debugger logs on Development environment
		if (process.env.NODE_ENV === 'development') this.on('debug', (debug) => this.utils.Logger.debug(debug));

		this._commandsLoader();
		this._eventsLoader();

		this.login(process.env.BOT_TOKEN)
			.then(() => this.utils.Logger.log('Connected to the WebSocket.'))
			.catch(() => this.utils.Logger.error('Connection to the WebSocket failed.'));
	}

	/**
	 * @description Load all categories and commands modules
	 * @private
	 * @returns {void}
	 */
	async _commandsLoader() {
		let commandsLength = 0;
		const categories = await readdir(join(__dirname, 'modules', 'commands'));

		for (let i = 0; i < categories.length; i++) {
			const commands = await readdir(join(__dirname, 'modules', 'commands', categories[i]));
			this.categories.push(categories[i]);
			commandsLength = commandsLength + commands.length;
			commands.forEach((c) => {
				try {
					const command = new (require(join(__dirname, 'modules', 'commands', categories[i], c)))(this);
					command.category = categories[i];

					this.commands.set(command.name, command);
				} catch (error) {
					this.utils.Logger.error(`[Commands] - Failed to load command ${c}: ${error.stack || error}`);
				}
			});
		}

		this.utils.Logger.log(`[Commands] - Loaded ${this.commands.size}/${commandsLength} commands.`);
	}

	/**
	 * @description Load all events modules
	 * @private
	 * @returns {void}
	 */
	async _eventsLoader() {
		let eventLoadedLength = 0;
		const events = await readdir(join(__dirname, 'modules', 'events'));

		for (const module of events) {
			const moduleName = module.split('.')[0];
			try {
				const event = new (require(join(__dirname, 'modules', 'events', module)));
				eventLoadedLength++;
				this.on(moduleName, event.handle.bind(event, this));
				delete require.cache[require.resolve(join(__dirname, 'modules', 'events', module))];
			} catch (error) {
				return this.utils.Logger.error(`[Events] - Failed to load event ${module}: ${error.stack || error}`);
			}
		}

		this.utils.Logger.log(`[Events] - Loaded ${eventLoadedLength}/${events.length} events.`);

		process.on('uncaughtException', (error) => this.utils.Logger.error(error.stack || error));
		process.on('unhandledRejection', (error) => this.utils.Logger.error(error.stack || error));
	}
}

module.exports = new ReactionRole();
