import { create } from 'zustand'

const initialProducts = [
  {
    id: 1,
    name: "Maillot RDC Léopards Domicile 2024",
    category: "national",
    type: "home",
    team: "RDC",
    price: 45.99,
    image: "https://via.placeholder.com/400x500?text=RDC+Home+2024",
    images: [
      "https://via.placeholder.com/400x500?text=RDC+Home+1",
      "https://via.placeholder.com/400x500?text=RDC+Home+2",
      "https://via.placeholder.com/400x500?text=RDC+Home+3"
    ],
    description: "Maillot officiel de l'équipe nationale des Léopards de la RDC pour les compétitions à domicile. Conçu avec les couleurs traditionnelles bleu et blanc.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    new: true
  },
  {
    id: 2,
    name: "Maillot RDC Léopards Extérieur 2024",
    category: "national",
    type: "away",
    team: "RDC",
    price: 45.99,
    image: "https://via.placeholder.com/400x500?text=RDC+Away+2024",
    images: [
      "https://via.placeholder.com/400x500?text=RDC+Away+1",
      "https://via.placeholder.com/400x500?text=RDC+Away+2",
      "https://via.placeholder.com/400x500?text=RDC+Away+3"
    ],
    description: "Maillot officiel de l'équipe nationale des Léopards pour les compétitions en déplacement. Couleur blanche avec détails bleus.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    new: true
  },
  {
    id: 3,
    name: "Manchester United Domicile 2024",
    category: "club",
    type: "home",
    team: "Manchester United",
    price: 89.99,
    image: "https://via.placeholder.com/400x500?text=Man+United+Home",
    images: [
      "https://via.placeholder.com/400x500?text=Man+United+Home+1",
      "https://via.placeholder.com/400x500?text=Man+United+Home+2",
      "https://via.placeholder.com/400x500?text=Man+United+Home+3"
    ],
    description: "Maillot domicile officiel Manchester United saison 2024/2025. Authentique et confortable pour les supporters.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: true,
    new: false
  },
  {
    id: 4,
    name: "FC Barcelona Domicile 2024",
    category: "club",
    type: "home",
    team: "Barcelona",
    price: 84.99,
    image: "https://via.placeholder.com/400x500?text=Barcelona+Home",
    images: [
      "https://via.placeholder.com/400x500?text=Barcelona+Home+1",
      "https://via.placeholder.com/400x500?text=Barcelona+Home+2",
      "https://via.placeholder.com/400x500?text=Barcelona+Home+3"
    ],
    description: "Maillot domicile FC Barcelona avec les traditionnelles rayures blaugranas. Qualité premium officielle.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
    new: false
  },
  {
    id: 5,
    name: "Real Madrid Domicile 2024",
    category: "club",
    type: "home",
    team: "Real Madrid",
    price: 89.99,
    image: "https://via.placeholder.com/400x500?text=Real+Madrid+Home",
    images: [
      "https://via.placeholder.com/400x500?text=Real+Madrid+Home+1",
      "https://via.placeholder.com/400x500?text=Real+Madrid+Home+2",
      "https://via.placeholder.com/400x500?text=Real+Madrid+Home+3"
    ],
    description: "Maillot blanc officiel Real Madrid. Inspiré par le prestige et la tradition du club le plus titré d'Europe.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    featured: false,
    new: true
  }
]

const useProductsStore = create((set) => ({
  products: initialProducts,
  addProduct: (product) => set((state) => ({
    products: [...state.products, { ...product, id: Date.now() }]
  })),
  updateProduct: (id, updatedProduct) => set((state) => ({
    products: state.products.map(product =>
      product.id === id ? { ...product, ...updatedProduct } : product
    )
  })),
  deleteProduct: (id) => set((state) => ({
    products: state.products.filter(product => product.id !== id)
  })),
  getProductById: (id) => {
    const state = useProductsStore.getState()
    return state.products.find(product => product.id === parseInt(id))
  },
  getProductsByCategory: (category) => {
    const state = useProductsStore.getState()
    return category ? state.products.filter(product => product.category === category) : state.products
  }
}))

export default useProductsStore
