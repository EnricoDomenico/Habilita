import React, { useState } from 'react';
import { Car, Bike, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const InstructorCarScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState({
    model: userData.instructorData?.car.model || '',
    year: userData.instructorData?.car.year || new Date().getFullYear(),
    plate: userData.instructorData?.car.plate || '',
    category: userData.instructorData?.car.category || 'B' as 'A' | 'B',
    transmission: userData.instructorData?.car.transmission || 'manual' as 'manual' | 'automatic',
  });

  const [yearError, setYearError] = useState('');

  const handleYearChange = (year: number) => {
    if (year < 2011) {
      setYearError('O veículo deve ser de 2011 ou mais recente');
    } else {
      setYearError('');
    }
    setFormData(prev => ({ ...prev, year }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.year < 2011) {
      setYearError('O veículo deve ser de 2011 ou mais recente');
      return;
    }

    setUserData(prev => ({
      ...prev,
      instructorData: {
        ...prev.instructorData,
        car: formData,
        credentials: prev.instructorData?.credentials || { credencial: '', ear: '', cnh: '' },
        availability: prev.instructorData?.availability || [],
      }
    }));

    setCurrentScreen('instructor-availability');
  };

  const isFormValid = () => {
    return formData.model && formData.year >= 2011 && formData.plate && !yearError;
  };

  return (
    <Layout title="Cadastro do Veículo">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Cadastre seu Veículo</h2>
          <p className="text-gray-600">Informe os dados do veículo usado nas aulas</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Categoria */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: 'A' }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.category === 'A'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Bike size={24} className={`mx-auto mb-1 ${
                  formData.category === 'A' ? 'text-primary-600' : 'text-gray-600'
                }`} />
                <span className={`block text-sm font-medium ${
                  formData.category === 'A' ? 'text-primary-600' : 'text-gray-800'
                }`}>
                  Moto (Cat. A)
                </span>
              </button>

              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, category: 'B' }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  formData.category === 'B'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <Car size={24} className={`mx-auto mb-1 ${
                  formData.category === 'B' ? 'text-primary-600' : 'text-gray-600'
                }`} />
                <span className={`block text-sm font-medium ${
                  formData.category === 'B' ? 'text-primary-600' : 'text-gray-800'
                }`}>
                  Carro (Cat. B)
                </span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData(prev => ({ ...prev, model: e.target.value }))}
              placeholder="Ex: Honda Civic"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ano</label>
            <input
              type="number"
              value={formData.year}
              onChange={(e) => handleYearChange(parseInt(e.target.value))}
              min="2011"
              max={new Date().getFullYear()}
              className={`input-field ${yearError ? 'border-red-500' : ''}`}
              required
            />
            {yearError && (
              <div className="flex items-center gap-2 mt-2 text-red-600">
                <AlertCircle size={16} />
                <span className="text-sm">{yearError}</span>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Veículos devem ser de 2011 ou mais recentes</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Placa</label>
            <input
              type="text"
              value={formData.plate}
              onChange={(e) => setFormData(prev => ({ ...prev, plate: e.target.value.toUpperCase() }))}
              placeholder="ABC-1234"
              className="input-field"
              required
            />
          </div>

          {formData.category === 'B' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transmissão</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, transmission: 'manual' }))}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    formData.transmission === 'manual'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <span className={`block font-medium ${
                    formData.transmission === 'manual' ? 'text-primary-600' : 'text-gray-800'
                  }`}>
                    Manual
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, transmission: 'automatic' }))}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    formData.transmission === 'automatic'
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <span className={`block font-medium ${
                    formData.transmission === 'automatic' ? 'text-primary-600' : 'text-gray-800'
                  }`}>
                    Automático
                  </span>
                </button>
              </div>
            </div>
          )}

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
