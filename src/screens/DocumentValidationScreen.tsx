import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { useApp } from '../context/AppContext';
import { CheckCircle, XCircle, Loader, Shield, FileCheck } from 'lucide-react';

type ValidationStatus = 'idle' | 'validating' | 'success' | 'error';

interface ValidationStep {
  id: string;
  name: string;
  description: string;
  status: ValidationStatus;
}

export const DocumentValidationScreen: React.FC = () => {
  const { setCurrentScreen, userData, setUserData } = useApp();
  const isInstructor = userData.userType === 'instructor';

  const [steps, setSteps] = useState<ValidationStep[]>([
    {
      id: 'govbr',
      name: 'Autenticação Gov.br',
      description: 'Verificando identidade digital',
      status: 'idle',
    },
    {
      id: 'renach',
      name: 'Validação RENACH',
      description: 'Consultando SENATRAN',
      status: 'idle',
    },
    {
      id: isInstructor ? 'credential' : 'ladv',
      name: isInstructor ? 'Credencial de Instrutor' : 'LADV',
      description: isInstructor ? 'Verificando registro profissional' : 'Verificando documento de habilitação',
      status: 'idle',
    },
  ]);

  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [validationComplete, setValidationComplete] = useState(false);

  const startValidation = () => {
    setCurrentStepIndex(0);
    validateNextStep(0);
  };

  const validateNextStep = (stepIndex: number) => {
    if (stepIndex >= steps.length) {
      setValidationComplete(true);
      return;
    }

    // Atualizar status para validating
    setSteps(prev => 
      prev.map((step, idx) => 
        idx === stepIndex 
          ? { ...step, status: 'validating' as ValidationStatus }
          : step
      )
    );

    // Simular validação (2 segundos)
    setTimeout(() => {
      // 95% de chance de sucesso (simulação)
      const success = Math.random() > 0.05;
      
      setSteps(prev => 
        prev.map((step, idx) => 
          idx === stepIndex 
            ? { ...step, status: (success ? 'success' : 'error') as ValidationStatus }
            : step
        )
      );

      if (success) {
        setCurrentStepIndex(stepIndex + 1);
        setTimeout(() => validateNextStep(stepIndex + 1), 500);
      }
    }, 2000);
  };

  const handleContinue = () => {
    if (isInstructor) {
      setCurrentScreen('instructor-car');
    } else {
      setCurrentScreen('student-category');
    }
  };

  const getStatusIcon = (status: ValidationStatus) => {
    switch (status) {
      case 'validating':
        return <Loader className="animate-spin text-blue-600" size={24} />;
      case 'success':
        return <CheckCircle className="text-green-600" size={24} />;
      case 'error':
        return <XCircle className="text-red-600" size={24} />;
      default:
        return <div className="w-6 h-6 rounded-full border-2 border-gray-300"></div>;
    }
  };

  return (
    <Layout
      title="Validação de Documentos"
      showBackButton={!validationComplete}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
              <Shield className="text-blue-600" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Verificação de Documentos
            </h2>
            <p className="text-gray-600">
              Validação automática via Gov.br e SENATRAN
            </p>
          </div>

          {currentStepIndex === -1 ? (
            /* Tela Inicial */
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <FileCheck className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-1">
                      O que será validado?
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Identidade via Gov.br</li>
                      <li>• RENACH junto ao SENATRAN</li>
                      <li>
                        • {isInstructor ? 'Credencial de Instrutor Autônomo' : 'Laudo de Aptidão (LADV)'}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm text-yellow-800">
                  <strong>Atenção:</strong> A validação é obrigatória conforme a Lei de Instrutores Autônomos de 2026.
                  Seus dados são protegidos pela LGPD.
                </p>
              </div>

              <button
                onClick={startValidation}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors mt-6"
              >
                Iniciar Validação
              </button>
            </div>
          ) : (
            /* Tela de Validação em Andamento */
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    step.status === 'success'
                      ? 'border-green-200 bg-green-50'
                      : step.status === 'error'
                      ? 'border-red-200 bg-red-50'
                      : step.status === 'validating'
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {getStatusIcon(step.status)}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{step.name}</h3>
                      <p className="text-sm text-gray-600">{step.description}</p>
                      
                      {step.status === 'validating' && (
                        <p className="text-sm text-blue-600 mt-1">
                          Aguarde...
                        </p>
                      )}
                      {step.status === 'success' && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ Validado com sucesso
                        </p>
                      )}
                      {step.status === 'error' && (
                        <p className="text-sm text-red-600 mt-1">
                          ✗ Erro na validação. Tente novamente.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {validationComplete && (
                <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-lg text-center">
                  <CheckCircle className="mx-auto text-green-600 mb-3" size={48} />
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    Validação Concluída!
                  </h3>
                  <p className="text-green-700 mb-4">
                    Todos os documentos foram verificados com sucesso.
                  </p>
                  <button
                    onClick={handleContinue}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Continuar
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </Layout>
  );
};
