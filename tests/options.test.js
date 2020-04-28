import duration from '../src'

describe('called with custom options', () => {
  test('with default options - whole units', () => {
    expect(duration('1000ms')).toBe(1000)
    expect(duration('1000s')).toBe(1000000)
    expect(duration('1000m')).toBe(60000000)
    expect(duration('1000h')).toBe(3600000000)
    expect(duration('1000d')).toBe(86400000000)
    expect(duration('1000w')).toBe(604800000000)
  })

  test('with default options - decimal units', () => {
    expect(duration('1000.1ms')).toBe(1000)
    expect(duration('1000.4ms')).toBe(1000)
    expect(duration('1000.5ms')).toBe(1001)
    expect(duration('1000.6ms')).toBe(1001)
    expect(duration('1000.9ms')).toBe(1001)
    expect(duration('1000.0004s')).toBe(1000000)
    expect(duration('1000.0005s')).toBe(1000001)
    expect(duration('1000.0006s')).toBe(1000001)
  })

  test('with the "round" option set', () => {
    expect(duration('1000.1ms', { round: true })).toBe(1000)
    expect(duration('1000.4ms', { round: true })).toBe(1000)
    expect(duration('1000.5ms', { round: true })).toBe(1001)
    expect(duration('1000.6ms', { round: true })).toBe(1001)
    expect(duration('1000.9ms', { round: true })).toBe(1001)
    expect(duration('1000.0004s', { round: true })).toBe(1000000)
    expect(duration('1000.0005s', { round: true })).toBe(1000001)
    expect(duration('1000.0006s', { round: true })).toBe(1000001)

    expect(duration('100.1ms', { round: false })).toBe(100.1)
    expect(duration('100.4ms', { round: false })).toBe(100.4)
    expect(duration('100.5ms', { round: false })).toBe(100.5)
    expect(duration('100.6ms', { round: false })).toBe(100.6)
    expect(duration('100.9ms', { round: false })).toBe(100.9)
    expect(duration('100.0004s', { round: false })).toBe(100000.4)
    expect(duration('100.0005s', { round: false })).toBe(100000.5)
    expect(duration('100.0006s', { round: false })).toBe(100000.6)
  })

  test('with the "unit" option set to "ms"', () => {
    expect(duration('100.001ms', { unit: 'ms' })).toBe(100)
    expect(duration('100.004s', { unit: 'ms' })).toBe(100004)
    expect(duration('100.005m', { unit: 'ms' })).toBe(6000300)
    expect(duration('100.006h', { unit: 'ms' })).toBe(360021600)
    expect(duration('100.009d', { unit: 'ms' })).toBe(8640777600)
    expect(duration('100.0004w', { unit: 'ms' })).toBe(60480241920)
  })

  test('with the "unit" option set to "s"', () => {
    expect(duration('100.001ms', { unit: 's' })).toBe(0)
    expect(duration('100.004s', { unit: 's' })).toBe(100)
    expect(duration('100.005m', { unit: 's' })).toBe(6000)
    expect(duration('100.006h', { unit: 's' })).toBe(360022)
    expect(duration('100.009d', { unit: 's' })).toBe(8640778)
    expect(duration('100.0004w', { unit: 's' })).toBe(60480242)
  })

  test('with the "unit" option set to "m"', () => {
    expect(duration('100.001ms', { unit: 'm' })).toBe(0)
    expect(duration('100.004s', { unit: 'm' })).toBe(2)
    expect(duration('100.005m', { unit: 'm' })).toBe(100)
    expect(duration('100.006h', { unit: 'm' })).toBe(6000)
    expect(duration('100.009d', { unit: 'm' })).toBe(144013)
    expect(duration('100.0004w', { unit: 'm' })).toBe(1008004)
  })

  test('with the "unit" option set to "h"', () => {
    expect(duration('100.001ms', { unit: 'h' })).toBe(0)
    expect(duration('100.004s', { unit: 'h' })).toBe(0)
    expect(duration('100.005m', { unit: 'h' })).toBe(2)
    expect(duration('100.006h', { unit: 'h' })).toBe(100)
    expect(duration('100.009d', { unit: 'h' })).toBe(2400)
    expect(duration('100.0004w', { unit: 'h' })).toBe(16800)
  })

  test('with the "unit" option set to "d"', () => {
    expect(duration('100.001ms', { unit: 'd' })).toBe(0)
    expect(duration('100.004s', { unit: 'd' })).toBe(0)
    expect(duration('100.005m', { unit: 'd' })).toBe(0)
    expect(duration('100.006h', { unit: 'd' })).toBe(4)
    expect(duration('100.009d', { unit: 'd' })).toBe(100)
    expect(duration('100.0004w', { unit: 'd' })).toBe(700)
  })

  test('with the "unit" option set to "w"', () => {
    expect(duration('100.001ms', { unit: 'w' })).toBe(0)
    expect(duration('100.004s', { unit: 'w' })).toBe(0)
    expect(duration('100.005m', { unit: 'w' })).toBe(0)
    expect(duration('100.006h', { unit: 'w' })).toBe(1)
    expect(duration('100.009d', { unit: 'w' })).toBe(14)
    expect(duration('100.0004w', { unit: 'w' })).toBe(100)
  })

  test('with the "unit" option set to "ms" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 'ms', round: true })).toBe(100)
    expect(duration('100.004s', { unit: 'ms', round: true })).toBe(100004)
    expect(duration('100.005m', { unit: 'ms', round: true })).toBe(6000300)
    expect(duration('100.006h', { unit: 'ms', round: true })).toBe(360021600)
    expect(duration('100.009d', { unit: 'ms', round: true })).toBe(8640777600)
    expect(duration('100.0004w', { unit: 'ms', round: true })).toBe(60480241920)
  })

  test('with the "unit" option set to "s" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 's', round: true })).toBe(0)
    expect(duration('100.004s', { unit: 's', round: true })).toBe(100)
    expect(duration('100.005m', { unit: 's', round: true })).toBe(6000)
    expect(duration('100.006h', { unit: 's', round: true })).toBe(360022)
    expect(duration('100.009d', { unit: 's', round: true })).toBe(8640778)
    expect(duration('100.0004w', { unit: 's', round: true })).toBe(60480242)
  })

  test('with the "unit" option set to "m" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 'm', round: true })).toBe(0)
    expect(duration('100.004s', { unit: 'm', round: true })).toBe(2)
    expect(duration('100.005m', { unit: 'm', round: true })).toBe(100)
    expect(duration('100.006h', { unit: 'm', round: true })).toBe(6000)
    expect(duration('100.009d', { unit: 'm', round: true })).toBe(144013)
    expect(duration('100.0004w', { unit: 'm', round: true })).toBe(1008004)
  })

  test('with the "unit" option set to "h" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 'h', round: true })).toBe(0)
    expect(duration('100.004s', { unit: 'h', round: true })).toBe(0)
    expect(duration('100.005m', { unit: 'h', round: true })).toBe(2)
    expect(duration('100.006h', { unit: 'h', round: true })).toBe(100)
    expect(duration('100.009d', { unit: 'h', round: true })).toBe(2400)
    expect(duration('100.0004w', { unit: 'h', round: true })).toBe(16800)
  })

  test('with the "unit" option set to "d" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 'd', round: true })).toBe(0)
    expect(duration('100.004s', { unit: 'd', round: true })).toBe(0)
    expect(duration('100.005m', { unit: 'd', round: true })).toBe(0)
    expect(duration('100.006h', { unit: 'd', round: true })).toBe(4)
    expect(duration('100.009d', { unit: 'd', round: true })).toBe(100)
    expect(duration('100.0004w', { unit: 'd', round: true })).toBe(700)
  })

  test('with the "unit" option set to "w" with "round" set to "true"', () => {
    expect(duration('100.001ms', { unit: 'w', round: true })).toBe(0)
    expect(duration('100.004s', { unit: 'w', round: true })).toBe(0)
    expect(duration('100.005m', { unit: 'w', round: true })).toBe(0)
    expect(duration('100.006h', { unit: 'w', round: true })).toBe(1)
    expect(duration('100.009d', { unit: 'w', round: true })).toBe(14)
    expect(duration('100.0004w', { unit: 'w', round: true })).toBe(100)
  })

  test('with the "unit" option set to "ms" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 'ms', round: false })).toBe(100.001)
    expect(duration('100.004s', { unit: 'ms', round: false })).toBe(100004)
    expect(duration('100.005m', { unit: 'ms', round: false })).toBe(6000300)
    expect(duration('100.006h', { unit: 'ms', round: false })).toBe(360021600)
    expect(duration('100.009d', { unit: 'ms', round: false })).toBe(8640777600)
    expect(duration('100.0004w', { unit: 'ms', round: false })).toBe(60480241920)
  })

  test('with the "unit" option set to "s" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 's', round: false })).toBe(0.100001)
    expect(duration('100.004s', { unit: 's', round: false })).toBe(100.004)
    expect(duration('100.005m', { unit: 's', round: false })).toBe(6000.3)
    expect(duration('100.006h', { unit: 's', round: false })).toBe(360021.6)
    expect(duration('100.009d', { unit: 's', round: false })).toBe(8640777.6)
    expect(duration('100.0004w', { unit: 's', round: false })).toBe(60480241.92)
  })

  test('with the "unit" option set to "m" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 'm', round: false })).toBe(0.0016666833333333333)
    expect(duration('100.004s', { unit: 'm', round: false })).toBe(1.6667333333333334)
    expect(duration('100.005m', { unit: 'm', round: false })).toBe(100.005)
    expect(duration('100.006h', { unit: 'm', round: false })).toBe(6000.36)
    expect(duration('100.009d', { unit: 'm', round: false })).toBe(144012.96)
    expect(duration('100.0004w', { unit: 'm', round: false })).toBe(1008004.032)
  })

  test('with the "unit" option set to "h" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 'h', round: false })).toBe(0.000027778055555555555)
    expect(duration('100.004s', { unit: 'h', round: false })).toBe(0.027778888888888888)
    expect(duration('100.005m', { unit: 'h', round: false })).toBe(1.66675)
    expect(duration('100.006h', { unit: 'h', round: false })).toBe(100.006)
    expect(duration('100.009d', { unit: 'h', round: false })).toBe(2400.216)
    expect(duration('100.0004w', { unit: 'h', round: false })).toBe(16800.0672)
  })

  test('with the "unit" option set to "d" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 'd', round: false })).toBe(0.0000011574189814814815)
    expect(duration('100.004s', { unit: 'd', round: false })).toBe(0.0011574537037037037)
    expect(duration('100.005m', { unit: 'd', round: false })).toBe(0.06944791666666666)
    expect(duration('100.006h', { unit: 'd', round: false })).toBe(4.166916666666666)
    expect(duration('100.009d', { unit: 'd', round: false })).toBe(100.009)
    expect(duration('100.0004w', { unit: 'd', round: false })).toBe(700.0028)
  })

  test('with the "unit" option set to "w" with "round" set to "false"', () => {
    expect(duration('100.001ms', { unit: 'w', round: false })).toBe(1.653455687830688e-7)
    expect(duration('100.004s', { unit: 'w', round: false })).toBe(0.0001653505291005291)
    expect(duration('100.005m', { unit: 'w', round: false })).toBe(0.009921130952380952)
    expect(duration('100.006h', { unit: 'w', round: false })).toBe(0.5952738095238095)
    expect(duration('100.009d', { unit: 'w', round: false })).toBe(14.287)
    expect(duration('100.0004w', { unit: 'w', round: false })).toBe(100.0004)
  })
})
