import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useCartStore from '../store/cartStore'

function Checkout() {
  const navigate = useNavigate()
  const { items, clearCart } = useCartStore()
  const totalPrice = useCartStore((state) => state.getTotalPrice())

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis'
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis'
    if (!formData.email.trim()) newErrors.email = 'L\'email est requis'
    if (!formData.phone.trim()) newErrors.phone = 'Le téléphone est requis'
    if (!formData.address.trim()) newErrors.address = 'L\'adresse est requise'
    if (!formData.city.trim()) newErrors.city = 'La ville est requise'
    if (!formData.postalCode.trim()) newErrors.postalCode = 'Le code postal est requis'
    if (!formData.country.trim()) newErrors.country = 'Le pays est requis'
    if (!formData.cardNumber.trim()) newErrors.cardNumber = 'Le numéro de carte est requis'
    if (!formData.expiryDate.trim()) newErrors.expiryDate = 'La date d\'expiration est requise'
    if (!formData.cvv.trim()) newErrors.cvv = 'Le CVV est requis'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length === 0) {
      // Simuler le traitement du paiement
      clearCart()
      navigate('/order-confirmation', {
        state: {
          orderData: formData,
          orderNumber: `ORD-${Date.now()}`,
          total: totalPrice
        }
      })
    } else {
      setErrors(newErrors)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Votre panier est vide. Retournez au catalogue.</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Paiement</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulaire */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations Personnelles */}
            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="font-bold text-xl mb-4">Informations Personnelles</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Prénom *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block font-bold mb-2">Nom *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">Téléphone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
              </div>
            </section>

            {/* Adresse de Livraison */}
            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="font-bold text-xl mb-4">Adresse de Livraison</h2>
              <div>
                <label className="block font-bold mb-2">Adresse *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-bold mb-2">Ville *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                  <label className="block font-bold mb-2">Code Postal *</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className={`w-full border rounded px-3 py-2 ${
                      errors.postalCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.postalCode && <p className="text-red-600 text-sm mt-1">{errors.postalCode}</p>}
                </div>
              </div>
              <div className="mt-4">
                <label className="block font-bold mb-2">Pays *</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className={`w-full border rounded px-3 py-2 ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
              </div>
            </section>

            {/* Informations de Paiement */}
            <section className="bg-white border border-gray-200 p-6 rounded-lg">
              <h2 className="font-bold text-xl mb-4">Informations de Paiement</h2>
              <div>
                <label className="block font-bold mb-2">Numéro de Carte *</label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  maxLength="19"
                  className={`w-full border rounded px-3 py-2 ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block font-bold mb-2">Date d\'Expiration *</label>
                  <input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    maxLength="5"
                    className={`w-full border rounded px-3 py-2 ${
                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>}
                </div>
                <div>
                  <label className="block font-bold mb-2">CVV *</label>
                  <input
                    type="text"
                    name="cvv"
                    placeholder="123"
                    value={formData.cvv}
                    onChange={handleChange}
                    maxLength="3"
                    className={`w-full border rounded px-3 py-2 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full bg-secondary text-white py-3 rounded-lg font-bold hover:bg-orange-700 transition text-lg"
            >
              Confirmer la Commande
            </button>
          </form>
        </div>

        {/* Résumé Commande */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-20">
            <h2 className="font-bold text-lg mb-4">Résumé de la Commande</h2>
            <div className="space-y-3 mb-4 pb-4 border-b-2">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Sous-total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Livraison</span>
                <span className="text-secondary">GRATUIT</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>${(totalPrice * 0.15).toFixed(2)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t-2">
              <span>Total</span>
              <span className="text-secondary">${(totalPrice * 1.15).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
