import { Task, User } from '../types';

// Моковые данные задач для тестирования и демонстрации
// Используются как имитация данных из базы данных или API
export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Настроить проект',
    description: 'Настроить проект React Native с TypeScript и Expo',
    completed: true,  
    createdAt: new Date('2024-10-22T10:00:00'),
  },
  {
    id: '2',
    title: 'Создать UI компоненты',
    description: 'Разработать переиспользуемые компоненты для списка задач и полей ввода',
    completed: false, 
    createdAt: new Date('2024-10-22T11:00:00'),
  },
  {
    id: '3',
    title: 'Реализовать аутентификацию',
    description: 'Добавить экран входа с валидацией имени пользователя и пароля',
    completed: false, 
    createdAt: new Date('2024-10-22T12:00:00'),
  },
  {
    id: '4',
    title: 'Добавить управление задачами',
    description: 'Реализовать функции добавления, редактирования, удаления и переключения состояния задач',
    completed: false, 
    createdAt: new Date('2024-10-22T13:00:00'),
  },
];

// Моковые данные пользователя для тестирования аутентификации
// В реальном приложении эти данные должны храниться в защищенном хранилище
export const mockUser: User = {
  username: 'admin',  
  password: '1234',   
};

// Функция имитации задержки сетевого запроса
// Используется для создания реалистичного поведения приложения
// @param ms - количество миллисекунд задержки
// @returns Promise<void> - промис, который разрешается через указанное время
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
