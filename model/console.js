const glob = require('glob')
const { Game } = require('./game')

class Console {
    /**
     * @param {String} name
     * @param {String[]} romRoots
     * @param {String} core
     * @param {String[]} tags
     */
    constructor(name, romRoots, core, tags) {
        this.name = name
        this.romRoots = romRoots
        this.core = core
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
                        // @ts-ignore
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

module.exports = {
    Console
}
