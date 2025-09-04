import { createHash } from 'crypto'
import { createReadStream } from 'fs'

/**
 * @param {Array<any>} array
 */
export const random = array => array[Math.floor(Math.random() * array.length)]

/**
 * x ∪ y
 */
export const union = (/** @type {any} */ x, /** @type {any} */ y) => [...new Set([...x, ...y])]

/**
 * x ∩ y
 */
export const intersection = (/** @type {any} */ x, /** @type {any} */ y) => {
    if (x instanceof Array) { x = new Set(x) }
    if (y instanceof Array) { y = new Set(y) }

    return new Set([...x].filter(i => y.has(i)))
}

/**
 * @param {String} path absolute path to a file to be hashed
 * @returns {Promise<String>} hexadecimal hash string of file
 */
const checksum = async (path, hashAlgorithm = 'sha1') => {
    return new Promise((resolve, reject) => {
        const hash = createHash(hashAlgorithm)
        const input = createReadStream(path)

        input.on('error', reject)
        input.on('data', chunk => { hash.update(chunk) })
        input.on('close', () => { resolve(hash.digest('hex')) })
    })
}

export default {
    random,
    union,
    intersection,
    checksum
}
