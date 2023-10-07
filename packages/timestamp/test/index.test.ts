import { DateTime } from 'luxon'

import timestamp from '../src'

const localDate = DateTime.now()

describe('@extended/timestamp', () => {
  test('default timestamp (YYYY-MM-DDTHH:mm:ss:ms+##:##)', () => {
    expect(timestamp()).toMatch(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/
    )
  })

  describe('presets', () => {
    test('default preset (YYY-MM-DDTHH:mm:ss:ms+oh:om)', () => {
      expect(timestamp()).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/
      )
    })

    test('LOG preset (YYY-MM-DDTHH:mm:ss:ms+oh:om)', () => {
      expect(timestamp('LOG')).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}[+-]\d{2}:\d{2}$/
      )
    })

    test('LOG-SHORT preset (YYY-MM-DDTHH:mm:ss)', () => {
      expect(timestamp('LOG-SHORT')).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/
      )
    })

    test('FILE preset (YYY-MM-DDTHH-mm-ss-ms+oh-om)', () => {
      expect(timestamp('FILE')).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}-\d{3}[+-]\d{2}-\d{2}$/
      )
    })

    test('FILE-SHORT preset (YYY-MM-DDTHH-mm-ss)', () => {
      expect(timestamp('FILE-SHORT')).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}-\d{2}-\d{2}$/
      )
    })
  })

  describe('formatting', () => {
    describe('single patterns', () => {
      test('year (YYYY)', () => {
        expect(timestamp('YYYY')).toBe(localDate.toFormat('yyyy'))
      })

      test('month (MM)', () => {
        expect(timestamp('MM')).toBe(localDate.toFormat('MM'))
      })

      test('day (DD)', () => {
        expect(timestamp('DD')).toBe(localDate.toFormat('dd'))
      })

      test('hours (HH)', () => {
        expect(timestamp('HH')).toBe(localDate.toFormat('HH'))
      })

      test('minutes (mm)', () => {
        expect(timestamp('mm')).toBe(localDate.toFormat('mm'))
      })

      test('seconds (ss)', () => {
        expect(timestamp('ss')).toBe(localDate.toFormat('ss'))
      })

      test('milliseconds (ms)', () => {
        expect(timestamp('ms')).toMatch(/^\d{3}$/)
      })
    })

    describe('multiple patterns', () => {
      test('year-month-day (YYYY-MM-DD)', () => {
        expect(timestamp('YYYY-MM-DD')).toBe(localDate.toFormat('yyyy-MM-dd'))
      })
    })
  })

  describe('UTC timestamp', () => {
    test('x', () => {
      console.log(timestamp.UTCTimestamp())
      // expect(timestamp.UTCTimestamp())
    })
  })
})
