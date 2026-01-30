import React, { useState } from 'react';
import { Car, Bike, AlertCircle, Truck, Bus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const InstructorCarScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState({
    model: userData.instructorData?.car.model || '',
    year: userData.instructorData?.car.year || new Date().getFullYear(),
    plate: userData.instructorData?.car.plate || '',
    category: userData.instructorData?.car.category || 'B' as 'A' | 'B' | 'C' | 'D' | 'E',
    transmission: userData.instructorData?.car.transmission || 'manual' as 'manual' | 'automatic',
  });

  const [yearError, setYearError] = useState('');

  // Validação de ano por categoria (Lei 2026)
  const getMinYearForCategory = (category: string): number => {
    const currentYear = new Date().getFullYear();
    if (category === 'B') {
      return currentYear - 12; // Categoria B: máximo 12 anos
    }
    if (['C', 'D', 'E'].includes(category)) {
      return currentYear - 20; // Categorias C/D/E: máximo 20 anos
    }
    return currentYear - 12; // Padrão
  };

  const validateYear = (year: number, category: string) => {
    const minYear = getMinYearForCategory(category);
    if (year < minYear) {
      const maxAge = category === 'B' ? 12 : 20;
      setYearError(`Veículos categoria ${category} devem ter no máximo ${maxAge} anos (ano mínimo: ${minYear})`);
      return false;
    }
    setYearError('');
    return true;
  };

  const handleYearChange = (year: number) => {
    validateYear(year, formData.category);
    setFormData(prev => ({ ...prev, year }));
  };

  const handleCategoryChange = (category: 'A' | 'B' | 'C' | 'D' | 'E') => {
    setFormData(prev => ({ ...prev, category }));
    validateYear(formData.year, category);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const minYear = getMinYearForCategory(formData.category);
    if (formData.year < minYear) {
      const maxAge = formData.category === 'B' ? 12 : 20;
      setYearError(`Veículos categoria ${formData.category} devem ter no máximo ${maxAge} anos`);
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
    const minYear = getMinYearForCategory(formData.category);
    return formData.model && formData.year >= minYear && formData.plate && !yearError;
  };

  const categories = [
    { id: 'A' as const, name: 'Moto', desc: 'Cat. A', Icon: Bike },
    { id: 'B' as const, name: 'Carro', desc: 'Cat. B', Icon: Car },
    { id: 'C' as const, name: 'Caminhão', desc: 'Cat. C', Icon: Truck },
    { id: 'D' as const, name: 'Ônibus', desc: 'Cat. D', Icon: Bus },
    { id: 'E' as const, name: 'Carreta', desc: 'Cat. E', Icon: Truck },
  ];

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
            <div className="grid grid-cols-3 gap-2">
              {categories.map(({ id, name, desc, Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleCategoryChange(id)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    formData.category === id
                      ? 'border-primary-600 bg-primary-50'
                      : 'border-gray-300 bg-white'
                  }`}
                >
                  <Icon size={20} className={`mx-auto mb-1 ${
                    formData.category === id ? 'text-primary-600' : 'text-gray-600'
                  }`} />
                  <span className={`block text-xs font-medium ${
                    formData.category === id ? 'text-primary-600' : 'text-gray-800'
                  }`}>
                    {desc}
                  </span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {formData.category === 'B' 
                ? 'Categoria B: veículo com até 12 anos' 
                : ['C', 'D', 'E'].includes(formData.category)
                ? 'Categorias C/D/E: veículo com até 20 anos'
                : 'Selecione a categoria do veículo'}
            </p>
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
              min={getMinYearForCategory(formData.category)}
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
            <p className="text-xs text-gray-500 mt-1">
              Ano mínimo permitido: {getMinYearForCategory(formData.category)} (conforme Lei 2026)
            </p>
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
