import React, { useState } from 'react';
import { X, CreditCard, QrCode, CheckCircle, Loader } from 'lucide-react';

interface PaymentBottomSheetProps {
  instructorName: string;
  price: number;
  onClose: () => void;
  onPaymentSuccess: () => void;
}

export const PaymentBottomSheet: React.FC<PaymentBottomSheetProps> = ({
  instructorName,
  price,
  onClose,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePayment = () => {
    if (!paymentMethod) return;

    setIsProcessing(true);

    // Simular processamento de pagamento (2 segundos)
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);

      // Aguardar 1.5s e chamar callback de sucesso
      setTimeout(() => {
        onPaymentSuccess();
      }, 1500);
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
        <div className="bg-white rounded-t-3xl w-full max-w-md p-8 animate-slide-up">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <CheckCircle className="text-green-600" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Pagamento Confirmado!
            </h3>
            <p className="text-gray-600 mb-1">
              Aula agendada com {instructorName}
            </p>
            <p className="text-sm text-gray-500">
              Redirecionando...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-800">Habilita Pay</h3>
            <p className="text-sm text-gray-500">Pagamento seguro e protegido</p>
          </div>
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Resumo do Pagamento */}
        <div className="bg-gradient-to-br from-brand-red to-red-700 rounded-3xl p-6 mb-6 text-white">
          <p className="text-sm opacity-90 mb-1">Aula com</p>
          <h4 className="text-xl font-bold mb-4">{instructorName}</h4>
          <div className="flex items-baseline">
            <span className="text-sm mr-1">R$</span>
            <span className="text-4xl font-bold">{price.toFixed(2)}</span>
          </div>
        </div>

        {/* Métodos de Pagamento */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Escolha o método de pagamento
          </label>
          <div className="space-y-3">
            <button
              onClick={() => setPaymentMethod('pix')}
              disabled={isProcessing}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
                paymentMethod === 'pix'
                  ? 'border-brand-red bg-red-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                paymentMethod === 'pix' ? 'bg-brand-red' : 'bg-gray-100'
              }`}>
                <QrCode size={24} className={paymentMethod === 'pix' ? 'text-white' : 'text-gray-600'} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Pix</p>
                <p className="text-xs text-gray-500">Aprovação instantânea</p>
              </div>
            </button>

            <button
              onClick={() => setPaymentMethod('card')}
              disabled={isProcessing}
              className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center space-x-4 ${
                paymentMethod === 'card'
                  ? 'border-brand-red bg-red-50'
                  : 'border-gray-300 bg-white hover:bg-gray-50'
              } disabled:opacity-50`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                paymentMethod === 'card' ? 'bg-brand-red' : 'bg-gray-100'
              }`}>
                <CreditCard size={24} className={paymentMethod === 'card' ? 'text-white' : 'text-gray-600'} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-800">Cartão de Crédito</p>
                <p className="text-xs text-gray-500">Em até 3x sem juros</p>
              </div>
            </button>
          </div>
        </div>

        {/* Informação de Segurança */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-3 mb-6">
          <p className="text-xs text-blue-800 text-center">
            🔒 Pagamentos protegidos pela <strong>Lei 1.020/2025</strong>
          </p>
        </div>

        {/* Botão de Pagamento */}
        <button
          onClick={handlePayment}
          disabled={!paymentMethod || isProcessing}
          className={`w-full py-4 rounded-3xl font-bold text-lg transition-all shadow-lg ${
            paymentMethod && !isProcessing
              ? 'bg-brand-red text-white hover:bg-red-700 active:scale-98'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center space-x-2">
              <Loader className="animate-spin" size={20} />
              <span>Processando...</span>
            </span>
          ) : (
            `Pagar R$ ${price.toFixed(2)}`
          )}
        </button>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};
