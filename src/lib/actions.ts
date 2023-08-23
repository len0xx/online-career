let intersectionObserver: IntersectionObserver

const ensureIntersectionObserver = () => {
    if (intersectionObserver) return

    intersectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                const eventName = entry.isIntersecting ? 'enterViewport' : 'leaveViewport'
                entry.target.dispatchEvent(new CustomEvent(eventName))
            })
        }
    )
}

export default function viewport(element: HTMLElement) {
    ensureIntersectionObserver()

    intersectionObserver.observe(element)

    return {
        destroy() {
            intersectionObserver.unobserve(element)
        }
    }
}

export const clickOutside = (element: Element, callbackFunction: () => void) => {
    function onClick(event: Event) {
        if (!element.contains(event.target as Node)) {
            callbackFunction()
        }
    }

    document.body.addEventListener('click', onClick)

    return {
        update(newCallbackFunction: () => void) {
            callbackFunction = newCallbackFunction
        },
        destroy() {
            document.body.removeEventListener('click', onClick)
        }
    }
}