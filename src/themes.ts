import { Theme, ThemeColors } from './types';

/**
Цветовая палитра для светлой темы
Используется для дневного режима интерфейса
*/
export const lightThemeColors: ThemeColors = {
  background: '#f5f5f5',      
  surface: '#ffffff',         
  surfaceSecondary: '#f8f9fa', 
  text: '#333333',           
  textSecondary: '#666666',  
  textMuted: '#999999',      
  primary: '#007AFF',        
  primaryDark: '#0056CC',    
  accent: '#FF3B30',         
  border: '#e1e5e9',         
  borderLight: '#f0f0f0',    
  success: '#34C759',        
  error: '#FF3B30',          
  warning: '#FF9500',        
  info: '#5AC8FA',           
  shadow: 'rgba(0, 0, 0, 0.1)', 
};

/**
Цветовая палитра для темной темы
Используется для ночного режима интерфейса
*/
export const darkThemeColors: ThemeColors = {
  background: '#121212',      
  surface: '#1e1e1e',        
  surfaceSecondary: '#2c2c2c', 
  text: '#ffffff',           
  textSecondary: '#cccccc',  
  textMuted: '#888888',      
  primary: '#8B5CF6',        
  primaryDark: '#7C3AED',    
  accent: '#FF453A',         
  border: '#3c3c3c',         
  borderLight: '#404040',    
  success: '#30D158',        
  error: '#FF453A',          
  warning: '#FF9F0A',        
  info: '#64D2FF',           
  shadow: 'rgba(0, 0, 0, 0.3)', 
};

// Конфигурация светлой темы
export const lightTheme: Theme = {
  isDark: false,             
  colors: lightThemeColors,  
};

// Конфигурация темной темы
export const darkTheme: Theme = {
  isDark: true,              
  colors: darkThemeColors,   
};

// Объект с доступными темами приложения
// Используется для быстрого доступа к конфигурациям тем
export const themes = {
  light: lightTheme,         
  dark: darkTheme,          
};
