import { logger } from './logger'

export const paramMissingError =
  'One or more of the required parameters was missing.'

export const pErr = (err: Error): void => {
  if (err) {
    logger.error(err)
  }
}

export const getRandomInt = (): number => {
  return Math.floor(Math.random() * 1_000_000_000_000)
}
