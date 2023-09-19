import duration from '.'

describe('defaults', () => {
  test('called without arguments', () => {
    expect(duration()).toBe(0)
  })
})

describe('single inputs', () => {
  describe('called with single input values', () => {
    test('with {number} types - positive integers', () => {
      expect(duration(1)).toBe(1)
      expect(duration(10)).toBe(10)
      expect(duration(100)).toBe(100)
      expect(duration(1000)).toBe(1000)
    })

    test('with {number} types - negative integers', () => {
      expect(duration(-1)).toBe(-1)
      expect(duration(-10)).toBe(-10)
      expect(duration(-100)).toBe(-100)
      expect(duration(-1000)).toBe(-1000)
    })

    test('with {number} types - positive floats', () => {
      expect(duration(0.1)).toBe(0)
      expect(duration(0.4)).toBe(0)
      expect(duration(0.5)).toBe(1)
      expect(duration(0.9)).toBe(1)
      expect(duration(1.0)).toBe(1)
      expect(duration(1.4)).toBe(1)
      expect(duration(1.5)).toBe(2)
      expect(duration(1.6)).toBe(2)
      expect(duration(1.9)).toBe(2)
    })

    test('with {number} types - negative floats', () => {
      expect(duration(-0.1)).toBe(0)
      expect(duration(-0.4)).toBe(0)
      expect(duration(-0.5)).toBe(0)
      expect(duration(-0.9)).toBe(-1)
      expect(duration(-1.0)).toBe(-1)
      expect(duration(-1.4)).toBe(-1)
      expect(duration(-1.5)).toBe(-1)
      expect(duration(-1.6)).toBe(-2)
      expect(duration(-1.9)).toBe(-2)
    })

    test('with {string} types - whole units - without a time unit', () => {
      expect(duration('1')).toBe(1)
      expect(duration('10')).toBe(10)
      expect(duration('100')).toBe(100)
      expect(duration('1000')).toBe(1000)
      expect(duration('0')).toBe(0)
      expect(duration('-1000')).toBe(-1000)
      expect(duration('-100')).toBe(-100)
      expect(duration('-10')).toBe(-10)
      expect(duration('-1')).toBe(-1)
    })

    test('with {string} types - whole units - with various time units', () => {
      expect(duration('1ms')).toBe(1)
      expect(duration('10s')).toBe(10000)
      expect(duration('100m')).toBe(6000000)
      expect(duration('1000h')).toBe(3600000000)
      expect(duration('0d')).toBe(0)
      expect(duration('-1000w')).toBe(-604800000000)
    })

    test('with {string} types - decimal units - without a time unit', () => {
      expect(duration('1.1')).toBe(1)
      expect(duration('10.20')).toBe(10)
      expect(duration('100.300')).toBe(100)
      expect(duration('1000.4000')).toBe(1000)
      expect(duration('0.0')).toBe(0)
      expect(duration('-1000.9000')).toBe(-1001)
      expect(duration('-100.800')).toBe(-101)
      expect(duration('-10.70')).toBe(-11)
      expect(duration('-1.6')).toBe(-2)
    })

    test('with {string} types - decimal units - with various time units', () => {
      expect(duration('1.9ms')).toBe(2)
      expect(duration('10.88s')).toBe(10880)
      expect(duration('100.777m')).toBe(6046620)
      expect(duration('1000.6666h')).toBe(3602399760)
      expect(duration('0.0d')).toBe(0)
      expect(duration('-1000.5555w')).toBe(-605135966400)
    })

    test('with "milliseconds" time unit', () => {
      expect(duration('1000ms')).toBe(1000)
      expect(duration('1000msec')).toBe(1000)
      expect(duration('1000msecs')).toBe(1000)
      expect(duration('1000millisec')).toBe(1000)
      expect(duration('1000millisecond')).toBe(1000)
      expect(duration('1000milliseconds')).toBe(1000)
    })

    test('with "seconds" time unit', () => {
      expect(duration('1000s')).toBe(1000000)
      expect(duration('1000sec')).toBe(1000000)
      expect(duration('1000secs')).toBe(1000000)
      expect(duration('1000second')).toBe(1000000)
      expect(duration('1000seconds')).toBe(1000000)
    })

    test('with "minutes" time unit', () => {
      expect(duration('1000m')).toBe(60000000)
      expect(duration('1000mn')).toBe(60000000)
      expect(duration('1000min')).toBe(60000000)
      expect(duration('1000mins')).toBe(60000000)
      expect(duration('1000minute')).toBe(60000000)
      expect(duration('1000minutes')).toBe(60000000)
    })

    test('with "hours" time unit', () => {
      expect(duration('1000h')).toBe(3600000000)
      expect(duration('1000hr')).toBe(3600000000)
      expect(duration('1000hrs')).toBe(3600000000)
      expect(duration('1000hour')).toBe(3600000000)
      expect(duration('1000hours')).toBe(3600000000)
    })

    test('with "days" time unit', () => {
      expect(duration('1000d')).toBe(86400000000)
      expect(duration('1000dy')).toBe(86400000000)
      expect(duration('1000day')).toBe(86400000000)
      expect(duration('1000days')).toBe(86400000000)
    })

    test('with "weeks" time unit', () => {
      expect(duration('1000w')).toBe(604800000000)
      expect(duration('1000wk')).toBe(604800000000)
      expect(duration('1000wks')).toBe(604800000000)
      expect(duration('1000week')).toBe(604800000000)
      expect(duration('1000weeks')).toBe(604800000000)
    })

    test('units with whitespace (" ") spearators', () => {
      expect(duration('1 000 ms')).toBe(1000)
      expect(duration('1 000 000 ms')).toBe(1000000)
      expect(duration('1 000 000 000 ms')).toBe(1000000000)
      expect(duration('1 000.25 s')).toBe(1000250)
      expect(duration('1 000 000.50 s')).toBe(1000000500)
      expect(duration('1 000 000 000.75 s')).toBe(1000000000750)
      expect(duration('1 000.25 ms')).toBe(1000)
      expect(duration('1 000 000.50 ms')).toBe(1000001)
      expect(duration('1 000 000 000.75 ms')).toBe(1000000001)
      expect(duration('1 000.25 min')).toBe(60015000)
      expect(duration('1 000 000.50 min')).toBe(60000030000)
      expect(duration('1 000 000 000.75 min')).toBe(60000000045000)
    })

    test('units with underscore ("_") spearators', () => {
      expect(duration('1_000 ms')).toBe(1000)
      expect(duration('1_000_000 ms')).toBe(1000000)
      expect(duration('1_000_000_000 ms')).toBe(1000000000)
      expect(duration('1_000.25 s')).toBe(1000250)
      expect(duration('1_000_000.50 s')).toBe(1000000500)
      expect(duration('1_000_000_000.75 s')).toBe(1000000000750)
      expect(duration('1_000.25 ms')).toBe(1000)
      expect(duration('1_000_000.50 ms')).toBe(1000001)
      expect(duration('1_000_000_000.75 ms')).toBe(1000000001)
      expect(duration('1_000.25 min')).toBe(60015000)
      expect(duration('1_000_000.50 min')).toBe(60000030000)
      expect(duration('1_000_000_000.75 min')).toBe(60000000045000)
    })

    test('units with dash ("-") spearators', () => {
      expect(duration('1-000 ms')).toBe(1000)
      expect(duration('1-000-000 ms')).toBe(1000000)
      expect(duration('1-000-000-000 ms')).toBe(1000000000)
      expect(duration('1-000.25 s')).toBe(1000250)
      expect(duration('1-000-000.50 s')).toBe(1000000500)
      expect(duration('1-000-000-000.75 s')).toBe(1000000000750)
      expect(duration('1-000.25 ms')).toBe(1000)
      expect(duration('1-000-000.50 ms')).toBe(1000001)
      expect(duration('1-000-000-000.75 ms')).toBe(1000000001)
      expect(duration('1-000.25 min')).toBe(60015000)
      expect(duration('1-000-000.50 min')).toBe(60000030000)
      expect(duration('1-000-000-000.75 min')).toBe(60000000045000)
    })

    test('units with comma (",") spearators', () => {
      expect(duration('1,000 ms')).toBe(1000)
      expect(duration('1,000,000 ms')).toBe(1000000)
      expect(duration('1,000,000,000 ms')).toBe(1000000000)
      expect(duration('1,000.25 s')).toBe(1000250)
      expect(duration('1,000,000.50 s')).toBe(1000000500)
      expect(duration('1,000,000,000.75 s')).toBe(1000000000750)
      expect(duration('1,000.25 ms')).toBe(1000)
      expect(duration('1,000,000.50 ms')).toBe(1000001)
      expect(duration('1,000,000,000.75 ms')).toBe(1000000001)
      expect(duration('1,000.25 min')).toBe(60015000)
      expect(duration('1,000,000.50 min')).toBe(60000030000)
      expect(duration('1,000,000,000.75 min')).toBe(60000000045000)
    })

    test('with common, practical time units', () => {
      expect(duration('3.5d')).toBe(302400000)
      expect(duration('3.5day')).toBe(302400000)
      expect(duration('3.5days')).toBe(302400000)
      expect(duration('1.5h')).toBe(5400000)
      expect(duration('1.5hour')).toBe(5400000)
      expect(duration('1.5hours')).toBe(5400000)
      expect(duration('175m')).toBe(10500000)
      expect(duration('175min')).toBe(10500000)
      expect(duration('175minutes')).toBe(10500000)
      expect(duration('42s')).toBe(42000)
      expect(duration('42sec')).toBe(42000)
      expect(duration('42seconds')).toBe(42000)
      expect(duration('300ms')).toBe(300)
      expect(duration('300millisecond')).toBe(300)
      expect(duration('300milliseconds')).toBe(300)
    })
  })
})

describe('multiple inputs', () => {
  describe('called with multiple input values', () => {
    test('with same values - same units - whole numbers', () => {
      expect(duration('1ms 1ms')).toBe(2)
      expect(duration('10s 10s')).toBe(20000)
      expect(duration('100m 100m')).toBe(12000000)
      expect(duration('1000h 1000h')).toBe(7200000000)
      expect(duration('0d 0d')).toBe(0)
    })

    test('with same values - same units - decimal numbers', () => {
      expect(duration('1.9ms 1.9ms')).toBe(4)
      expect(duration('10.88s 10.88s')).toBe(21760)
      expect(duration('100.777m 100.777m')).toBe(12093240)
      expect(duration('1000.6666h 1000.6666h')).toBe(7204799520)
      expect(duration('0.0d 0.0d')).toBe(0)
    })

    test('with "milliseconds" time units', () => {
      expect(duration('1000ms 1000ms')).toBe(2000)
      expect(duration('1000msec 1000msec')).toBe(2000)
      expect(duration('1000msecs 1000msecs')).toBe(2000)
      expect(duration('1000millisec 1000millisec')).toBe(2000)
      expect(duration('1000millisecond 1000millisecond')).toBe(2000)
      expect(duration('1000milliseconds 1000milliseconds')).toBe(2000)
    })

    test('with "seconds" time units', () => {
      expect(duration('1000s 1000s')).toBe(2000000)
      expect(duration('1000sec 1000sec')).toBe(2000000)
      expect(duration('1000secs 1000secs')).toBe(2000000)
      expect(duration('1000second 1000second')).toBe(2000000)
      expect(duration('1000seconds 1000seconds')).toBe(2000000)
    })

    test('with "minutes" time units', () => {
      expect(duration('1000m 1000m')).toBe(120000000)
      expect(duration('1000mn 1000mn')).toBe(120000000)
      expect(duration('1000min 1000min')).toBe(120000000)
      expect(duration('1000mins 1000mins')).toBe(120000000)
      expect(duration('1000minute 1000minute')).toBe(120000000)
      expect(duration('1000minutes 1000minutes')).toBe(120000000)
    })

    test('with "hours" time units', () => {
      expect(duration('1000h 1000h')).toBe(7200000000)
      expect(duration('1000hr 1000hr')).toBe(7200000000)
      expect(duration('1000hrs 1000hrs')).toBe(7200000000)
      expect(duration('1000hour 1000hour')).toBe(7200000000)
      expect(duration('1000hours 1000hours')).toBe(7200000000)
    })

    test('with "days" time units', () => {
      expect(duration('1000d 1000d')).toBe(172800000000)
      expect(duration('1000dy 1000dy')).toBe(172800000000)
      expect(duration('1000day 1000day')).toBe(172800000000)
      expect(duration('1000days 1000days')).toBe(172800000000)
    })

    test('with "weeks" time units', () => {
      expect(duration('1000w 1000w')).toBe(1209600000000)
      expect(duration('1000wk 1000wk')).toBe(1209600000000)
      expect(duration('1000wks 1000wks')).toBe(1209600000000)
      expect(duration('1000week 1000week')).toBe(1209600000000)
      expect(duration('1000weeks 1000weeks')).toBe(1209600000000)
    })

    test('units with whitespace (" ") spearators', () => {
      expect(duration('1 000 ms 1 000 ms')).toBe(2000)
      expect(duration('1 000 000 ms 1 000 000 ms')).toBe(2000000)
      expect(duration('1 000 000 000 ms 1 000 000 000 ms')).toBe(2000000000)
      expect(duration('1 000.25 s 1 000.25 s')).toBe(2000500)
      expect(duration('1 000 000.50 s 1 000 000.50 s')).toBe(2000001000)
      expect(duration('1 000 000 000.75 s 1 000 000 000.75 s')).toBe(2000000001500)
      expect(duration('1 000.25 ms 1 000.25 ms')).toBe(2001)
      expect(duration('1 000 000.50 ms 1 000 000.50 ms')).toBe(2000001)
      expect(duration('1 000 000 000.75 ms 1 000 000 000.75 ms')).toBe(2000000002)
      expect(duration('1 000.25 min 1 000.25 min')).toBe(120030000)
      expect(duration('1 000 000.50 min 1 000 000.50 min')).toBe(120000060000)
      expect(duration('1 000 000 000.75 min 1 000 000 000.75 min')).toBe(120000000090000)
    })

    test('units with underscore ("_") spearators', () => {
      expect(duration('1_000 ms 1_000 ms')).toBe(2000)
      expect(duration('1_000_000 ms 1_000_000 ms')).toBe(2000000)
      expect(duration('1_000_000_000 ms 1_000_000_000 ms')).toBe(2000000000)
      expect(duration('1_000.25 s 1_000.25 s')).toBe(2000500)
      expect(duration('1_000_000.50 s 1_000_000.50 s')).toBe(2000001000)
      expect(duration('1_000_000_000.75 s 1_000_000_000.75 s')).toBe(2000000001500)
      expect(duration('1_000.25 ms 1_000.25 ms')).toBe(2001)
      expect(duration('1_000_000.50 ms 1_000_000.50 ms')).toBe(2000001)
      expect(duration('1_000_000_000.75 ms 1_000_000_000.75 ms')).toBe(2000000002)
      expect(duration('1_000.25 min 1_000.25 min')).toBe(120030000)
      expect(duration('1_000_000.50 min 1_000_000.50 min')).toBe(120000060000)
      expect(duration('1_000_000_000.75 min 1_000_000_000.75 min')).toBe(120000000090000)
    })

    test('units with dash ("-") spearators', () => {
      expect(duration('1-000 ms 1-000 ms')).toBe(2000)
      expect(duration('1-000-000 ms 1-000-000 ms')).toBe(2000000)
      expect(duration('1-000-000-000 ms 1-000-000-000 ms')).toBe(2000000000)
      expect(duration('1-000.25 s 1-000.25 s')).toBe(2000500)
      expect(duration('1-000-000.50 s 1-000-000.50 s')).toBe(2000001000)
      expect(duration('1-000-000-000.75 s 1-000-000-000.75 s')).toBe(2000000001500)
      expect(duration('1-000.25 ms 1-000.25 ms')).toBe(2001)
      expect(duration('1-000-000.50 ms 1-000-000.50 ms')).toBe(2000001)
      expect(duration('1-000-000-000.75 ms 1-000-000-000.75 ms')).toBe(2000000002)
      expect(duration('1-000.25 min 1-000.25 min')).toBe(120030000)
      expect(duration('1-000-000.50 min 1-000-000.50 min')).toBe(120000060000)
      expect(duration('1-000-000-000.75 min 1-000-000-000.75 min')).toBe(120000000090000)
    })

    test('units with comma (",") spearators', () => {
      expect(duration('1,000 ms 1,000 ms')).toBe(2000)
      expect(duration('1,000,000 ms 1,000,000 ms')).toBe(2000000)
      expect(duration('1,000,000,000 ms 1,000,000,000 ms')).toBe(2000000000)
      expect(duration('1,000.25 s 1,000.25 s')).toBe(2000500)
      expect(duration('1,000,000.50 s 1,000,000.50 s')).toBe(2000001000)
      expect(duration('1,000,000,000.75 s 1,000,000,000.75 s')).toBe(2000000001500)
      expect(duration('1,000.25 ms 1,000.25 ms')).toBe(2001)
      expect(duration('1,000,000.50 ms 1,000,000.50 ms')).toBe(2000001)
      expect(duration('1,000,000,000.75 ms 1,000,000,000.75 ms')).toBe(2000000002)
      expect(duration('1,000.25 min 1,000.25 min')).toBe(120030000)
      expect(duration('1,000,000.50 min 1,000,000.50 min')).toBe(120000060000)
      expect(duration('1,000,000,000.75 min 1,000,000,000.75 min')).toBe(120000000090000)
    })

    test('with common, practical time units', () => {
      expect(duration('1 week 2 days 3 hours 4 minutes 5 seconds 6 milliseconds')).toBe(788645006)
      expect(duration('2.5days 2hours 35minutes')).toBe(225300000)
      expect(duration('3.5day 5hour')).toBe(320400000)
      expect(duration('1.5h 15s')).toBe(5415000)
      expect(duration('175m 45s')).toBe(10545000)
      expect(duration('175min 25sec')).toBe(10525000)
      expect(duration('1h 3min 42sec')).toBe(3822000)
      expect(duration('5s 300ms')).toBe(5300)
    })
  })
})

describe('options', () => {
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
})

// TODO: fix createCustom
// describe('create custom', () => {
//   describe('create duration with predetermined custom arguments', () => {
//     test('with initially given defaults', () => {
//       expect(createCustom()()).toBe(0)
//       expect(createCustom([])()).toBe(0)
//       expect(createCustom({})()).toBe(0)
//       expect(createCustom(100)()).toBe(100)
//       expect(createCustom('100')()).toBe(100)
//       expect(createCustom('100ms')()).toBe(100)
//     })

//     test('the initially given default values, or the new ones', () => {
//       expect(createCustom(null, '1s')()).toBe(1000)
//       expect(createCustom(null, '1s')(1)).toBe(1)
//       expect(createCustom(null, '1s')('1')).toBe(1)
//       expect(createCustom(null, '1s')('1ms')).toBe(1)
//       expect(createCustom(null, '1s')('1s')).toBe(1000)
//     })

//     test('override the initially given arguments', () => {
//       expect(createCustom('1 min', { unit: 'ms' })()).toBe(60000)
//       expect(createCustom('1 min', { unit: 's' })()).toBe(60)
//       expect(createCustom('1 min', { unit: 'min' })()).toBe(1)
//       expect(createCustom('1 min', { unit: 'ms' })('1 min', { unit: 's' })).toBe(60)
//       expect(createCustom('1 h', { unit: 'ms' })('1 h', {})).toBe(3600000)
//       expect(createCustom('1 h', { unit: 'ms' })('1 h', { unit: 's' })).toBe(3600)
//     })

//     test('override the initially given options', () => {
//       expect(createCustom('1 s')(null, 1, { unit: 's' })).toBe(1)
//       expect(createCustom('1.5 s')(null, '1', { unit: 'min', round: false })).toBe(0.025)
//       expect(
//         createCustom('1.5 s', '1.5 s', { unit: 'ms', round: true })(null, '1', { unit: 'min', round: false }))
//         .toBe(0.025)
//     })

//     test('not override the initially given duration', () => {
//       expect(createCustom('1 s')(null, 2)).toBe(1000)
//       expect(createCustom('1 s')(null, '2')).toBe(1000)
//     })
//   })
// })

describe('edge cases', () => {
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
      // @ts-expect-error
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

  describe('called with mad arguments', () => {
    test('with 1ms and with whitespaces around the unit', () => {
      expect(duration(' 1ms')).toBe(1)
      expect(duration('1ms ')).toBe(1)
      expect(duration(' 1ms ')).toBe(1)
      expect(duration('   1ms')).toBe(1)
      expect(duration('1ms   ')).toBe(1)
      expect(duration('   1ms   ')).toBe(1)
      expect(duration('\t1ms')).toBe(1)
      expect(duration('1ms\t')).toBe(1)
      expect(duration('\t 1ms')).toBe(1)
      expect(duration('1ms \t')).toBe(1)
    })

    test('with 1s and with whitespaces around the unit', () => {
      expect(duration(' 1s')).toBe(1000)
      expect(duration('1s ')).toBe(1000)
      expect(duration(' 1s ')).toBe(1000)
      expect(duration('   1s')).toBe(1000)
      expect(duration('1s   ')).toBe(1000)
      expect(duration('   1s   ')).toBe(1000)
      expect(duration('\t1s')).toBe(1000)
      expect(duration('1s\t')).toBe(1000)
      expect(duration('\t 1s')).toBe(1000)
      expect(duration('1s \t')).toBe(1000)
    })

    test('with 1m and with whitespaces around the unit', () => {
      expect(duration(' 1m')).toBe(60000)
      expect(duration('1m ')).toBe(60000)
      expect(duration(' 1m ')).toBe(60000)
      expect(duration('   1m')).toBe(60000)
      expect(duration('1m   ')).toBe(60000)
      expect(duration('   1m   ')).toBe(60000)
      expect(duration('\t1m')).toBe(60000)
      expect(duration('1m\t')).toBe(60000)
      expect(duration('\t 1m')).toBe(60000)
      expect(duration('1m \t')).toBe(60000)
    })

    test('with 1h and with whitespaces around the unit', () => {
      expect(duration(' 1h')).toBe(3600000)
      expect(duration('1h ')).toBe(3600000)
      expect(duration(' 1h ')).toBe(3600000)
      expect(duration('   1h')).toBe(3600000)
      expect(duration('1h   ')).toBe(3600000)
      expect(duration('   1h   ')).toBe(3600000)
      expect(duration('\t1h')).toBe(3600000)
      expect(duration('1h\t')).toBe(3600000)
      expect(duration('\t 1h')).toBe(3600000)
      expect(duration('1h \t')).toBe(3600000)
    })

    test('with 1d and with whitespaces around the unit', () => {
      expect(duration(' 1d')).toBe(86400000)
      expect(duration('1d ')).toBe(86400000)
      expect(duration(' 1d ')).toBe(86400000)
      expect(duration('   1d')).toBe(86400000)
      expect(duration('1d   ')).toBe(86400000)
      expect(duration('   1d   ')).toBe(86400000)
      expect(duration('\t1d')).toBe(86400000)
      expect(duration('1d\t')).toBe(86400000)
      expect(duration('\t 1d')).toBe(86400000)
      expect(duration('1d \t')).toBe(86400000)
    })

    test('with 1w and with whitespaces around the unit', () => {
      expect(duration(' 1w')).toBe(604800000)
      expect(duration('1w ')).toBe(604800000)
      expect(duration(' 1w ')).toBe(604800000)
      expect(duration('   1w')).toBe(604800000)
      expect(duration('1w   ')).toBe(604800000)
      expect(duration('   1w   ')).toBe(604800000)
      expect(duration('\t1w')).toBe(604800000)
      expect(duration('1w\t')).toBe(604800000)
      expect(duration('\t 1w')).toBe(604800000)
      expect(duration('1w \t')).toBe(604800000)
    })

    test('with 1w and with whitespaces around the unit', () => {
      expect(duration(' 1w')).toBe(604800000)
      expect(duration('1w ')).toBe(604800000)
      expect(duration(' 1w ')).toBe(604800000)
      expect(duration('   1w')).toBe(604800000)
      expect(duration('1w   ')).toBe(604800000)
      expect(duration('   1w   ')).toBe(604800000)
      expect(duration('\t1w')).toBe(604800000)
      expect(duration('1w\t')).toBe(604800000)
      expect(duration('\t 1w')).toBe(604800000)
      expect(duration('1w \t')).toBe(604800000)
    })

    test('with the units in lower/upper/mixed case variants', () => {
      expect(duration('1Ms')).toBe(1)
      expect(duration('1mS')).toBe(1)
      expect(duration('1MS')).toBe(1)
      expect(duration('1Millisecond')).toBe(1)

      expect(duration('1S')).toBe(1000)
      expect(duration('1Second')).toBe(1000)

      expect(duration('1Min')).toBe(60000)
      expect(duration('1MIN')).toBe(60000)
      expect(duration('1Minute')).toBe(60000)

      expect(duration('1H')).toBe(3600000)
      expect(duration('1Hr')).toBe(3600000)
      expect(duration('1Hour')).toBe(3600000)

      expect(duration('1D')).toBe(86400000)
      expect(duration('1DAY')).toBe(86400000)
      expect(duration('1Day')).toBe(86400000)

      expect(duration('1w')).toBe(604800000)
      expect(duration('1Wk')).toBe(604800000)
      expect(duration('1WEEK')).toBe(604800000)
      expect(duration('1Week')).toBe(604800000)
    })

    test('with incorrect dots/fractional points', () => {
      expect(duration('..1s')).toBe(0)
      expect(duration('...1s')).toBe(0)
      expect(duration('...1.s')).toBe(0)
      expect(duration('...1..s')).toBe(0)
      expect(duration('...1...s')).toBe(0)
      expect(duration('..1.1..s')).toBe(0)
      expect(duration('...1.1...s')).toBe(0)
      expect(duration('..1..1..s')).toBe(0)
      expect(duration('...1...1...s')).toBe(0)

      expect(duration('.1.1.s')).toBe(100)
      expect(duration('.1..1.s')).toBe(100)
      expect(duration('.1...1.s')).toBe(100)
      expect(duration('1.s')).toBe(1000)
      expect(duration('1..s')).toBe(1000)
      expect(duration('1...s')).toBe(1000)
    })

    test('with same time units, but multiple times', () => {
      expect(duration('100ms 200ms')).toBe(300)
      expect(duration('500ms 400ms 300ms 200ms 100ms')).toBe(1500)
      expect(duration('1s 2sec 3secs 4second 5seconds')).toBe(15000)
      expect(duration('1.1h 2.2h 3.3h 4.4h 5.5h')).toBe(59400000)
      expect(duration('0.5d 1.0day 1.5day 2.0days')).toBe(432000000)
    })
  })
})
