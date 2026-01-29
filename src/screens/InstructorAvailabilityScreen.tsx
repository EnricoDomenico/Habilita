import React, { useState } from 'react';
import { Plus, Trash2, DollarSign } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

interface TimeSlot {
  weekday: string;
  startTime: string;
  endTime: string;
}

export const InstructorAvailabilityScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [price, setPrice] = useState(userData.instructorData?.price || 80);
  const [availability, setAvailability] = useState<TimeSlot[]>(
    userData.instructorData?.availability || []
  );

  const weekdays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo',
  ];

  const timeOptions = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00'
  ];

  const addTimeSlot = () => {
    setAvailability([
      ...availability,
      { weekday: 'Segunda-feira', startTime: '08:00', endTime: '12:00' }
    ]);
  };

  const removeTimeSlot = (index: number) => {
    setAvailability(availability.filter((_, i) => i !== index));
  };

  const updateTimeSlot = (index: number, field: keyof TimeSlot, value: string) => {
    const updated = [...availability];
    updated[index] = { ...updated[index], [field]: value };
    setAvailability(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUserData(prev => ({
      ...prev,
      instructorData: {
        ...prev.instructorData,
        availability,
        price,
        credentials: prev.instructorData?.credentials || { credencial: '', ear: '', cnh: '' },
        car: prev.instructorData?.car || { model: '', year: 0, plate: '', category: 'B', transmission: 'manual' },
      }
    }));

    setCurrentScreen('instructor-home');
  };

  return (
    <Layout title="Disponibilidade">
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Defina sua Agenda</h2>
          <p className="text-gray-600">Configure seus horários e valor da aula</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Preço */}
          <div className="card">
            <div className="flex items-center gap-2 mb-3">
              <DollarSign size={20} className="text-primary-600" />
              <h3 className="font-medium text-gray-800">Valor por Aula</h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600">R$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                min="50"
                max="200"
                className="input-field flex-1"
                required
              />
            </div>
            <input
              type="range"
              min="50"
              max="200"
              value={price}
              onChange={(e) => setPrice(parseInt(e.target.value))}
              className="w-full mt-3"
            />
          </div>

          {/* Horários */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-800">Horários Disponíveis</h3>
              <button
                type="button"
                onClick={addTimeSlot}
                className="flex items-center gap-1 text-primary-600 font-medium"
              >
                <Plus size={20} />
                Adicionar
              </button>
            </div>

            {availability.length === 0 ? (
              <div className="card text-center text-gray-500 py-8">
                <p>Nenhum horário adicionado ainda</p>
                <p className="text-sm mt-1">Clique em "Adicionar" para começar</p>
              </div>
            ) : (
              <div className="space-y-3">
                {availability.map((slot, index) => (
                  <div key={index} className="card bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">
                            Dia da Semana
                          </label>
                          <select
                            value={slot.weekday}
                            onChange={(e) => updateTimeSlot(index, 'weekday', e.target.value)}
                            className="input-field py-2"
                          >
                            {weekdays.map((day) => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Início
                            </label>
                            <select
                              value={slot.startTime}
                              onChange={(e) => updateTimeSlot(index, 'startTime', e.target.value)}
                              className="input-field py-2"
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Fim
                            </label>
                            <select
                              value={slot.endTime}
                              onChange={(e) => updateTimeSlot(index, 'endTime', e.target.value)}
                              className="input-field py-2"
                            >
                              {timeOptions.map((time) => (
                                <option key={time} value={time}>{time}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeTimeSlot(index)}
                        className="p-2 text-red-600 active:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={availability.length === 0}
            className={`w-full py-4 rounded-lg font-medium ${
              availability.length > 0
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Finalizar Cadastro
          </button>
        </form>
      </div>
    </Layout>
  );
};
