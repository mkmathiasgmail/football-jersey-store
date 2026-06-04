function Footer() {
  return (
    <footer className="bg-primary text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">FootJerseys</h3>
            <p className="text-gray-400">Votre boutique officielle de maillots de football authentiques.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Catégories</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-secondary transition">Clubs</a></li>
              <li><a href="#" className="hover:text-secondary transition">Équipes Nationales</a></li>
              <li><a href="#" className="hover:text-secondary transition">Nouveautés</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Support</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-secondary transition">Contactez-nous</a></li>
              <li><a href="#" className="hover:text-secondary transition">FAQ</a></li>
              <li><a href="#" className="hover:text-secondary transition">Retours</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Légal</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-secondary transition">Conditions</a></li>
              <li><a href="#" className="hover:text-secondary transition">Confidentialité</a></li>
              <li><a href="#" className="hover:text-secondary transition">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 FootJerseys. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
