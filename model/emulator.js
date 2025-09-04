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
 * @type {import('child_process').ChildProcess}
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
     * @param {Console} gameConsole
     * @param {Game} game
     * @param {String} customCommand
     */
    async run(gameConsole, game, customCommand) {
        const options = {}
        if (childProcess && process.platform === 'win32') {
            //HACK: Windows and RetroArch-only :( :(

            const commands = ['taskkill /IM "retroarch.exe" /F', 'taskkill /IM "RALibretro.exe" /F']

            for (const command of commands) {
                exec(command, (error, stdout, stderr) => {
                    sleep(1000)

                    if (error) {
                        console.error(`exec error: ${error}`);
                        return
                    }
                })
            }
        }

        if (customCommand) {
            childProcess = exec(customCommand, options)
        }

        if (gameConsole.commandLineOptions) {
            const allOptions = [this.commandLineOptions, gameConsole.commandLineOptions].filter(opt => opt && opt.trim()).join(' ')
            const command = `${this.executable} ${allOptions} "${game.fileName}"`
            childProcess = exec(command, options)
        } else {
            childProcess = exec(`${this.executable} "${game.fileName}"`, options)
        }

        return childProcess.pid
    }
}

export default {
    Emulator
}
