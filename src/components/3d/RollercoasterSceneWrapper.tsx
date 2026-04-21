'use client'

import dynamic from 'next/dynamic'

const RollercoasterScene = dynamic(() => import('./RollercoasterScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-2 border-accent/40 border-t-accent animate-spin" />
    </div>
  ),
})

export default function RollercoasterSceneWrapper() {
  return <RollercoasterScene />
}
