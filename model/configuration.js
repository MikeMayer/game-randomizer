const { Emulator } = require('./emulator')
const { Console } = require('./console')

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
        var consoles = configurationObject.consoles.map(t => new Console(t.name, t.romRoots, t.core, t.tags))

        return new Configuration(emulators, consoles)
    }
}

module.exports = {
    Configuration
}
