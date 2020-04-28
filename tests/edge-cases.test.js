import duration from '../src'

describe('called with invalid/unusable arguments', () => {
  test('without default option', () => {
    expect(duration(undefined)).toBe(0)
    expect(duration(null)).toBe(0)
    expect(duration(NaN)).toBe(0)

    expect(duration(true)).toBe(0)
    expect(duration(false)).toBe(0)

    expect(duration(Number.NaN)).toBe(0)
    expect(duration(Number.NEGATIVE_INFINITY)).toBe(0)
    expect(duration(Number.POSITIVE_INFINITY)).toBe(0)

    expect(duration([])).toBe(0)
    expect(duration({})).toBe(0)
  })

  test('with default options', () => {
    expect(duration(undefined, 1000)).toBe(1000)
    expect(duration(null, '1000')).toBe(1000)
    expect(duration(NaN, '1000ms')).toBe(1000)
  })

  test('with invalid default options', () => {
    expect(duration(undefined, undefined)).toBe(0)
    expect(duration(null, null)).toBe(0)
    expect(duration(NaN, NaN)).toBe(0)
  })

  test('with empty string arguments', () => {
    expect(duration('')).toBe(0)
    expect(duration(' ')).toBe(0)
    expect(duration('\t')).toBe(0)
    expect(duration('\t ')).toBe(0)
    expect(duration('   ')).toBe(0)
  })

  test('with unusable string arguments', () => {
    expect(duration('x')).toBe(0)
    expect(duration(' #')).toBe(0)
    expect(duration('# ')).toBe(0)
    expect(duration(' io ')).toBe(0)
  })

  test('with 0 and with an invalid unit', () => {
    expect(duration(0, { unit: 'kg' })).toBe(0)
    expect(duration('0', { unit: 'cm' })).toBe(0)
    expect(duration('0ms', { unit: 't' })).toBe(0)
  })

  test('with a unit as input, which is not available', () => {
    expect(duration('1 kg')).toBe(0)
    expect(duration('50 cm')).toBe(0)
    expect(duration('12 parsecs')).toBe(0)
    expect(duration('215 pounds')).toBe(0)
  })

  test('with a return unit, which is not available', () => {
    expect(duration('1 sec', { unit: 'kg' })).toBe(0)
    expect(duration('50 min', { unit: 'cm' })).toBe(0)
    expect(duration('12 hours', { unit: 'parsec' })).toBe(0)
    expect(duration('2 weeks', { unit: 'pound' })).toBe(0)
  })
})
