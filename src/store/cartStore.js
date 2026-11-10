import { create } from 'zustand'

const storageKey = 'assignment7-cart'

function readItems() {
  try {
    const items = JSON.parse(localStorage.getItem(storageKey))
    if (!Array.isArray(items)) return []

    return items.filter(item =>
      item &&
      Number.isInteger(item.id) &&
      typeof item.title === 'string' &&
      Number.isFinite(item.price) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
    )
  } catch {
    return []
  }
}

export const useCart = create((set) => ({
  items: readItems(),

  addItem: ({ id, title, price }) => set(({ items }) => {
    const existing = items.find(item => item.id === id)
    if (!existing) {
      return { items: [...items, { id, title, price, quantity: 1 }] }
    }

    return {
      items: items.map(item => item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item),
    }
  }),

  removeItem: id => set(({ items }) => ({
    items: items.filter(item => item.id !== id),
  })),

  setQuantity: (id, quantity) => set(({ items }) => ({
    items: quantity < 1
      ? items.filter(item => item.id !== id)
      : items.map(item => item.id === id ? { ...item, quantity } : item),
  })),

  clear: () => set({ items: [] }),
}))

useCart.subscribe(({ items }, previous) => {
  if (items === previous.items) return

  try {
    localStorage.setItem(storageKey, JSON.stringify(items))
  } catch {
    // The cart can still be used when storage is unavailable.
  }
})
