type ObserverCallback = () => void

const callbacks = new Map<Element, ObserverCallback>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  if (sharedObserver || typeof IntersectionObserver === "undefined") return sharedObserver

  sharedObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const callback = callbacks.get(entry.target)
      if (!callback) return

      callbacks.delete(entry.target)
      sharedObserver?.unobserve(entry.target)
      callback()
    })

    if (callbacks.size === 0) {
      sharedObserver?.disconnect()
      sharedObserver = null
    }
  }, { rootMargin: "100px 0px", threshold: 0.12 })

  return sharedObserver
}

/** Share one one-shot observer across GSAP reveals and counters. */
export function observeOnce(element: Element, callback: ObserverCallback) {
  const observer = getObserver()
  if (!observer) return () => undefined

  callbacks.set(element, callback)
  observer.observe(element)

  return () => {
    callbacks.delete(element)
    sharedObserver?.unobserve(element)
    if (callbacks.size === 0) {
      sharedObserver?.disconnect()
      sharedObserver = null
    }
  }
}
