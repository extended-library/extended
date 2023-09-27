import Result from '.'

describe('@extended/types/Result', () => {
  test('basic usage - success', () => {
    const { setSuccess, getResult } = new Result<number>()

    setSuccess(1)

    const result = getResult()

    expect(result.success).toBeTrue()
    expect(result.error).toBeUndefined()
    expect(result.result).toBe(1)
  })

  test('basic usage - error', () => {
    const { setError, getResult } = new Result<number>()

    setError(new TypeError())

    const result = getResult()

    expect(result.success).toBeFalse()
    expect(result.error).toBeInstanceOf(TypeError)
    expect(result.result).toBeUndefined()
  })

  test('basic usage - result destructuring', () => {
    const { setSuccess, getResult } = new Result<string>()

    setSuccess('abc')

    const { success, error, result } = getResult()

    expect(success).toBeTrue()
    expect(error).toBeUndefined()
    expect(result).toBe('abc')
  })

  test('result never error', () => {
    const { getResult } = new Result()

    expect(() => getResult()).toThrowWithMessage(
      Error,
      'Result was never set, call setSuccess() or setError() first.'
    )
  })
})
