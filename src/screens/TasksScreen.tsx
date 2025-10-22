import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { Task } from '../types';
import { taskService } from '../services/taskService';
import { TaskItem } from '../components/TaskItem';
import { AddTaskModal } from '../components/AddTaskModal';
import { useTheme } from '../components/ThemeProvider';


// Свойства основного экрана задач

interface TasksScreenProps {
  // Функция обратного вызова для выхода из системы
  onLogout: () => void;
}

/**
Основной экран приложения для управления задачами
Отображает список задач, статистику и элементы управления
*/
export const TasksScreen: React.FC<TasksScreenProps> = ({ onLogout }) => {
  // Получаем текущую тему и функцию переключения темы из контекста
  const { theme, toggleTheme } = useTheme();

  // Состояние задач и интерфейса
  const [tasks, setTasks] = useState<Task[]>([]);           // Массив задач
  const [loading, setLoading] = useState(true);             // Состояние загрузки
  const [refreshing, setRefreshing] = useState(false);     // Состояние обновления
  const [modalVisible, setModalVisible] = useState(false); // Видимость модального окна добавления задачи

  // Множества для отслеживания асинхронных операций
  const [completingTasks, setCompletingTasks] = useState<Set<string>>(new Set()); // Задачи в процессе выполнения
  const [deletingTasks, setDeletingTasks] = useState<Set<string>>(new Set());     // Задачи в процессе удаления

  
  // Загружаем задачи при монтировании компонента
  
  useEffect(() => {
    loadTasks();
  }, []);

  /**
  Загрузка задач из сервиса
  Устанавливает состояние загрузки и обрабатывает ошибки
  */
  const loadTasks = async () => {
    try {
      // Получаем задачи из сервиса
      const fetchedTasks = await taskService.getAllTasks();
      // Обновляем состояние задач
      setTasks(fetchedTasks);
    } catch (error) {
      // Показываем сообщение об ошибке загрузки
      Alert.alert('Ошибка', 'Не удалось загрузить задачи');
    } finally {
      // Сбрасываем состояния загрузки независимо от результата
      setLoading(false);
      setRefreshing(false);
    }
  };

  /**
  Обработчик обновления списка задач (pull-to-refresh)
  Устанавливает состояние обновления и запускает загрузку задач
  */
  const handleRefresh = () => {
    setRefreshing(true);
    loadTasks();
  };

  /**
  Обработчик добавления новой задачи
  @param title - название задачи
  @param description - описание задачи
  */
  const handleAddTask = async (title: string, description: string) => {
    try {
      // Создаем новую задачу через сервис
      const newTask = await taskService.addTask(title, description);
      // Добавляем задачу в начало списка
      setTasks(prev => [newTask, ...prev]);
    } catch (error) {
      // Показываем сообщение об ошибке добавления
      Alert.alert('Ошибка', 'Не удалось добавить задачу');
    }
  };

  /**
  Обработчик переключения состояния выполнения задачи
  @param taskId - идентификатор задачи
  */
  const handleToggleComplete = async (taskId: string) => {
    // Предотвращаем повторные нажатия пока операция выполняется
    if (completingTasks.has(taskId)) return;

    // Добавляем задачу в множество выполняющихся операций
    setCompletingTasks(prev => new Set(prev).add(taskId));

    try {
      // Переключаем состояние задачи через сервис
      const updatedTask = await taskService.toggleTaskCompletion(taskId);

      if (updatedTask) {
        // Обновляем задачу в локальном состоянии
        setTasks(prev => prev.map(task =>
          task.id === taskId ? updatedTask : task
        ));
      }
    } catch (error) {
      // Показываем сообщение об ошибке обновления
      Alert.alert('Ошибка', 'Не удалось обновить задачу');
    } finally {
      // Удаляем задачу из множества выполняющихся операций
      setCompletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  /**
  Показывает диалог подтверждения удаления задачи
  @param taskId - идентификатор задачи для удаления
  */
  const handleDelete = (taskId: string) => {
    Alert.alert(
      'Удалить задачу',
      'Вы уверены, что хотите удалить эту задачу?',
      [
        { text: 'Отмена', style: 'cancel' },
        {
          text: 'Удалить',
          style: 'destructive',
          onPress: () => performDelete(taskId),
        },
      ]
    );
  };

  /**
  Выполняет фактическое удаление задачи
  @param taskId - идентификатор задачи для удаления
  */
  const performDelete = async (taskId: string) => {
    // Предотвращаем повторные нажатия пока операция выполняется
    if (deletingTasks.has(taskId)) return;

    // Добавляем задачу в множество удаляющихся операций
    setDeletingTasks(prev => new Set(prev).add(taskId));

    try {
      // Удаляем задачу через сервис
      const success = await taskService.deleteTask(taskId);

      if (success) {
        // Удаляем задачу из локального состояния
        setTasks(prev => prev.filter(task => task.id !== taskId));
      }
    } catch (error) {
      // Показываем сообщение об ошибке удаления
      Alert.alert('Ошибка', 'Не удалось удалить задачу');
    } finally {
      // Удаляем задачу из множества удаляющихся операций
      setDeletingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(taskId);
        return newSet;
      });
    }
  };

  /**
  Функция рендера элемента списка задач
  @param item - объект с данными задачи
  @returns JSX элемент задачи
  */
  const renderTask = ({ item }: { item: Task }) => (
    <TaskItem
      task={item}
      onToggleComplete={handleToggleComplete}
      onDelete={handleDelete}
    />
  );

  // Подсчитываем количество выполненных задач
  const completedCount = tasks.filter(task => task.completed).length;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text }}>Loading tasks...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.title, { color: theme.colors.text }]}>My Tasks</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: theme.colors.surfaceSecondary }]}
            onPress={toggleTheme}
          >
            <Text style={[styles.themeText, { color: theme.colors.text }]}>
              {theme.isDark ? '☀️' : '🌙'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: theme.colors.surfaceSecondary }]}
            onPress={onLogout}
          >
            <Text style={[styles.logoutText, { color: theme.colors.primary }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.statsBar, { backgroundColor: theme.colors.surface }]}>
        <Text style={[styles.statsText, { color: theme.colors.textSecondary }]}>
          {completedCount} of {tasks.length} completed
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}>+ Add Task</Text>
        </TouchableOpacity>
      </View>

      {tasks.length === 0 ? (
        <View style={[styles.emptyContainer, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.emptyText, { color: theme.colors.text }]}>No tasks yet</Text>
          <Text style={[styles.emptySubtext, { color: theme.colors.textSecondary }]}>Tap "Add Task" to create your first task</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
      )}

      <AddTaskModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddTask={handleAddTask}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    elevation: 4,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  themeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  themeText: {
    fontSize: 16,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
  },
  statsText: {
    fontSize: 16,
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
});
