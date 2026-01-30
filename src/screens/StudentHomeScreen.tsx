import React from 'react';
import { Calendar, CheckCircle, Clock, User, Award, Play } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';
import CarIcon from './imageslogos/6.png';

export const StudentHomeScreen: React.FC = () => {
  const { userData, setCurrentScreen } = useApp();
  const scheduledClasses = userData.studentData?.scheduledClasses || [];

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

  return (
    <Layout title="Início" showBackButton={false}>
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-black mb-1">Olá, Aluno!</h2>
          <p className="text-gray-600">Pronto para sua próxima aula?</p>
        </div>

        {/* Card de Status com identidade Habilita */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-red to-red-700 text-white mb-6 shadow-material-lg">
          <div className="p-6">
            <div className="flex items-center mb-4">
              <img src={CarIcon} alt="Progresso" className="w-10 h-10 mr-3 opacity-90" />
              <h3 className="text-lg font-semibold">Seu Progresso</h3>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-4xl font-bold mb-1">{scheduledClasses.length}</p>
                <p className="text-sm opacity-90">Aulas agendadas</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-1">0</p>
                <p className="text-sm opacity-90">Aulas concluídas</p>
              </div>
            </div>
          </div>
          {/* Decorative circle */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white opacity-10 rounded-full"></div>
        </div>

        {/* Próximas Aulas */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-black">Próximas Aulas</h3>
            {scheduledClasses.length > 0 && (
              <span className="text-sm text-brand-red font-medium">
                {scheduledClasses.length} {scheduledClasses.length === 1 ? 'aula' : 'aulas'}
              </span>
            )}
          </div>
          
          {scheduledClasses.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-material">
              <Calendar size={56} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-700 font-medium mb-1">Nenhuma aula agendada</p>
              <p className="text-sm text-gray-500">
                Agende sua primeira aula para começar
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {scheduledClasses.map((classItem: any, index: number) => (
                <div key={index} className="bg-white rounded-2xl p-4 shadow-material 
                                          active:scale-98 transition-transform duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                      <User size={28} className="text-brand-red" />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-brand-black text-lg">
                        {classItem.instructor?.name}
                      </h4>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={16} className="text-brand-red" />
                          <span>{formatDate(classItem.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock size={16} className="text-brand-red" />
                          <span>{classItem.time}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3 bg-green-50 
                                   rounded-full px-3 py-1 w-fit">
                        <CheckCircle size={16} className="text-green-600" />
                        <span className="text-sm text-green-700 font-medium">Confirmada</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-brand-black mb-4">Ações Rápidas</h3>
          
          {/* Botão de Check-in de Aula - Destaque */}
          {scheduledClasses.length > 0 && (
            <button 
              onClick={handleStartClass}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl p-4 mb-3 shadow-lg 
                       active:scale-98 transition-all duration-200 flex items-center justify-center space-x-3"
            >
              <Play size={24} />
              <span className="font-bold text-lg">Check-in de Aula</span>
            </button>
          )}
          
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white rounded-2xl p-6 text-center shadow-material 
                             active:scale-95 active:bg-gray-50 transition-all duration-200">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center 
                           justify-center mx-auto mb-3">
                <Calendar size={24} className="text-brand-red" />
              </div>
              <span className="text-sm font-semibold text-brand-black block">
                Agendar Aula
              </span>
            </button>
            
            <button className="bg-white rounded-2xl p-6 text-center shadow-material 
                             active:scale-95 active:bg-gray-50 transition-all duration-200">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center 
                           justify-center mx-auto mb-3">
                <Award size={24} className="text-brand-red" />
              </div>
              <span className="text-sm font-semibold text-brand-black block">
                Meu Instrutor
              </span>
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};
