import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/components/ThemeProvider';
import { LoginScreen } from './src/screens/LoginScreen';
import { TasksScreen } from './src/screens/TasksScreen';

/**
Главный компонент приложения Task Manager
Управляет состоянием аутентификации и навигацией между экранами
*/
export default function App() {
  // Состояние аутентификации пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /**
  Обработчик успешного входа в систему
  Переключает приложение на экран задач
  */
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  /**
  Обработчик выхода из системы
  Возвращает пользователя на экран входа
  */
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    // Обертка приложения в провайдер темы для поддержки светлой/темной темы
    <ThemeProvider>
      {/* Условный рендеринг экранов в зависимости от состояния аутентификации */}
      {isLoggedIn ? (
        // Экран задач - отображается после успешного входа
        <TasksScreen onLogout={handleLogout} />
      ) : (
        // Экран входа - начальный экран приложения
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
      {/* Статус-бар с автоматической настройкой цвета */}
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
