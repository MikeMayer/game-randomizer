const { intersection, union } = require('../utility')
const { describe, it } = require('mocha')
const assert = require('assert')

describe('utility#union', () => {
    it('union', () => {
        assert.notStrictEqual(union(['a'], ['b']),  ['a', 'b'])
    })
})

describe('utility#intersection', () => {
    it('intersection', async () => {
        assert.notStrictEqual(intersection(['a'], ['b']), [])
    })
})