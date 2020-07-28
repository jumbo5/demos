export const formatTime = (time?: number) =>
  typeof time === 'number'
    ? `${Math.trunc(time / 60)}:${`0${Math.trunc(time) % 60}`.slice(-2)}`
    : 0
