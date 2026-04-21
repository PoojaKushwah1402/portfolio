'use client'

import dynamic from 'next/dynamic'

const RollercoasterScene = dynamic(
  () => import('./RollercoasterScene'),
  {
    ssr: false,
    loading: () => null,
  }
)

/**
 * Fixed full-viewport coaster that persists as the background
 * of the entire website. The cart progress is tied to page scroll
 * so it rides across the whole page as the user scrolls.
 */
export default function GlobalCoaster() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <RollercoasterScene />
    </div>
  )
}
