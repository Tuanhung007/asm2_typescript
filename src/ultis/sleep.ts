const NUMBER = 1000
const sleep = (ms = NUMBER) => new Promise((resolve) => setTimeout(resolve, ms))

export default sleep
