// TODO: [idea] setError(`...`) - template string with auto-dedented and -denewlined
// TODO: [idea] default error type: any or extends Error ???
// TODO: [idea] implement default initial state with a default value
// TODO: [idea] implement default initial state with a default error
// TODO: [idea] add support for aggregating multiple errors
// TODO: [idea] add support with adapter for Rust-style result (Ok/Err)

export interface Result<T = any, E = any> {
  success: boolean
  error: E
  value: T
}

interface ResultCreatorShorthand<T, E> {
  (): Result<T, E>

  setSuccess: (result: T) => void
  setError: (error: E) => void
  withSuccess: (result: T) => Result<T, E>
  withError: (error: E) => Result<T, E>
  from: (result: Result<T, E>) => Result<T, E>
}

class ResultCreator<T = any, E = any> {
  private _success: boolean
  private _error?: E
  private _value?: T

  private _isInit: boolean

  public constructor () {
    this._success = false
    this._error = undefined
    this._value = undefined

    this._isInit = false

    this.setSuccess = this.setSuccess.bind(this)
    this.setError = this.setError.bind(this)
    this.getResult = this.getResult.bind(this)

    this.getResultWithSuccess = this.getResultWithSuccess.bind(this)
    this.getResultWithError = this.getResultWithError.bind(this)
    this.getResultFrom = this.getResultFrom.bind(this)

    const result: ResultCreatorShorthand<T, E> = () => this.getResult()

    result.setSuccess = this.setSuccess
    result.setError = this.setError
    result.withSuccess = this.getResultWithSuccess
    result.withError = this.getResultWithError
    result.from = this.getResultFrom

    this.result = result
  }

  public setSuccess (result: T): void {
    this._success = true
    this._error = undefined
    this._value = result

    this._isInit = true
  }

  public setError (error: E): void {
    this._success = false
    this._error = error
    this._value = undefined

    this._isInit = true
  }

  public getResult (): Result<T, E> {
    if (!this._isInit) {
      throw new Error('Result was never set, call setSuccess() or setError() first.')
    }

    const result: Result<T, E> = {
      success: this._success,
      error: this._error as any,
      value: this._value as any
    }

    return Object.freeze(result)
  }

  public getResultWithSuccess (result: T): Result<T, E> {
    this.setSuccess(result)
    return this.getResult()
  }

  public getResultWithError (error: E): Result<T, E> {
    this.setError(error)
    return this.getResult()
  }

  public getResultFrom (result: Result<T, E>): Result<T, E> {
    return result.success
      ? this.getResultWithSuccess(result.value)
      : this.getResultWithError(result.error)
  }

  result: ResultCreatorShorthand<T, E>
}

export function createResult<T = any, E = any> (): ResultCreator<T, E> {
  return new ResultCreator<T, E>()
}
