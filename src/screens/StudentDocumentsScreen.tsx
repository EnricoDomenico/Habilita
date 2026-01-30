import React, { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Layout } from '../components/Layout';

export const StudentDocumentsScreen: React.FC = () => {
  const { userData, setUserData, setCurrentScreen } = useApp();
  const [formData, setFormData] = useState({
    rg: userData.studentData?.documents?.rg || '',
    cpf: userData.studentData?.documents?.cpf || '',
    renach: userData.studentData?.documents?.renach || '',
  });

  const [files, setFiles] = useState({
    residencia: userData.studentData?.documents?.residencia || null,
    ladv: userData.studentData?.documents?.ladv || null,
  });

  const [touched, setTouched] = useState({
    rg: false,
    cpf: false,
    renach: false,
  });

  // Validações
  const validateRG = (rg: string) => {
    return rg.length >= 9;
  };

  const validateCPF = (cpf: string) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11;
  };

  const validateRenach = (renach: string) => {
    return renach.length === 11;
  };

  const getFieldValidation = (field: 'rg' | 'cpf' | 'renach') => {
    if (!touched[field]) return 'default';
    
    const value = formData[field];
    if (!value) return 'error';
    
    switch (field) {
      case 'rg':
        return validateRG(value) ? 'success' : 'error';
      case 'cpf':
        return validateCPF(value) ? 'success' : 'error';
      case 'renach':
        return validateRenach(value) ? 'success' : 'error';
      default:
        return 'default';
    }
  };

  const getInputClasses = (field: 'rg' | 'cpf' | 'renach') => {
    const validation = getFieldValidation(field);
    const baseClasses = "w-full px-4 py-3 rounded-2xl transition-all duration-200 outline-none";
    
    switch (validation) {
      case 'success':
        return `${baseClasses} border-2 border-green-500 bg-green-50 focus:border-green-600`;
      case 'error':
        return `${baseClasses} border-2 border-red-500 bg-red-50 focus:border-red-600`;
      default:
        return `${baseClasses} border-2 border-gray-300 bg-white focus:border-brand-red`;
    }
  };

  const handleFileChange = (field: 'residencia' | 'ladv', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFiles(prev => ({ ...prev, [field]: file }));
  };

  const handleBlur = (field: 'rg' | 'cpf' | 'renach') => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setUserData(prev => ({
      ...prev,
      studentData: {
        ...prev.studentData,
        documents: {
          ...formData,
          ...files,
        }
      }
    }));

    setCurrentScreen('document-validation');
  };

  const isFormValid = () => {
    return validateRG(formData.rg) && 
           validateCPF(formData.cpf) && 
           validateRenach(formData.renach) && 
           files.residencia && 
           files.ladv;
  };

  return (
    <Layout title="Documentos">
      <div className="p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-brand-black mb-2">Seus Documentos</h2>
          <p className="text-gray-600">Precisamos de alguns documentos para iniciar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* RG */}
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">RG</label>
            <div className="relative">
              <input
                type="text"
                value={formData.rg}
                onChange={(e) => setFormData(prev => ({ ...prev, rg: e.target.value }))}
                onBlur={() => handleBlur('rg')}
                placeholder="00.000.000-0"
                className={getInputClasses('rg')}
                required
              />
              {touched.rg && formData.rg && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validateRG(formData.rg) ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CPF */}
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">CPF</label>
            <div className="relative">
              <input
                type="text"
                value={formData.cpf}
                onChange={(e) => setFormData(prev => ({ ...prev, cpf: e.target.value }))}
                onBlur={() => handleBlur('cpf')}
                placeholder="000.000.000-00"
                className={getInputClasses('cpf')}
                maxLength={14}
                required
              />
              {touched.cpf && formData.cpf && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validateCPF(formData.cpf) ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* RENACH */}
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">RENACH</label>
            <div className="relative">
              <input
                type="text"
                value={formData.renach}
                onChange={(e) => setFormData(prev => ({ ...prev, renach: e.target.value }))}
                onBlur={() => handleBlur('renach')}
                placeholder="00000000000"
                className={getInputClasses('renach')}
                maxLength={11}
                required
              />
              {touched.renach && formData.renach && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {validateRenach(formData.renach) ? (
                    <CheckCircle size={20} className="text-green-600" />
                  ) : (
                    <AlertCircle size={20} className="text-red-600" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Comprovante de Residência */}
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              Comprovante de Residência
            </label>
            <label className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed 
                            rounded-2xl cursor-pointer transition-all duration-200 ${
                              files.residencia 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-300 bg-white hover:border-brand-red'
                            }`}>
              <input
                type="file"
                onChange={(e) => handleFileChange('residencia', e)}
                accept="image/*,.pdf"
                className="hidden"
                required
              />
              {files.residencia ? (
                <div className="flex items-center text-green-700">
                  <CheckCircle size={20} className="mr-2" />
                  <span className="text-sm font-medium">{files.residencia.name}</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <Upload size={20} className="mr-2" />
                  <span className="text-sm">Selecionar arquivo</span>
                </div>
              )}
            </label>
          </div>

          {/* LADV */}
          <div>
            <label className="block text-sm font-semibold text-brand-black mb-2">
              LADV (Laudo Médico)
            </label>
            <label className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed 
                            rounded-2xl cursor-pointer transition-all duration-200 ${
                              files.ladv 
                                ? 'border-green-500 bg-green-50' 
                                : 'border-gray-300 bg-white hover:border-brand-red'
                            }`}>
              <input
                type="file"
                onChange={(e) => handleFileChange('ladv', e)}
                accept="image/*,.pdf"
                className="hidden"
                required
              />
              {files.ladv ? (
                <div className="flex items-center text-green-700">
                  <CheckCircle size={20} className="mr-2" />
                  <span className="text-sm font-medium">{files.ladv.name}</span>
                </div>
              ) : (
                <div className="flex items-center text-gray-500">
                  <Upload size={20} className="mr-2" />
                  <span className="text-sm">Selecionar arquivo</span>
                </div>
              )}
            </label>
          </div>

          {/* Botão Submit */}
          <button
            type="submit"
            disabled={!isFormValid()}
            className={`w-full py-4 rounded-3xl font-semibold text-lg mt-8 
                     transition-all duration-200 shadow-material ${
              isFormValid()
                ? 'bg-brand-red text-white active:scale-95 active:shadow-ripple'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </form>
      </div>
    </Layout>
  );
};
