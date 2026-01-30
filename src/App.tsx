import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { StudentDocumentsScreen } from './screens/StudentDocumentsScreen';
import { StudentCategoryScreen } from './screens/StudentCategoryScreen';
import { StudentSearchInstructorScreen } from './screens/StudentSearchInstructorScreen';
import { StudentScheduleScreen } from './screens/StudentScheduleScreen';
import { StudentHomeScreen } from './screens/StudentHomeScreen';
import { StudentMapSearchScreen } from './screens/StudentMapSearchScreen';
import { InstructorCredentialsScreen } from './screens/InstructorCredentialsScreen';
import { InstructorCarScreen } from './screens/InstructorCarScreen';
import { InstructorAvailabilityScreen } from './screens/InstructorAvailabilityScreen';
import { InstructorHomeScreen } from './screens/InstructorHomeScreen';
import { InstructorFinancialScreen } from './screens/InstructorFinancialScreen';
import { ScheduleScreen } from './screens/ScheduleScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DocumentValidationScreen } from './screens/DocumentValidationScreen';
import { ClassModeScreen } from './screens/ClassModeScreen';

const AppContent: React.FC = () => {
  const { currentScreen } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      
      // Fluxo do Aluno
      case 'student-documents':
        return <StudentDocumentsScreen />;
      case 'document-validation':
        return <DocumentValidationScreen />;
      case 'student-category':
        return <StudentCategoryScreen />;
      case 'student-search-instructor':
        return <StudentSearchInstructorScreen />;
      case 'student-map-search':
        return <StudentMapSearchScreen />;
      case 'student-schedule':
        return <StudentScheduleScreen />;
      case 'student-home':
        return <StudentHomeScreen />;
      case 'class-mode':
        return <ClassModeScreen />;
      
      // Fluxo do Instrutor
      case 'instructor-credentials':
        return <InstructorCredentialsScreen />;
      case 'instructor-car':
        return <InstructorCarScreen />;
      case 'instructor-availability':
        return <InstructorAvailabilityScreen />;
      case 'instructor-home':
        return <InstructorHomeScreen />;
      case 'instructor-financial':
        return <InstructorFinancialScreen />;
      
      // Telas Comuns
      case 'schedule':
        return <ScheduleScreen />;
      case 'profile':
        return <ProfileScreen />;
      
      default:
        return <WelcomeScreen />;
    }
  };

  return <div className="app">{renderScreen()}</div>;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
