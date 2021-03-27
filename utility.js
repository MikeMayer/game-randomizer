const random = array => array[Math.floor(Math.random() * array.length)]
const union = (x, y) => [...new Set([...x, ...y])]

module.exports = {
    random,
    union
}
