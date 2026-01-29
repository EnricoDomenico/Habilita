import React from 'react';
import { Home, Calendar, User, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Logo from '../screens/imageslogos/Logo.png';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  showBottomNav?: boolean;
  title?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  showBackButton = true, 
  showBottomNav = true,
  title 
}) => {
  const { goBack, currentScreen, setCurrentScreen, userData } = useApp();

  const navItems = [
    { id: 'home', icon: Home, label: 'Início' },
    { id: 'schedule', icon: Calendar, label: 'Agenda' },
    { id: 'profile', icon: User, label: 'Perfil' },
  ];

  const getHomeScreen = () => {
    if (userData.userType === 'student') return 'student-home';
    if (userData.userType === 'instructor') return 'instructor-home';
    return 'welcome';
  };

  return (
    <div className="flex flex-col h-screen bg-brand-gray">
      {/* Header */}
      <header className="bg-white shadow-material sticky top-0 z-10 border-b border-gray-200">
        <div className="flex items-center h-16 px-4">
          {showBackButton && currentScreen !== 'welcome' && (
            <button
              onClick={goBack}
              className="p-2 -ml-2 active:bg-gray-100 rounded-full transition-colors 
                       active:scale-95 duration-200"
              aria-label="Voltar"
            >
              <ArrowLeft size={24} className="text-brand-black" />
            </button>
          )}
          
          {/* Logo como Avatar */}
          <div className="flex items-center ml-2 flex-1">
            <img src={Logo} alt="Habilita" className="w-8 h-8 mr-2" />
            <h1 className="text-lg font-semibold text-brand-black">
              {title || 'Habilita'}
            </h1>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>

      {/* Bottom Navigation - Android Style */}
      {showBottomNav && userData.userType && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-material-lg">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = 
                (item.id === 'home' && (currentScreen === 'student-home' || currentScreen === 'instructor-home')) ||
                (item.id === 'schedule' && currentScreen === 'schedule') ||
                (item.id === 'profile' && currentScreen === 'profile');
              
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.id === 'home') {
                      setCurrentScreen(getHomeScreen());
                    } else {
                      setCurrentScreen(item.id);
                    }
                  }}
                  className={`flex flex-col items-center justify-center flex-1 h-full 
                           transition-all duration-200 active:bg-gray-100 active:scale-95
                           relative overflow-hidden group ${
                    isActive ? 'text-brand-red' : 'text-gray-600'
                  }`}
                >
                  {/* Ripple Effect */}
                  <div className="absolute inset-0 bg-brand-red opacity-0 group-active:opacity-10 
                               transition-opacity duration-200"></div>
                  
                  <Icon size={24} className="relative z-10" />
                  <span className={`text-xs mt-1 font-medium relative z-10 ${
                    isActive ? 'font-semibold' : ''
                  }`}>
                    {item.label}
                  </span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 
                                 w-12 h-1 bg-brand-red rounded-b-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};
