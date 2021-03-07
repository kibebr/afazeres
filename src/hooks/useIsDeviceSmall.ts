import { useMediaQuery } from 'react-responsive'

export const useIsDeviceSmall = () => useMediaQuery({
  query: '(max-width: 768px)'
})
