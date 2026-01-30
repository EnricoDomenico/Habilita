import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const InstructorCredentialsScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState({
    credencial: userData.instructorData?.credentials.credencial || '',
    ear: userData.instructorData?.credentials.ear || '',
    cnh: userData.instructorData?.credentials.cnh || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUserData(prev => ({
      ...prev,
      instructorData: {
        ...prev.instructorData,
        credentials: formData,
        car: prev.instructorData?.car || { model: '', year: 0, plate: '' },
        availability: prev.instructorData?.availability || [],
      }
    }));

    setCurrentScreen('document-validation');
  };

  const isFormValid = () => {
    return formData.credencial && formData.ear && formData.cnh;
  };

  return (
    <Layout title="Credenciais">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Suas Credenciais</h2>
          <p className="text-gray-600">Precisamos validar suas credenciais profissionais</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número da Credencial
            </label>
            <input
              type="text"
              value={formData.credencial}
              onChange={(e) => setFormData(prev => ({ ...prev, credencial: e.target.value }))}
              placeholder="000000"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Número EAR (Estabelecimento de Auto-escola Registrado)
            </label>
            <input
              type="text"
              value={formData.ear}
              onChange={(e) => setFormData(prev => ({ ...prev, ear: e.target.value }))}
              placeholder="00000000"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              CNH
            </label>
            <input
              type="text"
              value={formData.cnh}
              onChange={(e) => setFormData(prev => ({ ...prev, cnh: e.target.value }))}
              placeholder="00000000000"
              className="input-field"
              required
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6">
            <p className="text-sm text-blue-700">
              <strong>Importante:</strong> Suas credenciais serão verificadas antes de você poder 
              aceitar alunos.
            </p>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 rounded-lg font-medium mt-6 ${
              isFormValid()
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </form>
      </div>
    </Layout>
  );
};
