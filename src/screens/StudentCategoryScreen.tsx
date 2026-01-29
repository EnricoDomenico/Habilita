import React, { useState, useEffect } from 'react';
import { Bike, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import CarIcon from './imageslogos/6.png';

export const StudentCategoryScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [category, setCategory] = useState<'A' | 'B' | null>(
    userData.studentData?.category || null
  );
  const [transmission, setTransmission] = useState<'manual' | 'automatic' | null>(
    userData.studentData?.transmission || null
  );

  // Define transmissão manual automaticamente para categoria A
  useEffect(() => {
    if (category === 'A' && !transmission) {
      setTransmission('manual');
    }
  }, [category, transmission]);

  const handleContinue = () => {
    if (category && transmission) {
      setUserData(prev => ({
        ...prev,
        studentData: {
          ...prev.studentData,
          category,
          transmission,
        }
      }));
      setCurrentScreen('student-search-instructor');
    }
  };

  return (
    <Layout title="Categoria">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-black mb-2">Qual categoria?</h2>
          <p className="text-gray-600">Escolha o tipo de habilitação desejada</p>
        </div>

        <div className="space-y-8">
          {/* Categoria */}
          <div>
            <h3 className="text-lg font-semibold text-brand-black mb-4">Categoria</h3>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCategory('A')}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 
                         active:scale-95 ${
                  category === 'A'
                    ? 'border-brand-red bg-red-50 shadow-material'
                    : 'border-gray-300 bg-white active:bg-gray-50'
                }`}
              >
                {category === 'A' && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={20} className="text-brand-red" />
                  </div>
                )}
                <Bike size={48} className={`mx-auto mb-3 ${
                  category === 'A' ? 'text-brand-red' : 'text-gray-600'
                }`} />
                <span className={`block font-semibold text-lg ${
                  category === 'A' ? 'text-brand-red' : 'text-brand-black'
                }`}>
                  Categoria A
                </span>
                <span className="text-sm text-gray-600 block mt-1">Motos</span>
              </button>

              <button
                onClick={() => setCategory('B')}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-200 
                         active:scale-95 ${
                  category === 'B'
                    ? 'border-brand-red bg-red-50 shadow-material'
                    : 'border-gray-300 bg-white active:bg-gray-50'
                }`}
              >
                {category === 'B' && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle size={20} className="text-brand-red" />
                  </div>
                )}
                <img src={CarIcon} alt="Carro" className={`w-12 h-12 mx-auto mb-3 ${
                  category === 'B' ? 'opacity-100' : 'opacity-60'
                }`} />
                <span className={`block font-semibold text-lg ${
                  category === 'B' ? 'text-brand-red' : 'text-brand-black'
                }`}>
                  Categoria B
                </span>
                <span className="text-sm text-gray-600 block mt-1">Carros</span>
              </button>
            </div>
          </div>

          {}
          {category === 'B' && (
            <div className="animate-fade-in">
              <h3 className="text-lg font-semibold text-brand-black mb-4">Transmissão</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setTransmission('manual')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 
                           text-left active:scale-98 ${
                    transmission === 'manual'
                      ? 'border-brand-red bg-red-50 shadow-material'
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`block font-semibold text-lg ${
                        transmission === 'manual' ? 'text-brand-red' : 'text-brand-black'
                      }`}>
                        Manual
                      </span>
                      <span className="text-sm text-gray-600">Câmbio manual tradicional</span>
                    </div>
                    {transmission === 'manual' && (
                      <CheckCircle size={24} className="text-brand-red" />
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setTransmission('automatic')}
                  className={`w-full p-5 rounded-2xl border-2 transition-all duration-200 
                           text-left active:scale-98 ${
                    transmission === 'automatic'
                      ? 'border-brand-red bg-red-50 shadow-material'
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className={`block font-semibold text-lg ${
                        transmission === 'automatic' ? 'text-brand-red' : 'text-brand-black'
                      }`}>
                        Automático
                      </span>
                      <span className="text-sm text-gray-600">Câmbio automático</span>
                    </div>
                    {transmission === 'automatic' && (
                      <CheckCircle size={24} className="text-brand-red" />
                    )}
                  </div>
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleContinue}
            disabled={!category || !transmission}
            className={`w-full py-4 rounded-3xl font-semibold text-lg mt-8 
                     transition-all duration-200 shadow-material ${
              category && transmission
                ? 'bg-brand-red text-white active:scale-95 active:shadow-ripple'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </div>
    </Layout>
  );
};
