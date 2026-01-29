import React, { useState } from 'react';
import { Calendar, Clock, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const StudentScheduleScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const instructor = userData.studentData?.selectedInstructor;

  // Gerar próximos 7 dias
  const getDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = getDates();

  // Horários disponíveis
  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00',
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      const scheduledClass = {
        instructor,
        date: selectedDate,
        time: selectedTime,
        status: 'scheduled'
      };

      setUserData(prev => ({
        ...prev,
        studentData: {
          ...prev.studentData,
          scheduledClasses: [
            ...(prev.studentData?.scheduledClasses || []),
            scheduledClass
          ]
        }
      }));

      setCurrentScreen('student-home');
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const getDayName = (date: Date) => {
    const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return days[date.getDay()];
  };

  return (
    <Layout title="Agendar Aula">
      <div className="p-4">
        {instructor && (
          <div className="card mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Instrutor Selecionado</h3>
            <p className="text-lg text-primary-600">{instructor.name}</p>
            <p className="text-sm text-gray-600">R$ {instructor.price}/aula</p>
          </div>
        )}

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={20} className="text-primary-600" />
            <h3 className="font-medium text-gray-800">Escolha o dia</h3>
          </div>
          
          <div className="flex overflow-x-auto gap-2 pb-2">
            {dates.map((date, index) => (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-16 p-3 rounded-lg border-2 transition-all ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-300 bg-white'
                }`}
              >
                <div className={`text-xs ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'text-primary-600'
                    : 'text-gray-600'
                }`}>
                  {getDayName(date)}
                </div>
                <div className={`text-lg font-medium mt-1 ${
                  selectedDate?.toDateString() === date.toDateString()
                    ? 'text-primary-600'
                    : 'text-gray-800'
                }`}>
                  {date.getDate()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Clock size={20} className="text-primary-600" />
              <h3 className="font-medium text-gray-800">Escolha o horário</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {availableTimes.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTime === time
                      ? 'border-primary-600 bg-primary-50 text-primary-600'
                      : 'border-gray-300 bg-white text-gray-800'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedDate && selectedTime && (
          <div className="card bg-primary-50 border-2 border-primary-200 mb-6">
            <div className="flex items-start gap-3">
              <Check size={24} className="text-primary-600 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800 mb-1">Resumo do Agendamento</h4>
                <p className="text-sm text-gray-700">
                  {formatDate(selectedDate)} às {selectedTime}
                </p>
                <p className="text-sm text-gray-700">
                  Instrutor: {instructor?.name}
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleConfirm}
          disabled={!selectedDate || !selectedTime}
          className={`w-full py-4 rounded-lg font-medium ${
            selectedDate && selectedTime
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Confirmar Agendamento
        </button>
      </div>
    </Layout>
  );
};
