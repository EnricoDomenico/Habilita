import React from 'react';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const ScheduleScreen: React.FC = () => {
  const { userData } = useApp();
  const isStudent = userData.userType === 'student';
  const scheduledClasses = isStudent ? (userData.studentData?.scheduledClasses || []) : [];

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      weekday: 'long'
    });
  };

  return (
    <Layout title="Agenda" showBackButton={false}>
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Minha Agenda</h2>
          <p className="text-gray-600">
            {isStudent ? 'Suas aulas agendadas' : 'Suas aulas com alunos'}
          </p>
        </div>

        {scheduledClasses.length === 0 ? (
          <div className="card text-center py-12">
            <CalendarIcon size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Nenhuma aula agendada
            </h3>
            <p className="text-gray-600">
              {isStudent 
                ? 'Agende sua primeira aula para começar!'
                : 'Aguardando solicitações de alunos'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {scheduledClasses.map((classItem: any, index: number) => {
              const classDate = new Date(classItem.date);
              const today = new Date();
              const isPast = classDate < today;
              
              return (
                <div key={index} className={`card ${isPast ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {isStudent ? classItem.instructor?.name : 'Aluno'}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(classItem.date)}
                      </p>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isPast 
                        ? 'bg-gray-100 text-gray-600'
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {isPast ? 'Concluída' : 'Agendada'}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock size={16} />
                    <span>{classItem.time}</span>
                  </div>

                  {isStudent && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        Valor: R$ {classItem.instructor?.price}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};
