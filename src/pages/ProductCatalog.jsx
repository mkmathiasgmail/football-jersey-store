import { useState, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import useProductsStore from '../store/productsStore'

function ProductCatalog({ filter = null }) {
  const products = useProductsStore((state) => state.products)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [minPrice, setMinPrice] = useState(0)
  const [maxPrice, setMaxPrice] = useState(200)

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by category (national teams)
    if (filter === 'national') {
      result = result.filter(p => p.category === 'national')
    } else if (filter === 'club') {
      result = result.filter(p => p.category === 'club')
    }

    // Filter by team
    if (selectedTeam) {
      result = result.filter(p => p.team === selectedTeam)
    }

    // Filter by type (home/away)
    if (selectedType) {
      result = result.filter(p => p.type === selectedType)
    }

    // Filter by price
    result = result.filter(p => p.price >= minPrice && p.price <= maxPrice)

    return result
  }, [products, filter, selectedTeam, selectedType, minPrice, maxPrice])

  const teams = [...new Set(products.map(p => p.team))]
  const types = ['home', 'away']

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">
        {filter === 'national' ? 'Équipes Nationales' : 'Catalogue de Maillots'}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filtres */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
            <h3 className="font-bold text-lg mb-6">Filtres</h3>

            {/* Équipes */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Équipe</label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Toutes les équipes</option>
                {teams.map(team => (
                  <option key={team} value={team}>{team}</option>
                ))}
              </select>
            </div>

            {/* Type */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Catégorie</label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">Tous</option>
                <option value="home">Domicile</option>
                <option value="away">Extérieur</option>
              </select>
            </div>

            {/* Prix */}
            <div className="mb-6">
              <label className="block font-bold mb-2">Prix</label>
              <div className="space-y-2">
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={minPrice}
                  onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="Min"
                />
                <input
                  type="number"
                  min="0"
                  max="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                  placeholder="Max"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">${minPrice} - ${maxPrice}</p>
            </div>

            <button
              onClick={() => {
                setSelectedTeam('')
                setSelectedType('')
                setMinPrice(0)
                setMaxPrice(200)
              }}
              className="w-full bg-primary text-white py-2 rounded hover:bg-secondary transition"
            >
              Réinitialiser Filtres
            </button>
          </div>
        </div>

        {/* Produits */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Aucun produit ne correspond à vos critères</p>
            </div>
          ) : (
            <div>
              <p className="text-gray-600 mb-6">{filteredProducts.length} produit(s) trouvé(s)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCatalog
