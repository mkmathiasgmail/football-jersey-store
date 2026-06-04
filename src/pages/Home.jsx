import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import useProductsStore from '../store/productsStore'

function Home() {
  const products = useProductsStore((state) => state.products)
  const featuredProducts = products.filter(p => p.featured).slice(0, 4)
  const newProducts = products.filter(p => p.new).slice(0, 4)
  const nationalTeams = products.filter(p => p.category === 'national').slice(0, 4)

  return (
    <div>
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Portez les Couleurs</h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">Authentiques maillots de football pour tous les fans</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/catalog"
              className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Voir les Clubs
            </Link>
            <Link
              to="/national-teams"
              className="bg-accent text-primary px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition"
            >
              Léopards & Sélections
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Équipes Nationales Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Équipes Nationales</h2>
            <Link to="/national-teams" className="text-secondary hover:underline font-bold">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nationalTeams.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Produits Vedettes */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Produits Vedettes</h2>
            <Link to="/catalog" className="text-secondary hover:underline font-bold">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Nouveautés */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Nouveautés</h2>
            <Link to="/catalog" className="text-secondary hover:underline font-bold">
              Voir tout →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
