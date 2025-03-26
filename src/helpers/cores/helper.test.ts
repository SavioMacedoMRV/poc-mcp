import {hexToRgba} from './helper'

describe('hexToRgba', () => {
  test('DEVE converter a cor hexadecimal para RGBA com alfa 0.5', () => {
    const hexColor = '#FF0000'
    const alpha = 0.5
    const rgbaColor = hexToRgba(hexColor, alpha)
    expect(rgbaColor).toBe('rgba(255, 0, 0, 0.5)')
  })

  test('DEVE converter a cor hexadecimal para RGBA com alfa 1', () => {
    const hexColor = '#00FF00'
    const alpha = 1
    const rgbaColor = hexToRgba(hexColor, alpha)
    expect(rgbaColor).toBe('rgba(0, 255, 0, 1)')
  })
})
