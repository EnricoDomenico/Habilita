import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, DollarSign, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

// Mock data de instrutores
const mockInstructors = [
  {
    id: 1,
    name: 'João Silva',
    rating: 4.8,
    reviews: 127,
    price: 80,
    gender: 'male',
    category: 'B',
    transmission: 'manual',
    photo: null,
  },
  {
    id: 2,
    name: 'Maria Santos',
    rating: 4.9,
    reviews: 89,
    price: 90,
    gender: 'female',
    category: 'B',
    transmission: 'manual',
    photo: null,
  },
  {
    id: 3,
    name: 'Pedro Costa',
    rating: 4.7,
    reviews: 156,
    price: 75,
    gender: 'male',
    category: 'B',
    transmission: 'automatic',
    photo: null,
  },
  {
    id: 4,
    name: 'Ana Oliveira',
    rating: 5.0,
    reviews: 203,
    price: 100,
    gender: 'female',
    category: 'B',
    transmission: 'automatic',
    photo: null,
  },
  {
    id: 5,
    name: 'Carlos Mendes',
    rating: 4.6,
    reviews: 94,
    price: 70,
    gender: 'male',
    category: 'A',
    transmission: 'manual',
    photo: null,
  },
];

export const StudentSearchInstructorScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    maxPrice: 100,
    gender: 'all' as 'all' | 'male' | 'female',
    minRating: 0,
  });

  const filteredInstructors = mockInstructors.filter(instructor => {
    const matchCategory = instructor.category === userData.studentData?.category;
    const matchTransmission = instructor.transmission === userData.studentData?.transmission;
    const matchPrice = instructor.price <= filters.maxPrice;
    const matchGender = filters.gender === 'all' || instructor.gender === filters.gender;
    const matchRating = instructor.rating >= filters.minRating;

    return matchCategory && matchTransmission && matchPrice && matchGender && matchRating;
  });

  const handleSelectInstructor = (instructor: typeof mockInstructors[0]) => {
    setUserData(prev => ({
      ...prev,
      studentData: {
        ...prev.studentData,
        selectedInstructor: instructor,
      }
    }));
    setCurrentScreen('student-schedule');
  };

  return (
    <Layout title="Buscar Instrutor">
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Encontre seu instrutor</h2>
          <p className="text-gray-600">
            {filteredInstructors.length} {filteredInstructors.length === 1 ? 'instrutor disponível' : 'instrutores disponíveis'}
          </p>
        </div>

        {/* Barra de Busca e Filtros */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar por nome..."
              className="input-field pl-10"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-secondary !px-4"
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="card mb-4 space-y-4">
            <h3 className="font-medium text-gray-800">Filtros</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço máximo: R$ {filters.maxPrice}
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={filters.maxPrice}
                onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sexo</label>
              <div className="flex gap-2">
                {['all', 'male', 'female'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setFilters(prev => ({ ...prev, gender: gender as any }))}
                    className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                      filters.gender === gender
                        ? 'border-primary-600 bg-primary-50 text-primary-600'
                        : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {gender === 'all' ? 'Todos' : gender === 'male' ? 'Masculino' : 'Feminino'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avaliação mínima: {filters.minRating > 0 ? filters.minRating : 'Qualquer'}
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={filters.minRating}
                onChange={(e) => setFilters(prev => ({ ...prev, minRating: parseFloat(e.target.value) }))}
                className="w-full"
              />
            </div>
          </div>
        )}

        {/* Lista de Instrutores */}
        <div className="space-y-3">
          {filteredInstructors.map((instructor) => (
            <div key={instructor.id} className="card">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={32} className="text-gray-400" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{instructor.name}</h3>
                  
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm ml-1 text-gray-700">{instructor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({instructor.reviews} avaliações)</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center text-primary-600">
                      <DollarSign size={18} />
                      <span className="font-medium">R$ {instructor.price}/aula</span>
                    </div>
                    
                    <button
                      onClick={() => handleSelectInstructor(instructor)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium
                               active:bg-primary-700 transition-colors"
                    >
                      Selecionar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};
