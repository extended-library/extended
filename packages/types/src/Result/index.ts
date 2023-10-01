export interface Result<T = unknown, E = unknown> {
  success: boolean
  error: E
  result: T
}

class ResultCreator<T = unknown, E = unknown> {
  private _success: boolean
  private _error?: E
  private _result?: T
  private _isInit: boolean

  public constructor () {
    this._success = false
    this._error = undefined
    this._result = undefined

    this._isInit = false

    this.setSuccess = this.setSuccess.bind(this)
    this.setError = this.setError.bind(this)
    this.getResult = this.getResult.bind(this)
    this.getResultWithSuccess = this.getResultWithSuccess.bind(this)
    this.getResultWithError = this.getResultWithError.bind(this)
  }

  public setSuccess (result: T): void {
    this._success = true
    this._error = undefined
    this._result = result

    this._isInit = true
  }

  public setError (error: E): void {
    this._success = false
    this._error = error
    this._result = undefined

    this._isInit = true
  }

  public getResult (): Result<T, E> {
    if (!this._isInit) {
      throw new Error('Result was never set, call setSuccess() or setError() first.')
    }

    const result: Result<T, E> = {
      success: this._success,
      error: this._error as any,
      result: this._result as any
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
}

export function createResult<T = unknown, E = unknown> (): ResultCreator<T, E> {
  return new ResultCreator<T, E>()
}
