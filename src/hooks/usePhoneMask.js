import { useCallback } from 'react';

/**
 * Hook customizado para aplicar máscara de telefone brasileiro
 * Formato: (XX) 99999-9999
 */
export const usePhoneMask = () => {
  const applyMask = useCallback((value) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');

    // Limita a 11 dígitos (DDD + 9 dígitos)
    const limitedNumbers = numbers.substring(0, 11);

    // Aplica a formatação
    if (limitedNumbers.length === 0) {
      return '';
    } else if (limitedNumbers.length <= 2) {
      return `(${limitedNumbers}`;
    } else if (limitedNumbers.length <= 7) {
      return `(${limitedNumbers.substring(0, 2)}) ${limitedNumbers.substring(2)}`;
    } else {
      return `(${limitedNumbers.substring(0, 2)}) ${limitedNumbers.substring(2, 7)}-${limitedNumbers.substring(7, 11)}`;
    }
  }, []);

  const handlePhoneChange = useCallback((e, setValue) => {
    const maskedValue = applyMask(e.target.value);
    setValue(maskedValue);
  }, [applyMask]);

  return { applyMask, handlePhoneChange };
};

