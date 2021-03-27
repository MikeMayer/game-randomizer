import { glob } from 'glob'

export class Repository {
    constructor (root, name, pattern) {
        this.root = root
        this.name = name
        this.pattern = pattern
    }

    async scan() {
        glob(this.pattern, {}, (e, files) => {

        })
    }
}
