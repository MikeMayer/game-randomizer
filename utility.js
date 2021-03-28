const random = array => array[Math.floor(Math.random() * array.length)]

/**
 * x ∪ y
 */
const union = (x, y) => [...new Set([...x, ...y])]
/**
 * x ∩ y
 */
const intersection = (x, y) => {
    if (x instanceof Array) { x = new Set(x) }
    if (y instanceof Array) { y = new Set(y) }

    return new Set([...x].filter(i => y.has(i)))
}

module.exports = {
    random,
    union,
    intersection
}
