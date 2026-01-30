import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, User, Award, Play, GraduationCap, MapPin, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import { MapView } from '../components/MapView';

export const StudentHomeScreen: React.FC = () => {
  const { userData, setCurrentScreen } = useApp();
  const scheduledClasses = userData.studentData?.scheduledClasses || [];
  const [selectedCategory, setSelectedCategory] = useState<string>(userData.studentData?.category || 'B');

  // Instrutores simulados próximos
  const nearbyInstructors = [
    {
      id: 1,
      name: 'Carlos Santos',
      photo: 'https://i.pravatar.cc/150?img=12',
      categories: ['B', 'C'],
      transmission: 'manual' as const,
      price: 85.00,
      vehicleModel: 'Volkswagen 9.170',
      vehicleYear: 2020,
      rating: 4.8,
      position: [-23.5505, -46.6333] as [number, number],
      availableNow: true,
    },
    {
      id: 2,
      name: 'Ana Paula Lima',
      photo: 'https://i.pravatar.cc/150?img=5',
      categories: ['B'],
      transmission: 'automatic' as const,
      price: 75.00,
      vehicleModel: 'Honda Civic',
      vehicleYear: 2022,
      rating: 4.9,
      position: [-23.5555, -46.6383] as [number, number],
      availableNow: false,
    },
    {
      id: 3,
      name: 'Roberto Almeida',
      photo: 'https://i.pravatar.cc/150?img=33',
      categories: ['C', 'D'],
      transmission: 'manual' as const,
      price: 120.00,
      vehicleModel: 'Mercedes-Benz Atego 1719',
      vehicleYear: 2018,
      rating: 4.7,
      position: [-23.5455, -46.6283] as [number, number],
      availableNow: true,
    },
    {
      id: 4,
      name: 'Fernanda Costa',
      photo: 'https://i.pravatar.cc/150?img=9',
      categories: ['B', 'C', 'D'],
      transmission: 'manual' as const,
      price: 95.00,
      vehicleModel: 'Iveco Daily',
      vehicleYear: 2021,
      rating: 5.0,
      position: [-23.5605, -46.6403] as [number, number],
      availableNow: true,
    },
  ];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleStartClass = () => {
    setCurrentScreen('class-mode');
  };

  const handleSelectInstructor = (instructor: any) => {
    setCurrentScreen('student-map-search');
  };

  const filteredInstructors = nearbyInstructors.filter(i => 
    i.categories.includes(selectedCategory)
  );

  return (
    <Layout title="Início" showBackButton={false}>
      <div className="flex flex-col h-full">
        {/* Mapa - 60% da tela */}
        <div className="h-[60vh] relative">
          <MapView
            instructors={nearbyInstructors}
            onSelectInstructor={handleSelectInstructor}
            selectedCategory={selectedCategory}
          />
          
          {/* Filtro de Categorias - Overlay no Mapa */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-white rounded-2xl shadow-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Filter size={18} className="text-brand-red" />
                  <span className="text-sm font-semibold text-gray-800">Filtrar por Categoria</span>
                </div>
                <span className="text-xs text-gray-600">
                  {filteredInstructors.length} encontrado{filteredInstructors.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex space-x-2 overflow-x-auto">
                {['A', 'B', 'C', 'D', 'E'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === cat
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Cat. {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Botão Ver Todos */}
          <button
            onClick={() => setCurrentScreen('student-map-search')}
            className="absolute bottom-4 left-4 right-4 bg-brand-red text-white py-3 rounded-2xl font-semibold shadow-lg active:scale-98 transition-all z-10"
          >
            <MapPin size={20} className="inline mr-2" />
            Ver Todos os Instrutores
          </button>
        </div>

        {/* Conteúdo - 40% da tela */}
        <div className="flex-1 overflow-y-auto p-6 bg-brand-gray">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-brand-black mb-1">Olá, Aluno!</h2>
          <p className="text-gray-600 text-sm">Pronto para sua próxima aula?</p>
        </div>

        {/* Card de Status Compacto */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-red to-red-700 text-white mb-4 shadow-material-lg">
          <div className="p-4">
            <div className="flex items-center mb-3">
              <GraduationCap size={28} className="mr-2 opacity-90" />
              <h3 className="text-base font-semibold">Seu Progresso</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold mb-1">{scheduledClasses.length}</p>
                <p className="text-xs opacity-90">Aulas agendadas</p>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">0</p>
                <p className="text-xs opacity-90">Aulas concluídas</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white opacity-10 rounded-full"></div>
        </div>

        {/* Próximas Aulas - Compacto */}
        {scheduledClasses.length > 0 && (
          <div className="mb-4">
            <h3 className="text-base font-semibold text-brand-black mb-3">Próximas Aulas</h3>
            <div className="space-y-2">
              {scheduledClasses.slice(0, 2).map((classItem: any, index: number) => (
                <div key={index} className="bg-white rounded-xl p-3 shadow-material">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={20} className="text-brand-red" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-brand-black text-sm">
                        {classItem.instructor?.name}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                        <span>{formatDate(classItem.date)}</span>
                        <span>{classItem.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botão de Check-in de Aula */}
        {scheduledClasses.length > 0 && (
          <button 
            onClick={handleStartClass}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl p-3 mb-4 shadow-lg 
                     active:scale-98 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <Play size={20} />
            <span className="font-bold">Check-in de Aula</span>
          </button>
        )}
        </div>
        </div>
    </Layout>
  );
};
