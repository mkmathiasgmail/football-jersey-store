import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import useProductsStore from '../store/productsStore'
import useCartStore from '../store/cartStore'

function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = useProductsStore((state) => state.getProductById(id))
  const addToCart = useCartStore((state) => state.addToCart)

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '')
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-center text-gray-600">Produit non trouvé</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      ...product,
      size: selectedSize,
      quantity
    })
    alert('Ajouté au panier avec succès!')
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    )
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-secondary hover:underline mb-8"
      >
        <ChevronLeft size={20} />
        Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Galerie d'images */}
        <div>
          <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`rounded overflow-hidden border-2 ${
                  currentImageIndex === index ? 'border-secondary' : 'border-gray-300'
                }`}
              >
                <img src={image} alt={`Aperçu ${index + 1}`} className="w-full h-20 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Détails produit */}
        <div>
          <div className="mb-4">
            <p className="text-gray-600 text-sm mb-1">Équipe: {product.team}</p>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-accent fill-accent" />
                ))}
              </div>
              <span className="text-gray-600">(127 avis)</span>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b-2">
            <span className="text-4xl font-bold text-secondary">${product.price}</span>
            <p className="text-gray-600 text-sm mt-2">Livraison gratuite pour les commandes > $50</p>
          </div>

          <div className="mb-6">
            <h3 className="font-bold text-lg mb-4">Description</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Sélection de taille */}
          <div className="mb-6">
            <label className="block font-bold mb-3">Sélectionnez votre taille</label>
            <div className="grid grid-cols-4 gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 rounded border-2 font-bold transition ${
                    selectedSize === size
                      ? 'border-secondary bg-secondary text-white'
                      : 'border-gray-300 hover:border-secondary'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantité */}
          <div className="mb-8">
            <label className="block font-bold mb-3">Quantité</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Boutons d'action */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-secondary text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition text-lg"
            >
              Ajouter au Panier
            </button>
            <button className="flex-1 border-2 border-secondary text-secondary py-3 rounded-lg font-bold hover:bg-gray-100 transition">
              ❤️ Favoris
            </button>
          </div>

          <div className="mt-8 pt-8 border-t-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-bold">✓ Produit Authentique</p>
                <p className="text-gray-600">Maillot officiel licencié</p>
              </div>
              <div>
                <p className="font-bold">✓ Retour 30 jours</p>
                <p className="text-gray-600">Remboursement garanti</p>
              </div>
              <div>
                <p className="font-bold">✓ Paiement Sécurisé</p>
                <p className="text-gray-600">SSL 256-bit crypté</p>
              </div>
              <div>
                <p className="font-bold">✓ Support 24/7</p>
                <p className="text-gray-600">Service client réactif</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
