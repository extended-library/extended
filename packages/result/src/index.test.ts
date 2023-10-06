import { createResult } from '.'

describe('@extended/result', () => {
  describe('basic usage', () => {
    test('basic usage - success', () => {
      const { setSuccess, getResult } = createResult<number>()

      setSuccess(1)

      const result = getResult()

      expect(result.success).toBeTrue()
      expect(result.error).toBeUndefined()
      expect(result.value).toBe(1)
    })

    test('basic usage - error', () => {
      const { setError, getResult } = createResult<number>()

      setError(new TypeError())

      const result = getResult()

      expect(result.success).toBeFalse()
      expect(result.error).toBeInstanceOf(TypeError)
      expect(result.value).toBeUndefined()
    })

    test('basic usage - result destructuring', () => {
      const { setSuccess, getResult } = createResult<string>()

      setSuccess('abc')

      const { success, error, value: result } = getResult()

      expect(success).toBeTrue()
      expect(error).toBeUndefined()
      expect(result).toBe('abc')
    })

    test('void result (Result<void>)', () => {
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      const { setSuccess, getResult } = createResult<void>()

      setSuccess()

      const result = getResult()

      expect(result.success).toBeTrue()
      expect(result.error).toBeUndefined()
      expect(result.value).toBeUndefined()
    })

    test('result from previous result', () => {
      const initialResult = createResult<number>()

      initialResult.setSuccess(42)

      const initial = initialResult.getResult()

      const { getResultFrom } = createResult<number>()

      const newResult = getResultFrom(initial)

      expect(newResult.success).toBeTrue()
      expect(newResult.error).toBeUndefined()
      expect(newResult.value).toBe(42)
    })
  })

  describe('shorthands', () => {
    test('basic shorthand - success', () => {
      const { getResultWithSuccess } = createResult<number>()

      const result = getResultWithSuccess(1)

      expect(result.success).toBeTrue()
      expect(result.error).toBeUndefined()
      expect(result.value).toBe(1)
    })

    test('basic shorthand - error', () => {
      const { getResultWithError } = createResult<number>()

      const result = getResultWithError(new TypeError())

      expect(result.success).toBeFalse()
      expect(result.error).toBeInstanceOf(TypeError)
      expect(result.value).toBeUndefined()
    })

    test('condensed shorthand - success', () => {
      const { result } = createResult<number>()

      const r = result.withSuccess(1)

      expect(r.success).toBeTrue()
      expect(r.error).toBeUndefined()
      expect(r.value).toBe(1)
    })

    test('condensed shorthand - error', () => {
      const { result } = createResult<number>()

      const r = result.withError(new TypeError())

      expect(r.success).toBeFalse()
      expect(r.error).toBeInstanceOf(TypeError)
      expect(r.value).toBeUndefined()
    })

    test('condensed shorthand - set first, get later', () => {
      const { result } = createResult<number>()

      result.setSuccess(1)

      const r = result()

      expect(r.success).toBeTrue()
      expect(r.error).toBeUndefined()
      expect(r.value).toBe(1)
    })

    test('condensed shorthand - result from previous result - success', () => {
      const initial = createResult<number>()

      const initialResult = initial.result.withSuccess(11)

      const { result } = createResult<number>()

      const newResult = result.from(initialResult)

      expect(newResult.success).toBeTrue()
      expect(newResult.error).toBeUndefined()
      expect(newResult.value).toBe(11)
    })

    test('condensed shorthand - result from previous result - error', () => {
      const initial = createResult<number>()

      const initialResult = initial.result.withError(new TypeError())

      const { result } = createResult<number>()

      const newResult = result.from(initialResult)

      expect(newResult.success).toBeFalse()
      expect(newResult.error).toBeInstanceOf(TypeError)
      expect(newResult.value).toBeUndefined()
    })
  })

  describe('errors', () => {
    test('result never set error', () => {
      const { getResult } = createResult()

      expect(() => getResult()).toThrowWithMessage(
        Error,
        'Result was never set, call setSuccess() or setError() first.'
      )
    })
  })
})
