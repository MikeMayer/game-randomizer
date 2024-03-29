import { GameRandomizer, GameRandomizerOptions } from '../index.js'
import { describe, it } from 'mocha'
import assert from 'assert'
import { Console } from '../model/console.js'
import { Emulator } from '../model/emulator.js'

const buildTestHarnessRandomizer = () => {
    const gameRandomizer = new GameRandomizer()

    gameRandomizer.consoles = [
        new Console('A', [], '', ['a']),
        new Console('B', [], '', ['b']),
        new Console('C', [], '', ['c']),
        new Console('D', [], '', ['d']),
        new Console('E', [], '', ['e']),
        new Console('F', [], '', ['f'])
    ]

    gameRandomizer.consoles.forEach(console => {
        console.gamePaths.add('Game A'),
        console.gamePaths.add('Game B'),
        console.gamePaths.add('Game C')
    })

    gameRandomizer.emulators = [
        new Emulator('Emulator A', '', '', ['a', 'b', 'f']),
        new Emulator('Emulator B', '', '', ['c', 'd', 'e'])
    ]

    return gameRandomizer
}

describe('GameRandomizer#pickRandomGame()', () => {
    it('picks a game', async () => {
        const gameRandomizer = buildTestHarnessRandomizer()
        const randomGame = await gameRandomizer.pickRandomGame()

        assert(randomGame != null)
    })

    it('picks a game, one console', async () => {
        const gameRandomizer = buildTestHarnessRandomizer()
        // @ts-ignore
        gameRandomizer.consoles = [gameRandomizer.consoles.pop()]

        assert(gameRandomizer.consoles.length === 1)

        const randomGame = await gameRandomizer.pickRandomGame()

        assert(randomGame != null)
    })

    it('picks a specific console', async () => {
        const gameRandomizer = buildTestHarnessRandomizer()
        const randomGame = await gameRandomizer.pickRandomGame(new GameRandomizerOptions('f'))

        assert(randomGame != null)
        assert(randomGame.console.name === 'F')
    })
})