import React from 'react';
import { Users, DollarSign, Calendar, TrendingUp, Wallet } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const InstructorHomeScreen: React.FC = () => {
  const { userData, setCurrentScreen } = useApp();
  const instructorData = userData.instructorData;

  return (
    <Layout title="Início" showBackButton={false}>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Olá, Instrutor!</h2>
          <p className="text-gray-600">Aqui está um resumo do seu dia</p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <Users size={24} className="mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Alunos Ativos</p>
          </div>

          <button
            onClick={() => setCurrentScreen('instructor-financial')}
            className="card bg-gradient-to-br from-green-500 to-green-600 text-white text-left active:scale-95 transition-all"
          >
            <DollarSign size={24} className="mb-2" />
            <p className="text-2xl font-bold">R$ 1.250</p>
            <p className="text-sm opacity-90 flex items-center">
              <Wallet size={14} className="mr-1" />
              Financeiro
            </p>
          </button>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <Calendar size={24} className="mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Aulas Hoje</p>
          </div>

          <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <TrendingUp size={24} className="mb-2" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm opacity-90">Avaliações</p>
          </div>
        </div>

        {/* Informações do Cadastro */}
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Suas Informações</h3>
          
          <div className="card mb-3">
            <h4 className="font-medium text-gray-700 mb-2">Veículo</h4>
            <p className="text-lg text-gray-900">{instructorData?.car.model}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>Ano: {instructorData?.car.year}</span>
              <span>Placa: {instructorData?.car.plate}</span>
            </div>
            <div className="mt-2">
              <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-medium">
                Categoria {instructorData?.car.category} - {instructorData?.car.transmission === 'manual' ? 'Manual' : 'Automático'}
              </span>
            </div>
          </div>

          <div className="card">
            <h4 className="font-medium text-gray-700 mb-2">Valor por Aula</h4>
            <p className="text-2xl font-bold text-primary-600">R$ {instructorData?.price}</p>
          </div>
        </div>

        {/* Próximas Aulas */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-3">Próximas Aulas</h3>
          <div className="card text-center py-8">
            <Calendar size={48} className="mx-auto text-gray-400 mb-3" />
            <p className="text-gray-600">Nenhuma aula agendada hoje</p>
            <p className="text-sm text-gray-500 mt-1">
              Suas aulas aparecerão aqui
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};
