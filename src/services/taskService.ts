import { Task } from '../types';
import { mockTasks, delay } from './mockData';

// Сервис управления задачами
// Предоставляет CRUD операции для работы с задачами
class TaskService {
  // Приватный массив задач (имитация базы данных)
  private tasks: Task[] = [...mockTasks];

  /**
  Получение всех задач
  @returns Promise<Task[]> - массив всех задач
  */
  async getAllTasks(): Promise<Task[]> {
    // Имитация задержки сетевого запроса
    await delay(500);
    // Возвращаем копию массива задач
    return [...this.tasks];
  }

  /**
  Добавление новой задачи
  @param title - название задачи
  @param description - описание задачи
  @returns Promise<Task> - созданная задача
  */
  async addTask(title: string, description: string): Promise<Task> {
    // Имитация задержки сетевого запроса
    await delay(300);
    // Создаем новую задачу с уникальным ID
    const newTask: Task = {
      id: Date.now().toString(),    
      title,                        
      description,                  
      completed: false,             
      createdAt: new Date(),        
    };
    // Добавляем задачу в массив
    this.tasks.push(newTask);
    // Возвращаем созданную задачу
    return newTask;
  }

  /**
  Переключение состояния выполнения задачи
  @param taskId - идентификатор задачи
  @returns Promise<Task  null> - обновленная задача или null если не найдена
  */
  async toggleTaskCompletion(taskId: string): Promise<Task | null> {
    // Имитация задержки сетевого запроса
    await delay(200);
    // Находим индекс задачи в массиве
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    // Если задача не найдена, возвращаем null
    if (taskIndex === -1) return null;

    // Переключаем состояние выполнения задачи
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
    // Возвращаем копию обновленной задачи
    return { ...this.tasks[taskIndex] };
  }

  /**
  Удаление задачи
  @param taskId - идентификатор задачи для удаления
  @returns Promise<boolean> - результат операции удаления
  */
  async deleteTask(taskId: string): Promise<boolean> {
    // Имитация задержки сетевого запроса
    await delay(300);
    // Запоминаем исходную длину массива
    const initialLength = this.tasks.length;
    // Фильтруем массив, удаляя задачу с указанным ID
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    // Возвращаем true если длина массива уменьшилась (задача была удалена)
    return this.tasks.length < initialLength;
  }

  /**
  Получение задачи по идентификатору
  @param taskId - идентификатор задачи
  @returns Promise<Task | null> - найденная задача или null
  */
  async getTaskById(taskId: string): Promise<Task | null> {
    // Имитация задержки сетевого запроса
    await delay(100);
    // Ищем задачу в массиве
    const task = this.tasks.find(task => task.id === taskId);
    // Возвращаем копию задачи или null если не найдена
    return task ? { ...task } : null;
  }

  /**
  Обновление данных задачи
  @param taskId - идентификатор задачи
  @param updates - объект с обновляемыми полями
  @returns Promise<Task | null> - обновленная задача или null
  */
  async updateTask(taskId: string, updates: Partial<Pick<Task, 'title' | 'description'>>): Promise<Task | null> {
    // Имитация задержки сетевого запроса
    await delay(300);
    // Находим индекс задачи в массиве
    const taskIndex = this.tasks.findIndex(task => task.id === taskId);
    // Если задача не найдена, возвращаем null
    if (taskIndex === -1) return null;

    // Обновляем задачу новыми данными
    this.tasks[taskIndex] = {
      ...this.tasks[taskIndex],
      ...updates,
    };
    // Возвращаем копию обновленной задачи
    return { ...this.tasks[taskIndex] };
  }
}

// Экземпляр сервиса управления задачами
// Используется во всем приложении для работы с задачами
export const taskService = new TaskService();
