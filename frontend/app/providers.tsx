'use client'

import type { ReactNode } from 'react'
import { PxlKitSurfaceProvider } from '@pxlkit/ui-kit'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <PxlKitSurfaceProvider surface="pixel">
      {children}
    </PxlKitSurfaceProvider>
  )
}