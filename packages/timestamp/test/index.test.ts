import timestamp from '../src'

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
})
