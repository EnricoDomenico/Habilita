import React from 'react';
import { useApp } from '../context/AppContext';
import LogoComNome from './imageslogos/LogoComNome.png';

export const WelcomeScreen: React.FC = () => {
  const { setUserData, setCurrentScreen } = useApp();

  const handleUserTypeSelection = (type: 'student' | 'instructor') => {
    setUserData(prev => ({ ...prev, userType: type }));
    
    if (type === 'student') {
      setCurrentScreen('student-documents');
    } else {
      setCurrentScreen('instructor-credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Logo */}
      <div className="mb-16">
        <img 
          src={LogoComNome} 
          alt="Habilita" 
          className="w-64 h-auto"
        />
      </div>

      {/* Botões de Seleção */}
      <div className="w-full max-w-sm space-y-4">
        <button
          onClick={() => handleUserTypeSelection('student')}
          className="w-full bg-brand-red text-white p-6 rounded-3xl shadow-material 
                   active:shadow-ripple active:animate-ripple active:scale-95 
                   transition-all duration-200 relative overflow-hidden group"
        >
          <div className="relative z-10">
            <span className="text-xl font-semibold block">Sou Aluno</span>
            <p className="text-sm mt-2 opacity-90">Quero tirar minha CNH</p>
          </div>
        </button>

        <button
          onClick={() => handleUserTypeSelection('instructor')}
          className="w-full bg-white text-brand-black border-2 border-brand-red p-6 
                   rounded-3xl shadow-material active:bg-brand-gray active:scale-95 
                   transition-all duration-200 relative overflow-hidden"
        >
          <div className="relative z-10">
            <span className="text-xl font-semibold block">Sou Instrutor</span>
            <p className="text-sm mt-2 text-gray-600">Quero cadastrar meus serviços</p>
          </div>
        </button>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-500 text-sm">Sua carteira está mais perto!</p>
      </div>
    </div>
  );
};
