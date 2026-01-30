import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { MapView } from '../components/MapView';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  category: string;
  transmission: string;
  maxVehicleAge: number;
  minRating: number;
  availableNow: boolean;
}

export const StudentMapSearchScreen: React.FC = () => {
  const { setCurrentScreen, userData, setUserData } = useApp();
  const [showFilters, setShowFilters] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: userData.studentData?.category || 'B',
    transmission: userData.studentData?.transmission || 'manual',
    maxVehicleAge: 12,
    minRating: 0,
    availableNow: false,
  });

  // Instrutores em Jundiaí - SP
  const mockInstructors = [
    {
      id: 1,
      name: 'Carlos Santos',
      photo: 'https://i.pravatar.cc/150?img=12',
      categories: ['B'],
      transmission: 'manual' as const,
      price: 85.00,
      vehicleModel: 'Honda Civic 2022',
      vehicleYear: 2022,
      rating: 4.8,
      position: [-23.1864, -46.8982] as [number, number], // Centro
      availableNow: true,
    },
    {
      id: 2,
      name: 'Ana Paula Lima',
      photo: 'https://i.pravatar.cc/150?img=5',
      categories: ['B'],
      transmission: 'automatic' as const,
      price: 95.00,
      vehicleModel: 'Toyota Corolla 2023',
      vehicleYear: 2023,
      rating: 4.9,
      position: [-23.1890, -46.8950] as [number, number], // Centro
      availableNow: false,
    },
    {
      id: 3,
      name: 'Roberto Moto',
      photo: 'https://i.pravatar.cc/150?img=33',
      categories: ['A'],
      transmission: 'manual' as const,
      price: 70.00,
      vehicleModel: 'Honda CG 160 2021',
      vehicleYear: 2021,
      rating: 4.7,
      position: [-23.1750, -46.8920] as [number, number], // Vila Arens
      availableNow: true,
    },
    {
      id: 4,
      name: 'Fernanda Costa',
      photo: 'https://i.pravatar.cc/150?img=9',
      categories: ['B'],
      transmission: 'manual' as const,
      price: 80.00,
      vehicleModel: 'Volkswagen Gol 2020',
      vehicleYear: 2020,
      rating: 5.0,
      position: [-23.2010, -46.9120] as [number, number], // Eloy Chaves
      availableNow: true,
    },
    {
      id: 5,
      name: 'João Caminhoneiro',
      photo: 'https://i.pravatar.cc/150?img=15',
      categories: ['D'],
      transmission: 'manual' as const,
      price: 150.00,
      vehicleModel: 'Mercedes-Benz OF-1721 2019',
      vehicleYear: 2019,
      rating: 4.6,
      position: [-23.1650, -46.9050] as [number, number], // Retiro
      availableNow: false,
    },
    {
      id: 6,
      name: 'Mariana Silva',
      photo: 'https://i.pravatar.cc/150?img=20',
      categories: ['B', 'C'],
      transmission: 'manual' as const,
      price: 100.00,
      vehicleModel: 'Ford Cargo 816 2018',
      vehicleYear: 2018,
      rating: 4.8,
      position: [-23.1820, -46.9010] as [number, number],
      availableNow: true,
    },
    {
      id: 7,
      name: 'Pedro Alves',
      photo: 'https://i.pravatar.cc/150?img=25',
      categories: ['C', 'D', 'E'],
      transmission: 'manual' as const,
      price: 180.00,
      vehicleModel: 'Scania R450 2020',
      vehicleYear: 2020,
      rating: 4.9,
      position: [-23.1780, -46.8870] as [number, number],
      availableNow: true,
    },
  ];

  const getMaxAllowedAge = (category: string): number => {
    if (category === 'B') return 12;
    if (['C', 'D', 'E'].includes(category)) return 20;
    return 12;
  };

  const filteredInstructors = mockInstructors.filter(instructor => {
    // Filtro de categoria
    if (filters.category && !instructor.categories.includes(filters.category)) {
      return false;
    }

    // Filtro de transmissão
    if (filters.transmission && instructor.transmission !== filters.transmission) {
      return false;
    }

    // Filtro de idade do veículo
    const currentYear = new Date().getFullYear();
    const vehicleAge = currentYear - instructor.vehicleYear;
    const maxAge = getMaxAllowedAge(filters.category);
    
    if (vehicleAge > maxAge) {
      return false;
    }

    // Filtro de rating mínimo
    if (filters.minRating > 0 && instructor.rating < filters.minRating) {
      return false;
    }

    // Filtro de disponibilidade
    if (filters.availableNow && !instructor.availableNow) {
      return false;
    }

    return true;
  });

  const handleSelectInstructor = (instructor: any) => {
    setUserData(prev => ({
      ...prev,
      studentData: {
        ...prev.studentData,
        selectedInstructor: instructor,
      },
    }));
    setCurrentScreen('student-schedule');
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const handleResetFilters = () => {
    setFilters({
      category: userData.studentData?.category || 'B',
      transmission: 'manual',
      maxVehicleAge: 12,
      minRating: 0,
      availableNow: false,
    });
  };

  return (
    <Layout title="Buscar Instrutor" showBackButton>
      <div className="relative h-full">
        {/* Mapa */}
        <MapView
          instructors={filteredInstructors}
          onSelectInstructor={handleSelectInstructor}
          selectedCategory={filters.category}
        />

        {/* Botão de Filtros */}
        <button
          onClick={() => setShowFilters(true)}
          className="absolute top-4 right-4 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-lg font-medium flex items-center space-x-2 hover:bg-gray-50 z-10"
        >
          <Filter size={20} />
          <span>Filtros</span>
          {(filters.minRating > 0 || filters.availableNow) && (
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Badge de Resultados */}
        <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg z-10">
          <p className="text-sm font-medium text-gray-700">
            {filteredInstructors.length} instrutor{filteredInstructors.length !== 1 ? 'es' : ''} encontrado{filteredInstructors.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Modal de Filtros */}
        {showFilters && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
            <div className="bg-white rounded-t-3xl w-full max-w-md p-6 animate-slide-up max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filtros Avançados</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Categoria */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categoria
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {['A', 'B', 'C', 'D', 'E'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setFilters({ ...filters, category: cat })}
                        className={`py-2 rounded-lg font-medium transition-colors ${
                          filters.category === cat
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Limite de idade do veículo: {getMaxAllowedAge(filters.category)} anos
                  </p>
                </div>

                {/* Transmissão */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Transmissão
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setFilters({ ...filters, transmission: 'manual' })}
                      className={`py-2 rounded-lg font-medium transition-colors ${
                        filters.transmission === 'manual'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Manual
                    </button>
                    <button
                      onClick={() => setFilters({ ...filters, transmission: 'automatic' })}
                      className={`py-2 rounded-lg font-medium transition-colors ${
                        filters.transmission === 'automatic'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Automática
                    </button>
                  </div>
                </div>

                {/* Rating Mínimo */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Avaliação Mínima: {filters.minRating > 0 ? `${filters.minRating.toFixed(1)} ★` : 'Qualquer'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={filters.minRating}
                    onChange={(e) => setFilters({ ...filters, minRating: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Qualquer</span>
                    <span>5.0 ★</span>
                  </div>
                </div>

                {/* Disponibilidade */}
                <div>
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={filters.availableNow}
                      onChange={(e) => setFilters({ ...filters, availableNow: e.target.checked })}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Apenas disponíveis agora
                    </span>
                  </label>
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleResetFilters}
                    className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Limpar
                  </button>
                  <button
                    onClick={handleApplyFilters}
                    className="flex-1 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
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
      `}</style>
    </Layout>
  );
};
