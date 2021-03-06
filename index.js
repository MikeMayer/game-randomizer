const fs = require('fs/promises')
const { Configuration } = require('./model/configuration.js')
const { random, intersection } = require('./utility.js')

class RandomGameResult {
    constructor(console, emulator, game) {
        this.console = console
        this.emulator = emulator
        this.game = game
    }
}

class GameRandomizerOptions {
    constructor(consoleTag) {
        this.consoleTag = consoleTag
    }
}

class GameRandomizer {
    constructor(config = new Configuration()) {
        this.config = config
    }

    get consoles() { return this.config.consoles }
    set consoles(value) { this.config.consoles = value }
    get emulators() { return this.config.emulators }
    set emulators(value) { this.config.emulators = value }

    async scanForGames() {
        const configFile = (await fs.readFile('game-config.json')).toString('utf8')
        this.config = Configuration.fromString(configFile)

        var scanPromises = []

        for (const console of this.config.consoles) {
            scanPromises.push(console.scanForGames())
        }

        return Promise.allSettled(scanPromises)
    }

    /**
     * @param {GameRandomizerOptions} options
     */
    async pickRandomGame(options) {
        var consoles = this.consoles

        if (options && options.consoleTag) {
            consoles = consoles.filter(console => intersection(console.tags, [options.consoleTag]).size > 0)
        }

        const gameConsole = random(consoles)
        const game = random(gameConsole.games)
        const emulators = this.emulators.filter(emulator => intersection(emulator.consoleTags, gameConsole.tags).size > 0)

        if (!emulators.length) {
            return
        }

        console.log(`Picked ${game.name} for ${gameConsole.name}`)

        return new RandomGameResult(
            gameConsole,
            emulators[0],
            game
        )
    }
}

if (process.env.RUN_GAME_RANDOMIZER_AT_LAUNCH) {
    const randomizer = new GameRandomizer()

    randomizer.scanForGames().then(() => {
        randomizer.pickRandomGame().then(randomPick => {
            randomPick.emulator.run(randomPick.game)
        })
    })
}

module.exports = {
    GameRandomizer,
    GameRandomizerOptions
}
