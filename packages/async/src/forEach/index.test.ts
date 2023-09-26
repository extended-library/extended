import asyncForEach from '.'
import delay from '../delay'

describe('async/forEach', () => {
  test('basic usage', async () => {
    const data = [1, 2, 3]
    const result: number[][] = []

    let time = Date.now()

    await asyncForEach(data, async (value, index) => {
      await delay(750)
      result.push([index, value * 2])
    })

    time = Date.now() - time

    expect(time).toBeWithin(2000, 2500)
    expect(result).toEqual([
      [0, 2],
      [1, 4],
      [2, 6]
    ])
  })
})
