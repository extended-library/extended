import asyncMap from '.'
import delay from '../delay'

describe('async/map', () => {
  test('basic usage', async () => {
    const data = [1, 2, 3]

    let time = Date.now()

    const mapped = await asyncMap(data, async (value, index) => {
      await delay(750)
      return [index, value * 2]
    })

    time = Date.now() - time

    expect(time).toBeWithin(2000, 2500)
    expect(mapped).toEqual([
      [0, 2],
      [1, 4],
      [2, 6]
    ])
  })
})
