import React, { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Play, Square, Star, Clock, MapPin } from 'lucide-react';

interface ClassSession {
  instructorName: string;
  startTime: Date | null;
  duration: number; // em segundos
  isActive: boolean;
}

export const ClassModeScreen: React.FC = () => {
  const { setCurrentScreen, userData } = useApp();
  const [session, setSession] = useState<ClassSession>({
    instructorName: userData.studentData?.selectedInstructor?.name || 'Instrutor',
    startTime: null,
    duration: 0,
    isActive: false,
  });

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [showEvaluation, setShowEvaluation] = useState(false);

  // Timer
  useEffect(() => {
    let interval: number;

    if (session.isActive && session.startTime) {
      interval = window.setInterval(() => {
        setSession(prev => ({
          ...prev,
          duration: Math.floor((Date.now() - (prev.startTime?.getTime() || 0)) / 1000),
        }));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [session.isActive, session.startTime]);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStartClass = () => {
    setSession({
      ...session,
      startTime: new Date(),
      isActive: true,
      duration: 0,
    });
  };

  const handleEndClass = () => {
    setSession(prev => ({
      ...prev,
      isActive: false,
    }));
    setShowEvaluation(true);
  };

  const handleSubmitEvaluation = () => {
    // Aqui você salvaria a avaliação
    console.log('Avaliação:', { rating, comment, duration: session.duration });
    setCurrentScreen('student-home');
  };

  if (showEvaluation) {
    return (
      <Layout title="Avaliar Aula" showBackButton={false}>
        <div className="flex flex-col h-full p-6">
          <div className="flex-1">
            {/* Resumo da Aula */}
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="font-bold text-lg text-gray-800 mb-4">
                Aula Concluída!
              </h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center space-x-2">
                  <Clock size={18} className="text-blue-600" />
                  <span>Duração: <strong>{formatTime(session.duration)}</strong></span>
                </p>
                <p className="flex items-center space-x-2">
                  <MapPin size={18} className="text-blue-600" />
                  <span>Instrutor: <strong>{session.instructorName}</strong></span>
                </p>
              </div>
            </div>

            {/* Avaliação */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Como foi sua aula?
              </label>
              <div className="flex justify-center space-x-2 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className="transition-transform hover:scale-110"
                  >
                    <Star
                      size={40}
                      className={
                        star <= rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comentário */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comentário (opcional)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Conte como foi sua experiência..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Botão de Enviar */}
          <button
            onClick={handleSubmitEvaluation}
            disabled={rating === 0}
            className={`w-full py-3 rounded-lg font-medium transition-colors ${
              rating > 0
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Enviar Avaliação
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Modo Aula" showBackButton={!session.isActive}>
      <div className="flex flex-col items-center justify-center h-full p-6">
        {!session.isActive ? (
          /* Tela Inicial - Antes do Check-in */
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6">
              <Play className="text-blue-600" size={64} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Pronto para começar?
            </h2>
            <p className="text-gray-600 mb-8">
              Faça o check-in para iniciar sua aula com {session.instructorName}
            </p>
            <button
              onClick={handleStartClass}
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Iniciar Aula
            </button>
          </div>
        ) : (
          /* Tela Durante a Aula */
          <div className="text-center w-full max-w-md">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4 animate-pulse">
                <div className="w-16 h-16 bg-green-500 rounded-full"></div>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                Aula em Curso
              </h2>
              <p className="text-gray-600">
                com {session.instructorName}
              </p>
            </div>

            {/* Timer */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 mb-8 shadow-xl">
              <p className="text-white text-sm font-medium mb-2">Tempo Decorrido</p>
              <p className="text-white text-5xl font-bold font-mono">
                {formatTime(session.duration)}
              </p>
            </div>

            {/* Informações da Aula */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2 text-left">
              <div className="flex items-center space-x-2 text-gray-700">
                <Clock size={18} className="text-blue-600" />
                <span className="text-sm">
                  Início: {session.startTime?.toLocaleTimeString('pt-BR', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>

            {/* Botão de Finalizar */}
            <button
              onClick={handleEndClass}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-medium hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center space-x-2"
            >
              <Square size={20} />
              <span>Finalizar e Avaliar</span>
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </Layout>
  );
};
