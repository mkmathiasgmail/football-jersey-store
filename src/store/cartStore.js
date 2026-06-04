import { create } from 'zustand'

const useCartStore = create((set) => ({
  items: [],
  addToCart: (product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id && item.size === product.size)
    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        )
      }
    }
    return { items: [...state.items, { ...product, quantity: product.quantity || 1 }] }
  }),
  removeFromCart: (productId, size) => set((state) => ({
    items: state.items.filter(item => !(item.id === productId && item.size === size))
  })),
  updateQuantity: (productId, size, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === productId && item.size === size
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
  })),
  clearCart: () => set({ items: [] }),
  getTotalItems: () => {
    const state = useCartStore.getState()
    return state.items.reduce((total, item) => total + item.quantity, 0)
  },
  getTotalPrice: () => {
    const state = useCartStore.getState()
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }
}))

export default useCartStore
