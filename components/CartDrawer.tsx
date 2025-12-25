
import React from 'react';
// Fix: Added ShoppingCart to the imported icons from lucide-react
import { X, Trash2, Lock, CreditCard, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Button } from './ui/Button';
import { CartItem } from '../types';
import { createCheckoutSession } from '../services/api';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (index: number) => void;
  clearCart: () => void;
  onCheckoutComplete: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, removeFromCart, clearCart, onCheckoutComplete }) => {
  const [isCheckingOut, setIsCheckingOut] = React.useState(false);
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    
    // Simulate real stripe checkout experience
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsCheckingOut(false);
    onCheckoutComplete();
  };

  return (
    <div className={`fixed inset-0 z-[100] overflow-hidden transition-all duration-300 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <div 
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      
      <div className={`absolute inset-y-0 right-0 w-full md:max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900 italic">MI CARRITO</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 p-2 hover:bg-slate-100 rounded-full transition-all">
            <X size={28} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 flex flex-col items-center justify-center h-full opacity-40">
              <ShoppingCart size={64} className="mb-6" />
              <h3 className="text-xl font-bold">Tu carrito está vacío</h3>
              <p className="mt-2">Agrega un libro para comenzar.</p>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="flex gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in slide-in-from-right-4">
                <img src={item.image} alt={item.title} className="w-16 h-24 object-cover rounded shadow-lg" />
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight line-clamp-1">{item.title}</h4>
                    <span className="text-[10px] font-black text-brand-600 bg-brand-50 px-2 py-0.5 rounded mt-2 inline-block uppercase">{item.type}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-black text-slate-900">${item.price.toFixed(2)}</span>
                    <button 
                      onClick={() => removeFromCart(index)}
                      className="text-slate-400 hover:text-red-500 transition-colors"
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
          <div className="p-8 border-t border-slate-100 bg-slate-50 space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">Total a pagar</span>
              <span className="text-3xl font-black text-slate-900">${total.toFixed(2)} <span className="text-xs">USD</span></span>
            </div>
            
            <div className="space-y-4">
              <Button onClick={handleCheckout} isLoading={isCheckingOut} className="w-full py-5 text-lg font-black italic rounded-2xl shadow-2xl shadow-brand-600/30 uppercase">
                <CreditCard size={20} className="mr-3" /> Pagar ahora
              </Button>
              <div className="flex items-center justify-center gap-4 py-2 opacity-50">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-bold uppercase tracking-widest">Secure 256-bit SSL Payment</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
