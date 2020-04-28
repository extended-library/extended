import duration from '../src'

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
