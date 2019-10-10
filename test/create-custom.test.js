import { createCustom } from '../src'

describe('create duration with predetermined custom arguments', () => {
  test('with initially given defaults', () => {
    expect(createCustom()()).toBe(0)
    expect(createCustom([])()).toBe(0)
    expect(createCustom({})()).toBe(0)
    expect(createCustom(100)()).toBe(100)
    expect(createCustom('100')()).toBe(100)
    expect(createCustom('100ms')()).toBe(100)
  })

  test('the initially given default values, or the new ones', () => {
    expect(createCustom(null, '1s')()).toBe(1000)
    expect(createCustom(null, '1s')(1)).toBe(1)
    expect(createCustom(null, '1s')('1')).toBe(1)
    expect(createCustom(null, '1s')('1ms')).toBe(1)
    expect(createCustom(null, '1s')('1s')).toBe(1000)
  })

  test('override the initially given arguments', () => {
    expect(createCustom('1 min', { unit: 'ms' })()).toBe(60000)
    expect(createCustom('1 min', { unit: 's' })()).toBe(60)
    expect(createCustom('1 min', { unit: 'min' })()).toBe(1)
    expect(createCustom('1 min', { unit: 'ms' })('1 min', { unit: 's' })).toBe(60)
    expect(createCustom('1 h', { unit: 'ms' })('1 h', {})).toBe(3600000)
    expect(createCustom('1 h', { unit: 'ms' })('1 h', { unit: 's' })).toBe(3600)
  })

  test('override the initially given options', () => {
    expect(createCustom('1 s')(null, 1, { unit: 's' })).toBe(1)
    expect(createCustom('1.5 s')(null, '1', { unit: 'min', round: false })).toBe(0.025)
    expect(
      createCustom('1.5 s', '1.5 s', { unit: 'ms', round: true })(null, '1', { unit: 'min', round: false }))
      .toBe(0.025)
  })

  test('not override the initially given duration', () => {
    expect(createCustom('1 s')(null, 2)).toBe(1000)
    expect(createCustom('1 s')(null, '2')).toBe(1000)
  })
})
