// Интерфейс задачи - основная модель данных приложения
export interface Task {
  // Уникальный идентификатор задачи
  id: string;
  // Название задачи
  title: string;
  // Подробное описание задачи (опциональное)
  description: string;
  // Статус выполнения задачи
  completed: boolean;
  // Дата и время создания задачи
  createdAt: Date;
}

// Интерфейс пользователя для системы аутентификации
export interface User {
  // Имя пользователя для входа в систему
  username: string;
  // Пароль пользователя
  password: string;
}

// Тип темы приложения - светлая или темная
export type ThemeType = 'light' | 'dark';

// Интерфейс цветовой палитры темы
// Содержит все необходимые цвета для стилизации компонентов
export interface ThemeColors {
  // Основной цвет фона приложения
  background: string;
  // Цвет поверхности (карточки, модальные окна)
  surface: string;
  // Вторичный цвет поверхности
  surfaceSecondary: string;
  // Основной цвет текста
  text: string;
  // Вторичный цвет текста
  textSecondary: string;
  // Приглушенный цвет текста (для подсказок)
  textMuted: string;
  // Основной акцентный цвет (кнопки, активные элементы)
  primary: string;
  // Темный вариант основного цвета
  primaryDark: string;
  // Акцентный цвет для выделения элементов
  accent: string;
  // Цвет границ элементов
  border: string;
  // Светлый цвет границ
  borderLight: string;
  // Цвет успеха (выполненные задачи)
  success: string;
  // Цвет ошибок
  error: string;
  // Цвет предупреждений
  warning: string;
  // Информационный цвет
  info: string;
  // Цвет теней
  shadow: string;
}

// Интерфейс темы приложения
// Содержит информацию о типе темы и цветовой палитре
export interface Theme {
  // Флаг темной темы
  isDark: boolean;
  // Объект с цветами темы
  colors: ThemeColors;
}
