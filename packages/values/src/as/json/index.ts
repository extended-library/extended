interface Options {
  fallback?: any
}

export default function asJSON (value: any, options?: Options): any {
  try {
    return JSON.parse(value)
  } catch (error) {
    if (options != null) {
      if ('fallback' in options) {
        return options.fallback
      }
    }

    return null
  }
}
