import React from 'react';
import { X, Trash2, Lock, CreditCard } from 'lucide-react';
import { Button } from './ui/Button';
import { CartItem } from '../types';
import { createCheckoutSession } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  clearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, removeFromCart, clearCart }) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    // Call simulated backend
    const session = await createCheckoutSession(cart);
    
    setIsCheckingOut(false);
    if (session) {
        alert("Redirecting to Stripe Checkout...\n(This is a demo)");
        clearCart();
        onClose();
    }
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 w-full md:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            Tu Carrito <span className="text-sm font-normal text-slate-500">({cart.length} items)</span>
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-200 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-12 flex flex-col items-center justify-center h-full">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
                <Lock size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-slate-500 mb-8 max-w-xs">Parece que aún no has agregado ningún libro a tu colección.</p>
              <Button variant="ghost" className="border border-slate-200" onClick={onClose}>Explorar Catálogo</Button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-4 p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md transition-shadow animate-in slide-in-from-right-4">
                <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded-md shadow-sm" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-2 leading-tight">{item.title}</h4>
                    <span className="text-xs text-slate-500 capitalize mt-1 inline-block bg-slate-100 px-2 py-0.5 rounded">{item.type}</span>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="text-brand-600 font-bold text-lg">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-slate-400 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-2xl font-black text-slate-900">${total.toFixed(2)} USD</span>
            </div>
            
            <div className="space-y-3 pt-2">
              <Button onClick={handleCheckout} isLoading={isCheckingOut} className="w-full py-4 text-lg rounded-xl shadow-xl shadow-brand-500/20">
                <span className="flex-1 text-center">Checkout Seguro</span>
              </Button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
                <Lock size={12} />
                <span>Transacción encriptada 256-bit SSL</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};