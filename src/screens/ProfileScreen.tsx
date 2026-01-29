import React from 'react';
import { User, FileText, Car, LogOut, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const ProfileScreen: React.FC = () => {
  const { userData, resetApp } = useApp();
  const isStudent = userData.userType === 'student';

  const handleLogout = () => {
    if (confirm('Deseja realmente sair?')) {
      resetApp();
    }
  };

  return (
    <Layout title="Perfil" showBackButton={false}>
      <div className="p-4">
        {/* Header do Perfil */}
        <div className="card text-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full 
                        flex items-center justify-center mx-auto mb-4">
            <User size={48} className="text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">
            {isStudent ? 'Aluno' : 'Instrutor'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isStudent ? 'Categoria ' + userData.studentData?.category : userData.instructorData?.car.model}
          </p>
        </div>

        {/* Informações */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Informações
          </h3>

          {isStudent ? (
            <div className="space-y-2">
              <div className="card">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Documentos</p>
                    <p className="text-sm text-gray-600">RG: {userData.studentData?.documents?.rg}</p>
                    <p className="text-sm text-gray-600">CPF: {userData.studentData?.documents?.cpf}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-3">
                  <Car size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Categoria</p>
                    <p className="text-sm text-gray-600">
                      {userData.studentData?.category} - {userData.studentData?.transmission === 'manual' ? 'Manual' : 'Automático'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="card">
                <div className="flex items-center gap-3">
                  <FileText size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Credenciais</p>
                    <p className="text-sm text-gray-600">Credencial: {userData.instructorData?.credentials.credencial}</p>
                    <p className="text-sm text-gray-600">EAR: {userData.instructorData?.credentials.ear}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center gap-3">
                  <Car size={20} className="text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-800">Veículo</p>
                    <p className="text-sm text-gray-600">
                      {userData.instructorData?.car.model} ({userData.instructorData?.car.year})
                    </p>
                    <p className="text-sm text-gray-600">Placa: {userData.instructorData?.car.plate}</p>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">Valor por Aula</p>
                    <p className="text-sm text-gray-600">Preço definido</p>
                  </div>
                  <p className="text-2xl font-bold text-primary-600">
                    R$ {userData.instructorData?.price}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Configurações */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
            Configurações
          </h3>
          
          <div className="space-y-2">
            <button className="card w-full flex items-center gap-3 active:bg-gray-50">
              <Settings size={20} className="text-gray-600" />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">Configurações</p>
                <p className="text-sm text-gray-600">Preferências do aplicativo</p>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="card w-full flex items-center gap-3 active:bg-red-50"
            >
              <LogOut size={20} className="text-red-600" />
              <div className="flex-1 text-left">
                <p className="font-medium text-red-600">Sair</p>
                <p className="text-sm text-gray-600">Desconectar da conta</p>
              </div>
            </button>
          </div>
        </div>

        {/* Versão */}
        <div className="text-center text-sm text-gray-500 mt-8">
          <p>Habilita v1.0.0</p>
          <p className="mt-1">© 2026 - Todos os direitos reservados</p>
        </div>
      </div>
    </Layout>
  );
};
