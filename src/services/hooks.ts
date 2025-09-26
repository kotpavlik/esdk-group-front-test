import { useState, useCallback } from 'react';
import { api, apiUtils } from './api';
import type { ContactFormData, ApiResponse, IMessage } from './api';

// Хук для отправки формы обратной связи
export function useContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submitForm = useCallback(async (formData: ContactFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formattedData = apiUtils.formatContactData(formData);
      const response = await api.submitContactForm(formattedData);

      if (response.success) {
        setSuccess(true);
        return { 
          success: true, 
          data: response.data,
          message: response.message 
        };
      } else {
        setError(response.error || 'Неизвестная ошибка');
        return { success: false, error: response.error };
      }
    } catch {
      const errorMessage = 'Произошла неожиданная ошибка';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetForm = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    submitForm,
    resetForm,
    isLoading,
    error,
    success,
  };
}




// Хук для работы с любым API запросом
export function useApiRequest<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(async (apiCall: () => Promise<ApiResponse<T>>) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await apiCall();
      
      if (response.success && response.data) {
        setData(response.data);
        return { success: true, data: response.data };
      } else {
        setError(response.error || 'Неизвестная ошибка');
        return { success: false, error: response.error };
      }
    } catch {
      const errorMessage = 'Произошла неожиданная ошибка';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setError(null);
    setData(null);
  }, []);

  return {
    execute,
    reset,
    isLoading,
    error,
    data,
  };
}

// Хук для получения всех сообщений
export function useMessages() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.getAllMessages();
      
      if (response.success && response.data) {
        setMessages(response.data);
        return response.data;
      } else {
        setError(response.error || 'Не удалось загрузить сообщения');
        return null;
      }
    } catch {
      const errorMessage = 'Не удалось загрузить сообщения';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchMessages,
    messages,
    isLoading,
    error,
  };
}

