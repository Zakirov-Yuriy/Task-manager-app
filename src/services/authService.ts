import { User } from '../types';
import { mockUser, delay } from './mockData';

// Сервис аутентификации пользователей
// Обрабатывает вход в систему и управление сессиями
class AuthService {
  /**
  Аутентификация пользователя
  @param username - имя пользователя
  @param password - пароль пользователя
  @returns Promise<boolean> - результат аутентификации
  */
  async login(username: string, password: string): Promise<boolean> {
    // Имитация задержки сетевого запроса
    await delay(500);
    // Проверка учетных данных с моковыми данными
    return username === mockUser.username && password === mockUser.password;
  }

  /**
  Проверка статуса аутентификации пользователя
  Заглушка для будущего использования с токенами/сессиями
  @returns boolean - статус аутентификации
  */
  isAuthenticated(): boolean {
    // В реальном приложении здесь проверялись бы токены или сессия
    return false;
  }

  /**
  Выход пользователя из системы
  Заглушка для будущего использования с очисткой данных аутентификации
  */
  async logout(): Promise<void> {
    // Имитация задержки сетевого запроса
    await delay(200);
    // Здесь будет очистка токенов, сессии и других данных аутентификации
  }
}

// Экземпляр сервиса аутентификации
// Используется во всем приложении для управления аутентификацией
export const authService = new AuthService();
