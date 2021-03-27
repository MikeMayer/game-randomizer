const { glob } = require("glob")
const path = require('path')
const child_process = require('child_process')

class Game {
    /**
     * @param {String} fileName Absolute path to rom
     */
    constructor(fileName) {
        this.fileName = fileName
    }

    get name() { return path.basename(this.fileName, path.extname(this.fileName)) }

    toString() { return this.name }
}

class Emulator {
    /**
     * @param {String} name
     * @param {String} executable
     * @param {String} commandLineOptions
     * @param {String[]} consoleTags
     */
    constructor(name, executable, commandLineOptions, consoleTags) {
        this.name = name
        this.executable = executable
        this.commandLineOptions = commandLineOptions
        this.consoleTags = consoleTags
    }

    /**
     * @param game {Game}
     */
    run(game) {
        this.runningProcess = child_process.exec(`${this.executable} "${game.fileName}"`)
    }
}

class Console {
    /**
     * @param {String} name
     * @param {String[]} romRoots
     * @param {String[]} tags
     */
    constructor(name, romRoots, tags) {
        this.name = name
        this.romRoots = romRoots
        this.tags = tags
        this.gamePaths = new Set()
    }

    get games() { return Array.from(this.gamePaths).map(path => new Game(path)) }

    async scanForGames() {
        this.gamePaths.clear()

        var promises = [Promise.resolve([])]

        for (const root of this.romRoots) {
            promises.push(new Promise((resolve, reject) => {
                glob(root, {
                    absolute: true,
                    nodir: true
                }, (error, files) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(files ?? [])
                        files.forEach(path => this.gamePaths.add(path))

                        console.debug(`${files.length} ${this.name} games found`)
                    }
                })
            }))
        }

        return Promise.allSettled(promises)
    }
}

class Configuration {
    /**
     * @param {Emulator[]} emulators
     * @param {Console[]} consoles
     */
    constructor(emulators, consoles) {
        this.emulators = emulators
        this.consoles = consoles
    }

    /**
     * @param {String} config Parsed from `config.json`
     * @returns {Configuration}
     */
    static fromString(config) {
        const configurationObject = JSON.parse(config)
        var emulators = configurationObject.emulators.map(t => new Emulator(t.name, t.executable, t.commandLineOptions, t.consoleTags))
        var consoles = configurationObject.consoles.map(t => new Console(t.name, t.romRoots, t.tags))

        return new Configuration(emulators, consoles)
    }
}

module.exports = {
    Configuration,
    Game,
    Emulator,
    Console
}
