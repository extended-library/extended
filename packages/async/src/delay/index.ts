import dur from '@extended/time/duration'

const delay = async (duration: number | string): Promise<void> => {
  return await new Promise(
    resolve =>
      setTimeout(
        resolve,
        dur(duration)
      )
  )
}

export default delay
