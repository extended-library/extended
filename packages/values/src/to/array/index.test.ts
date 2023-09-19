import toArray from '.'

describe('toArray', () => {
  test('basics', () => {
    expect(toArray).toBeFunction()
  })

  test('empty, undefined, null', () => {
    expect(toArray()).toEqual([])
    expect(toArray(undefined)).toEqual([])
    expect(toArray(null)).toEqual([])
  })

  test('non-arrays', () => {
    expect(toArray(123)).toEqual([123])
    expect(toArray('abc')).toEqual(['abc'])
    expect(toArray(true)).toEqual([true])

    expect(toArray(
      { a: 1, b: '2', c: true }
    )).toEqual(
      [{ a: 1, b: '2', c: true }]
    )
  })

  test('arrays', () => {
    expect(toArray([])).toEqual([])
    expect(toArray([1])).toEqual([1])
    expect(toArray(['a'])).toEqual(['a'])
    expect(toArray([true])).toEqual([true])

    expect(toArray([1, '2', true])).toEqual([1, '2', true])
  })

  test('typed arrays', () => {
    expect(toArray(new Int8Array(
      [1, 2, 3]
    ))).toEqual(
      [1, 2, 3]
    )

    expect(toArray(new Uint8Array(
      [11, 22, 33]
    ))).toEqual(
      [11, 22, 33]
    )

    expect(toArray(new Float32Array(
      [1.25, 2.5, 3.75]
    ))).toEqual(
      [1.25, 2.5, 3.75]
    )
  })

  test('function arguments', () => {
    (function (...rest) {
      expect(toArray(arguments)).toEqual([1, '2', true])
    })(1, '2', true)
  })

  test('maps', () => {
    expect(toArray(new Map(
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]
    ))).toEqual(
      [
        [1, 'a'],
        [2, 'b'],
        [3, 'c']
      ]
    )
  })

  test('sets', () => {
    expect(toArray(new Set(
      [1, '2', true]
    ))).toEqual(
      [1, '2', true]
    )
  })
})
