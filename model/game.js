const path = require('path')

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

module.exports = {
    Game
}