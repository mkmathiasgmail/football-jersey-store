import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus } from 'lucide-react'
import useCartStore from '../store/cartStore'

function Cart() {
  const { items, removeFromCart, updateQuantity } = useCartStore()
  const totalPrice = useCartStore((state) => state.getTotalPrice())
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Votre Panier</h1>
        <p className="text-gray-600 text-lg mb-8">Votre panier est vide</p>
        <Link
          to="/catalog"
          className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
        >
          Continuer les achats
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Produits */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            {items.map((item) => (
              <div
                key={`${item.id}-${item.size}`}
                className="flex gap-4 p-6 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded"
                />

                <div className="flex-grow">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">Taille: {item.size}</p>
                  <p className="font-bold text-secondary">${item.price}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="font-bold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                      className="bg-gray-200 p-1 rounded hover:bg-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Sous-total</p>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Récapitulatif */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
            <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>

            <div className="space-y-3 mb-4 pb-4 border-b-2">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total ({totalItems} articles)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="text-secondary font-bold">GRATUIT</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes estimées</span>
                <span>${(totalPrice * 0.15).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl mb-6 pb-6 border-b-2">
              <span>Total</span>
              <span className="text-secondary">${(totalPrice * 1.15).toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-secondary text-white text-center py-3 rounded-lg font-bold hover:bg-orange-700 transition mb-3"
            >
              Procéder au Paiement
            </Link>
            <Link
              to="/catalog"
              className="block w-full border-2 border-secondary text-secondary text-center py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
