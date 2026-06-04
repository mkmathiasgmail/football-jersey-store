import { useState } from 'react'
import { Edit2, Trash2, Plus } from 'lucide-react'
import useProductsStore from '../store/productsStore'

function AdminPanel() {
  const { products, addProduct, updateProduct, deleteProduct } = useProductsStore()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    team: '',
    category: 'club',
    type: 'home',
    price: '',
    description: '',
    image: '',
    featured: false,
    new: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      updateProduct(editingId, {
        ...formData,
        price: parseFloat(formData.price),
        images: [formData.image, formData.image, formData.image]
      })
      setEditingId(null)
    } else {
      addProduct({
        ...formData,
        price: parseFloat(formData.price),
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        images: [formData.image, formData.image, formData.image]
      })
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      name: '',
      team: '',
      category: 'club',
      type: 'home',
      price: '',
      description: '',
      image: '',
      featured: false,
      new: false
    })
    setShowForm(false)
  }

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      team: product.team,
      category: product.category,
      type: product.type,
      price: product.price.toString(),
      description: product.description,
      image: product.image,
      featured: product.featured,
      new: product.new
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Gestion des Produits</h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-secondary text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700 transition flex items-center gap-2"
          >
            <Plus size={20} />
            Ajouter un Maillot
          </button>
        )}
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
          <h2 className="font-bold text-2xl mb-6">
            {editingId ? 'Modifier le Maillot' : 'Ajouter un Nouveau Maillot'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-bold mb-2">Nom du Maillot *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
              <div>
                <label className="block font-bold mb-2">Équipe/Club *</label>
                <input
                  type="text"
                  name="team"
                  value={formData.team}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block font-bold mb-2">Catégorie</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="club">Club</option>
                  <option value="national">Équipe Nationale</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="home">Domicile</option>
                  <option value="away">Extérieur</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Prix *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2">URL de l\'Image *</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div>
              <label className="block font-bold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                />
                <span className="font-bold">Produit Vedette</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="new"
                  checked={formData.new}
                  onChange={handleInputChange}
                />
                <span className="font-bold">Nouveau Produit</span>
              </label>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
              >
                {editingId ? 'Mettre à Jour' : 'Ajouter le Maillot'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-bold hover:bg-gray-400 transition"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Liste des produits */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2">
              <tr>
                <th className="px-6 py-3 text-left font-bold">Maillot</th>
                <th className="px-6 py-3 text-left font-bold">Équipe</th>
                <th className="px-6 py-3 text-left font-bold">Catégorie</th>
                <th className="px-6 py-3 text-left font-bold">Prix</th>
                <th className="px-6 py-3 text-left font-bold">Statut</th>
                <th className="px-6 py-3 text-left font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-b hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="font-bold">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.team}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-white text-sm font-bold ${
                      product.category === 'national' ? 'bg-secondary' : 'bg-primary'
                    }`}>
                      {product.category === 'national' ? 'National' : 'Club'}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold">${product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {product.featured && <span className="bg-accent text-primary px-2 py-1 rounded text-xs font-bold">Vedette</span>}
                      {product.new && <span className="bg-secondary text-white px-2 py-1 rounded text-xs font-bold">Nouveau</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-100 text-gray-600 font-bold">
          Total: {products.length} maillot(s)
        </div>
      </div>
    </div>
  )
}

export default AdminPanel
