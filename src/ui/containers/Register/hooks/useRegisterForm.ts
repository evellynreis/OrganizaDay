import { useState } from 'react';
import { RegisterFormData } from '../types';
import { validateStep } from '../validators';

export function useRegisterForm(totalSteps: number) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [values, setValues] = useState<Partial<RegisterFormData>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateCurrentStep = (stepId: string): boolean => {
    const stepErrors = validateStep(stepId, values);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const goToNextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      setErrors({});
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setErrors({});
    }
  };

  const prepareRegisterPayload = (): { name: string; cpf: string; email: string; password: string } => {
    const cleanCPF = (values.cpf || '').replace(/\D/g, '');
    
    return {
      name: values.name || '',
      cpf: cleanCPF,
      email: values.email || '',
      password: values.password || '',
    };
  };

  return {
    currentStepIndex,
    values,
    errors,
    handleChange,
    validateCurrentStep,
    goToNextStep,
    goToPreviousStep,
    prepareRegisterPayload,
  };
}
