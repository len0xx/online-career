import { derived, readable, writable } from 'svelte/store'

export const formEndpoint = readable('')

export const modal = writable<{ open: () => void; close: () => void }>(undefined)

export const mobileMenu = writable<{ open: () => void; close: () => void }>(undefined)

export const commonHeaderState = writable(false)

export const isMobile = writable(false)

export const modalOpened = writable(false)

export const sectionPadding = derived(isMobile, ($isMobile) => ($isMobile ? 2.5 : 3.75))

export const phoneMask = readable({ mask: '+{7} (000) 000-00-00' })
