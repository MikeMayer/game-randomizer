import { intersection, union } from '../utility.js'
import { describe, it } from 'mocha'
import { notStrictEqual } from 'assert'

describe('utility#', () => {
    it('union', () => {
        notStrictEqual(union(['a'], ['b']),  ['a', 'b'])
    })
    it('intersection', async () => {
        notStrictEqual(intersection(['a'], ['b']), [])
    })
})
