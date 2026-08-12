import { useEffect, useRef, useCallback } from 'react'

export function useScrollReveal() {
  const ref = useRef(null)

  const observe = useCallback(() => {
    if (!ref.current) return
    const els = ref.current.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const cleanup = observe()
    return cleanup
  }, [observe])

  return ref
}
