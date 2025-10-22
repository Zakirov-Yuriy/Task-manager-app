import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Appearance } from 'react-native';
import { Theme, ThemeType } from '../types';
import { themes } from '../themes';

// Интерфейс контекста темы
// Определяет доступные методы и свойства для работы с темами
interface ThemeContextType {
  // Текущая тема приложения
  theme: Theme;
  // Тип текущей темы (light/dark)
  themeType: ThemeType;
  // Функция переключения между светлой и темной темой
  toggleTheme: () => void;
  // Функция установки конкретной темы
  setThemeType: (type: ThemeType) => void;
}

// React контекст для управления темами
// Предоставляет доступ к текущей теме и методам ее изменения
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Свойства провайдера темы
interface ThemeProviderProps {
  // Дочерние компоненты, которые будут иметь доступ к контексту темы
  children: ReactNode;
}

// Провайдер темы приложения
// Управляет состоянием темы и предоставляет контекст для всех дочерних компонентов
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Текущий тип темы (light/dark)
  const [themeType, setThemeType] = useState<ThemeType>('light');
  // Флаг использования системной темы
  const [isSystemTheme, setIsSystemTheme] = useState(true);

  useEffect(() => {
    // Используем системную тему по умолчанию
    const systemTheme = Appearance.getColorScheme();
    if (systemTheme && isSystemTheme) {
      setThemeType(systemTheme);
    }

    // Подписываемся на изменения системной темы
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      // Обновляем тему только если пользователь не выбрал свою
      if (colorScheme && isSystemTheme) {
        setThemeType(colorScheme as ThemeType);
      }
    });

    // Отписываемся от слушателя при размонтировании компонента
    return () => subscription?.remove();
  }, [isSystemTheme]);

  /**
  Переключение между светлой и темной темой
  Устанавливает пользовательский выбор темы
  */
  const toggleTheme = () => {
    const newThemeType = themeType === 'light' ? 'dark' : 'light';
    setThemeType(newThemeType);
    setIsSystemTheme(false); // Пользователь явно выбрал тему
  };

  /**
  Установка конкретного типа темы
  @param type - тип темы для установки
  */
  const handleSetThemeType = (type: ThemeType) => {
    setThemeType(type);
    setIsSystemTheme(false); // Пользователь явно выбрал тему
  };

  // Получаем объект темы на основе текущего типа
  const theme = themes[themeType];

  // Объект значения контекста
  const value = {
    theme,
    themeType,
    toggleTheme,
    setThemeType: handleSetThemeType,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// Хук для использования контекста темы
// Должен использоваться внутри компонентов, обернутых в ThemeProvider
// @returns ThemeContextType - объект с текущей темой и методами управления
// @throws Error если используется вне ThemeProvider
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
