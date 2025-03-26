const devices = {
  xmobile: 375,
  mobile: 425,
  tablet: 768,
  laptop: 1023,
  xlaptop: 1440,
}

export const media = {
  xmobile: `(max-width: ${devices.xmobile}px)`,
  mobile: `(max-width: ${devices.mobile}px)`,
  tablet: `(max-width: ${devices.tablet}px)`,
  laptop: `(max-width: ${devices.laptop}px)`,
  xlaptop: `(max-width: ${devices.xlaptop}px)`,
  xxlaptop: `(min-width: ${devices.xlaptop}px)`,
}
