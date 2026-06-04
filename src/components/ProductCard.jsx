import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import useCartStore from '../store/cartStore'

function ProductCard({ product }) {
  const addToCart = useCartStore((state) => state.addToCart)

  const handleQuickAdd = () => {
    addToCart({
      ...product,
      size: product.sizes[0],
      quantity: 1
    })
    alert('Ajouté au panier!')
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-gray-200 h-64">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          {product.new && (
            <div className="absolute top-2 right-2 bg-secondary text-white px-2 py-1 rounded text-xs font-bold">
              Nouveau
            </div>
          )}
          {product.featured && (
            <div className="absolute top-2 left-2 bg-accent text-primary px-2 py-1 rounded text-xs font-bold">
              Vedette
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="text-sm text-gray-600 mb-1">{product.team}</div>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 mb-2 hover:text-secondary transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-secondary">${product.price}</span>
          <button
            onClick={handleQuickAdd}
            className="bg-primary text-white p-2 rounded hover:bg-secondary transition"
            title="Ajouter au panier"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
