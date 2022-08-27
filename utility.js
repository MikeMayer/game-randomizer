const crypto = require('crypto')
const fs = require('fs')

/**
 * @param {Array<any>} array
 */
const random = array => array[Math.floor(Math.random() * array.length)]

/**
 * x ∪ y
 */
const union = (/** @type {any} */ x, /** @type {any} */ y) => [...new Set([...x, ...y])]

/**
 * x ∩ y
 */
const intersection = (x, y) => {
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
        const hash = crypto.createHash(hashAlgorithm)
        const input = fs.createReadStream(path)

        input.on('error', reject)
        input.on('data', chunk => { hash.update(chunk) })
        input.on('close', () => { resolve(hash.digest('hex')) })
    })
}

module.exports = {
    random,
    union,
    intersection,
    checksum
}
