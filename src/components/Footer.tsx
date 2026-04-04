'use client'

export default function Footer() {
  return (
    <footer className="section-padding py-6 border-t border-border">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted text-xs">
        <span className="font-serif italic">pk</span>
        <span>&copy; {new Date().getFullYear()} — Built by hand</span>
      </div>
    </footer>
  )
}
