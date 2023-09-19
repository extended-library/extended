// TODO: add smart attempt management callback (like below)
/*
type Callback<T> = (
  $: {
    numMaxCalls?:        number
    initialDelay?:       number | string
    delayAfterEachCall?: number | string

    numCurrentCall: number

    delay: (duration: number | string) => Promise<void>
    next:  (delayBeforeNextCall?: number | string) => void
    done:  (delayAfterCallingDone?: number | string) => void
  }
) => T
*/

import duration from '@extended/time/duration'
import delay from '../delay'

type Callback<T> = () => Promise<T>

interface Options {
  /**
   * @default 5
   */
  numRetries?: number

  /**
   * @default 0
   */
  initialDelay?: number | string

  /**
   * @default 100
   */
  delayAfterEachTry?: number | string
}

const _delay = async (delay: number): Promise<void> => {
  return await new Promise(
    resolve => setTimeout(
      resolve,
      delay
    )
  )
}

const _call = async (operation: any, retries: number, delay: number): Promise<unknown> => {
  return await new Promise((resolve, reject) => {
    return operation()
      .then(resolve)
      .catch(async (error: any) => {
        if (retries > 0) {
          return await _delay(delay)
            .then(_call.bind(null, operation, retries - 1, delay))
            .then(resolve)
            .catch(reject)
        }

        return reject(error)
      })
  })
}

async function attempt<T = unknown> (callback: Callback<T>, options?: Options): Promise<T>
async function attempt<T = unknown> (options: Options, callback: Callback<T>): Promise<T>

async function attempt<T = unknown> (arg1: any, arg2?: any): Promise<T> {
  let callback: Callback<T>

  if (typeof arg1 === 'function') {
    callback = arg1
  } else if (typeof arg2 === 'function') {
    callback = arg2
  } else {
    throw new Error('1st or 2nd argument must be a function.')
  }

  let options: Options

  if (typeof arg1 === 'object' && arg1 !== null) {
    options = arg1
  } else if (typeof arg2 === 'object' && arg2 !== null) {
    options = arg2
  } else {
    options = {}
  }

  if ('initialDelay' in options) {
    await delay(options.initialDelay as any)
  }

  return _call(
    callback,
    options.numRetries ?? 5,
    duration(options.delayAfterEachTry ?? 100)
  ) as unknown as T
}

export default attempt
