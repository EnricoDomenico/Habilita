import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { DollarSign, TrendingUp, Clock, CheckCircle, ArrowUpRight, Shield } from 'lucide-react';

interface Transaction {
  id: number;
  studentName: string;
  amount: number;
  date: Date;
  status: 'paid' | 'pending';
}

export const InstructorFinancialScreen: React.FC = () => {
  const { userData } = useApp();
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Dados simulados
  const balance = 1250.00;
  const pendingBalance = 340.00;
  const totalEarnings = 4580.00;

  const transactions: Transaction[] = [
    {
      id: 1,
      studentName: 'Maria Silva',
      amount: 85.00,
      date: new Date(2026, 0, 28),
      status: 'paid',
    },
    {
      id: 2,
      studentName: 'João Pedro',
      amount: 85.00,
      date: new Date(2026, 0, 27),
      status: 'paid',
    },
    {
      id: 3,
      studentName: 'Ana Costa',
      amount: 85.00,
      date: new Date(2026, 0, 26),
      status: 'pending',
    },
    {
      id: 4,
      studentName: 'Carlos Eduardo',
      amount: 85.00,
      date: new Date(2026, 0, 25),
      status: 'paid',
    },
    {
      id: 5,
      studentName: 'Fernanda Lima',
      amount: 85.00,
      date: new Date(2026, 0, 24),
      status: 'paid',
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleTransfer = () => {
    setShowTransferModal(true);
    // Simular transferência
    setTimeout(() => {
      setShowTransferModal(false);
      alert('Transferência realizada com sucesso!');
    }, 2000);
  };

  return (
    <Layout title="Financeiro" showBackButton>
      <div className="p-6">
        {/* Saldo Total */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-green-700 text-white mb-6 shadow-material-lg">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm opacity-90 mb-1">Saldo Disponível</p>
                <div className="flex items-baseline">
                  <span className="text-sm mr-1">R$</span>
                  <span className="text-4xl font-bold">{balance.toFixed(2)}</span>
                </div>
              </div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <DollarSign size={32} />
              </div>
            </div>
            
            <button
              onClick={handleTransfer}
              className="w-full bg-white text-green-700 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
            >
              <ArrowUpRight size={20} />
              <span>Transferir para Banco</span>
            </button>
          </div>
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        </div>

        {/* Cards de Resumo */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-material">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="text-yellow-600" size={20} />
              <span className="text-xs text-gray-600">Pendente</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">R$ {pendingBalance.toFixed(2)}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-material">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="text-blue-600" size={20} />
              <span className="text-xs text-gray-600">Total Ganho</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">R$ {totalEarnings.toFixed(2)}</p>
          </div>
        </div>

        {/* Informação de Segurança */}
        <div className="bg-blue-50 border border-blue-200 rounded-3xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="text-sm font-semibold text-blue-900 mb-1">
                Pagamentos Protegidos
              </p>
              <p className="text-xs text-blue-800">
                Todas as transações são garantidas pela <strong>Lei 1.020/2025</strong> de proteção ao instrutor autônomo.
              </p>
            </div>
          </div>
        </div>

        {/* Histórico de Aulas Pagas */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Histórico de Aulas</h3>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white rounded-2xl p-4 shadow-material flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.status === 'paid' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    {transaction.status === 'paid' ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <Clock className="text-yellow-600" size={20} />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {transaction.studentName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    + R$ {transaction.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {transaction.status === 'paid' ? 'Pago' : 'Pendente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Transferência */}
      {showTransferModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl p-8 m-4 max-w-sm w-full text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 animate-pulse">
              <ArrowUpRight className="text-green-600" size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Processando Transferência
            </h3>
            <p className="text-gray-600">
              Enviando R$ {balance.toFixed(2)} para sua conta bancária...
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </Layout>
  );
};
