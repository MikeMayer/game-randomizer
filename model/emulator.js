import { exec } from 'child_process'

// eslint-disable-next-line no-unused-vars
import { Game } from './game.js'
// eslint-disable-next-line no-unused-vars
import { Console } from './console.js'

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

export class Emulator {
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
            exec(command)
            await sleep(1000)
        }

        if (customCommand) {
            childProcess = exec(customCommand, options)
        }

        if (console.core) {
            childProcess = exec(`${this.executable} -L "${console.core}" "${game.fileName}"`, options)
        } else {
            childProcess = exec(`${this.executable} "${game.fileName}"`, options)
        }

        return childProcess.pid
    }
}

export default {
    Emulator
}
