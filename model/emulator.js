const child_process = require('child_process')

// eslint-disable-next-line no-unused-vars
const { Game } = require('./game')
// eslint-disable-next-line no-unused-vars
const { Console } = require('./console')

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
     * @param {((error: child_process.ExecException | null, stdout: string, stderr: string) => void) | undefined} callback
     */
    run(console, game, customCommand, callback) {
        if (childProcess) {
            childProcess.kill()
        }

        if (customCommand) {
            childProcess = child_process.exec(customCommand, callback)
        }

        if (console.core) {
            childProcess = child_process.exec(`${this.executable} -L "${console.core}" "${game.fileName}"`, callback)
        } else {
            childProcess = child_process.exec(`${this.executable} "${game.fileName}"`, callback)
        }

        return childProcess
    }
}

module.exports = {
    Emulator
}
