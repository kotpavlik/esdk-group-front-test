import axios from 'axios';
import type { AxiosInstance, AxiosResponse, AxiosError } from 'axios';


const getApiBaseUrl = () => {
  // Проверяем режим разработки из .env
  const isDev = import.meta.env.DEV;
  
  
  // В development режиме используем localhost собственно 
  if (isDev) {
    return import.meta.env.VITE_BASE_URL_LOCAL || 'http://localhost:3001/api';
  }
  
  // В production используем prod URL который у нас лежит на Railway
  return import.meta.env.VITE_BASE_URL_PROD || 'https://your-production-api.com/api';
};

const API_BASE_URL = getApiBaseUrl();


// Создаем экземпляра axios
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор запросов
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Интерцептор ответов
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Если что-то пошло не так, то выводим ошибку в консоль
    if (error.response) {
      console.error('Error response:', error.response.data);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Типы для API (моджно унести в отдельный файл, но у нас работа с 1 эндпоинтом, поэтому пусть будет тут)
export interface ContactFormData {
  phone: string;
  message: string;
}

export interface IMessage {
  _id: string;
  phoneNumber: string;
  message: string;
  createdAt: string;
  updatedAt: string;
}

// data через дженерик unknow, потому что данные будут приходить разные, а в стейт менеджере каком либо мы бы их типизировали и не пропускали если дата приходила бы не та
export interface ApiResponse<T = unknown > {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// API функции я так же вынес бы в отдельный файл, но пара запросов, камон.
export const api = {
  // Отправка формы обратной связи
  async submitContactForm(formData: ContactFormData): Promise<ApiResponse<IMessage>> {
    try {
      const response = await apiClient.post('/messages', {
        phoneNumber: formData.phone,
        message: formData.message
      });
      if (response.status === 201) {
        return {
          success: true,
          data: response.data.data,
          message: 'Сообщение успешно отправлено'
        };
      }
      
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return handleApiError<IMessage>(error);
    }
  },

  // Получение всех сообщений
  async getAllMessages(): Promise<ApiResponse<IMessage[]>> {
    try {
      const response = await apiClient.get('/messages');
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return handleApiError<IMessage[]>(error);
    }
  },


  // Удаление сообщения
  async deleteMessage(id: string): Promise<ApiResponse<{ message: string; id: string }>> {
    try {
      const response = await apiClient.delete(`/messages/${id}`);
      return {
        success: true,
        data: response.data.data,
      };
    } catch (error) {
      return handleApiError<{ message: string; id: string }>(error);
    }
  },
};
  

// Обработка ошибок. Тоже в отдельном файле будет лежать при увелечении проекта или если будем сразу знать, что проект будет не 2-3 запроса
function handleApiError<T>(error: unknown): ApiResponse<T> {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // Сервер ответил с кодом ошибки
      const status = error.response.status;
      const message = error.response.data?.message || getErrorMessage(status);
      
      return {
        success: false,
        error: message,
      };
    } else if (error.request) {
      // Запрос был отправлен, но ответа не получено
      return {
        success: false,
        error: 'Ошибка сети. Проверьте подключение к интернету.',
      };
    }
  }
  
  // Неизвестная ошибка
  return {
    success: false,
    error: 'Произошла неизвестная ошибка.',
  };
}

// Получение сообщения об ошибке по статус коду
function getErrorMessage(status: number): string {
  switch (status) {
    case 400:
      return 'Неверные данные. Проверьте правильность заполнения формы.';
    case 401:
      return 'Необходима авторизация.';
    case 403:
      return 'Доступ запрещен.';
    case 404:
      return 'Ресурс не найден.';
    case 500:
      return 'Внутренняя ошибка сервера. Попробуйте позже.';
    default:
      return `Ошибка сервера (${status}).`;
  }
}

// Утилиты для работы с API
export const apiUtils = {
  // Форматирование данных для отправки
  formatContactData(data: ContactFormData): ContactFormData {
    return {
      phone: data.phone.trim(),
      message: data.message.trim(),
    };
  },

  // Проверка является ли ошибка сетевой
  isNetworkError(error: unknown): boolean {
    return axios.isAxiosError(error) && !error.response;
  },

  // Проверка является ли ошибка серверной
  isServerError(error: unknown): boolean {
    return axios.isAxiosError(error) && Boolean(error.response) && error.response!.status >= 500;
  },
};

export default apiClient;
