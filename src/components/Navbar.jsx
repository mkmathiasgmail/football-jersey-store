import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart } from 'lucide-react'
import useCartStore from '../store/cartStore'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const totalItems = useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  )

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-lg">
              ⚽
            </div>
            <span className="text-xl font-bold hidden sm:inline">FootJerseys</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/catalog" className="hover:text-secondary transition">
              Clubs
            </Link>
            <Link to="/national-teams" className="hover:text-secondary transition">
              Équipes Nationales
            </Link>
            <Link to="/admin" className="text-sm hover:text-secondary transition">
              Admin
            </Link>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative flex items-center gap-2 hover:text-secondary transition">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
            <span className="hidden sm:inline">Panier</span>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-700">
            <Link
              to="/catalog"
              className="block py-2 hover:text-secondary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Clubs
            </Link>
            <Link
              to="/national-teams"
              className="block py-2 hover:text-secondary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Équipes Nationales
            </Link>
            <Link
              to="/admin"
              className="block py-2 text-sm hover:text-secondary transition"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
