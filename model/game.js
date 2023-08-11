import { basename, extname  } from 'path'

export class Game {
    /**
     * @param {String} fileName Absolute path to rom
     */
    constructor(fileName) {
        this.fileName = fileName
    }

    get name() { return basename(this.fileName, extname(this.fileName)) }

    toString() { return this.name }
}
