import { useLocation, Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

function OrderConfirmation() {
  const location = useLocation()
  const { orderData, orderNumber, total } = location.state || {}

  if (!orderData) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Aucune commande trouvée.</p>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center mb-8">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-green-700 mb-2">Commande Confirmée!</h1>
        <p className="text-green-600 text-lg">Merci pour votre achat</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b-2">
          <div>
            <p className="text-gray-600 text-sm mb-1">Numéro de Commande</p>
            <p className="font-bold text-2xl text-secondary">{orderNumber}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Date de Commande</p>
            <p className="font-bold text-lg">{new Date().toLocaleDateString('fr-FR')}</p>
          </div>
        </div>

        <h2 className="font-bold text-lg mb-4">Informations de Livraison</h2>
        <div className="bg-gray-50 p-4 rounded mb-8">
          <p className="font-bold">{orderData.firstName} {orderData.lastName}</p>
          <p className="text-gray-600">{orderData.address}</p>
          <p className="text-gray-600">{orderData.postalCode} {orderData.city}</p>
          <p className="text-gray-600">{orderData.country}</p>
          <p className="text-gray-600 mt-2">Email: {orderData.email}</p>
          <p className="text-gray-600">Téléphone: {orderData.phone}</p>
        </div>

        <h2 className="font-bold text-lg mb-4">Récapitulatif</h2>
        <div className="flex justify-between font-bold text-lg text-secondary">
          <span>Total payé</span>
          <span>${(total * 1.15).toFixed(2)}</span>
        </div>
      </div>

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <p className="text-blue-800">
          <strong>📧 Confirmez votre email:</strong> Un email de confirmation a été envoyé à {orderData.email}
        </p>
      </div>

      <div className="text-center space-y-4">
        <p className="text-gray-600 text-lg">Vous recevrez bientôt les informations de suivi de votre commande par email.</p>
        <Link
          to="/"
          className="inline-block bg-secondary text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-700 transition"
        >
          Retour à l\'Accueil
        </Link>
      </div>
    </div>
  )
}

export default OrderConfirmation
