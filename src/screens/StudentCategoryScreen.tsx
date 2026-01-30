import React, { useState, useEffect } from 'react';
import { Bike, CheckCircle, Truck, Bus, Car } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const StudentCategoryScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [category, setCategory] = useState<'A' | 'B' | 'C' | 'D' | 'E' | null>(
    userData.studentData?.category || null
  );
  const [transmission, setTransmission] = useState<'manual' | 'automatic' | null>(
    userData.studentData?.transmission || null
  );

  // Define transmissão manual automaticamente para categoria A, C, D e E
  useEffect(() => {
    if (['A', 'C', 'D', 'E'].includes(category || '') && !transmission) {
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
      setCurrentScreen('student-map-search');
    }
  };

  const categories = [
    { id: 'A' as const, name: 'Categoria A', desc: 'Motos', Icon: Bike },
    { id: 'B' as const, name: 'Categoria B', desc: 'Carros', Icon: Car },
    { id: 'C' as const, name: 'Categoria C', desc: 'Caminhões', Icon: Truck },
    { id: 'D' as const, name: 'Categoria D', desc: 'Ônibus', Icon: Bus },
    { id: 'E' as const, name: 'Categoria E', desc: 'Carretas', Icon: Truck },
  ];

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
              {categories.map(({ id, name, desc, Icon }) => (
                <button
                  key={id}
                  onClick={() => setCategory(id)}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-200 
                           active:scale-95 ${
                    category === id
                      ? 'border-brand-red bg-red-50 shadow-material'
                      : 'border-gray-300 bg-white active:bg-gray-50'
                  }`}
                >
                  {category === id && (
                    <div className="absolute top-2 right-2">
                      <CheckCircle size={20} className="text-brand-red" />
                    </div>
                  )}
                  <Icon size={48} className={`mx-auto mb-3 ${
                    category === id ? 'text-brand-red' : 'text-gray-600'
                  }`} />
                  <span className={`block font-semibold text-lg ${
                    category === id ? 'text-brand-red' : 'text-brand-black'
                  }`}>
                    {name}
                  </span>
                  <span className="text-sm text-gray-600 block mt-1">{desc}</span>
                </button>
              ))}
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
