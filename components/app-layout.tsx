import { ReactNode, useEffect } from 'react'
import { useMiniKit } from '@coinbase/onchainkit/minikit'

export default function AppLayout({ children }: { children: ReactNode }) {
    
    const { setFrameReady } = useMiniKit()
    
    useEffect(() => {
        setFrameReady()
    }, [setFrameReady])

  return (
      <div>{children}</div>
  )
}
