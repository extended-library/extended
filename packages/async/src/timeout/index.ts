import duration from '@extended/time/duration'

interface Timeout {
  (duration: number | string): Promise<void>
  (duration: number | string, callback: Callback): Promise<void>
  (callback: Callback, duration: number | string): Promise<void>
}

type Callback = () => void

const timeout: Timeout = async (arg1?: any, arg2?: any) => {
  // act as a simple delay function, when called with only a duration ------------------------------
  if (typeof arg1 !== 'undefined' && typeof arg2 === 'undefined') {
    if (typeof arg1 !== 'number' || typeof arg1 !== 'string') {
      throw new TypeError(
        `timeout(<duration>) - duration must be a number or a string, got: "${typeof arg1}".`
      )
    }

    return await new Promise(
      resolve => {
        setTimeout(
          resolve,
          duration(arg1)
        )
      })
  }
  // -----------------------------------------------------------------------------------------------

  // let dur: number | string
  // let cb: any

  // if (typeof arg1 !== 'undefined') {
  //   if (typeof arg1 === 'number' || typeof arg1 === 'string') {
  //     dur = arg1
  //   } else if (typeof arg1 === 'function') {
  //     cb = arg1
  //   }

  //   // if () {

  //   // }
  // }

  return await new Promise(
    resolve => {
      setTimeout(
        () => {
          resolve()
        },
        1000
      )
    })
}

export default timeout
