const child_process = require('child_process')

// eslint-disable-next-line no-unused-vars
const { Game } = require('./game')
// eslint-disable-next-line no-unused-vars
const { Console } = require('./console')

/**
 * @param {number} ms milliseconds
 */
function sleep(ms) {
    return new Promise((resolve) => { setTimeout(resolve, ms) })
}

/**
 * @type child_process.ChildProcess
 */
var childProcess

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
     * @param {Console} console
     * @param {Game} game
     * @param {String} customCommand
     */
    async run(console, game, customCommand) {
        const options =  { }
        if (childProcess) {
            //HACK: Windows and RetroArch-only :( :(
            const command = 'taskkill /IM "retroarch.exe" /F'
            child_process.exec(command)
            await sleep(1000)
        }

        if (customCommand) {
            childProcess = child_process.exec(customCommand, options)
        }

        if (console.core) {
            childProcess = child_process.exec(`${this.executable} -L "${console.core}" "${game.fileName}"`, options)
        } else {
            childProcess = child_process.exec(`${this.executable} "${game.fileName}"`, options)
        }

        return childProcess.pid
    }
}

module.exports = {
    Emulator
}
