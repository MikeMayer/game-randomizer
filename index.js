const fs = require('fs/promises')
const { Configuration } = require('./model/configuration.js')
const { random, union } = require('./utility.js')

class GameRandomizer {
    get consoles() { return this.config.consoles }
    get emulators() { return this.config.emulators }

    async scanForGames() {
        const configFile = (await fs.readFile('game-config.json')).toString('utf8')
        this.config = Configuration.fromString(configFile)

        var scanPromises = []

        for (const console of this.config.consoles) {
            scanPromises.push(console.scanForGames())
        }

        return Promise.allSettled(scanPromises)
    }

    async pickRandomGame(options) {
        const gameConsole = random(this.consoles)
        const game = random(gameConsole.games)

        console.log(`Picked ${game.name} for ${gameConsole.name}`)

        const emulator = this.emulators.filter(emulator => union(emulator.consoleTags, gameConsole.tags).length > 0)[0]

        return {
            console: gameConsole,
            emulator,
            game
        }
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
    GameRandomizer
}
