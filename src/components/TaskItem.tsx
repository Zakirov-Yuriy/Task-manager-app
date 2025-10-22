import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Task } from '../types';
import { useTheme } from './ThemeProvider';


// Свойства компонента задачи

interface TaskItemProps {
  // Объект задачи для отображения
  task: Task;
  // Функция обратного вызова для переключения состояния выполнения
  onToggleComplete: (taskId: string) => void;
  // Функция обратного вызова для удаления задачи
  onDelete: (taskId: string) => void;
}

/**
Компонент отображения отдельной задачи
Показывает информацию о задаче и предоставляет элементы управления
*/
export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onDelete }) => {
  // Получаем текущую тему из контекста
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      {/* Контейнер для чекбокса выполнения задачи */}
      <TouchableOpacity
        style={styles.checkContainer}
        onPress={() => onToggleComplete(task.id)}
      >
        {/* Чекбокс с динамическим цветом в зависимости от состояния выполнения */}
        <View style={[
          styles.checkbox,
          task.completed && [
            styles.checkboxChecked,
            { backgroundColor: theme.colors.primary }
          ]
        ]}>
          {/* Галочка, отображаемая только для выполненных задач */}
          {task.completed && (
            <Text style={[styles.checkmark, { color: theme.colors.surface }]}>
              ✓
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* Контейнер с основным содержимым задачи */}
      <View style={styles.taskContent}>
        {/* Название задачи с динамическим стилем для выполненных задач */}
        <Text style={[
          styles.title,
          { color: theme.colors.text },
          task.completed && [
            styles.titleCompleted,
            { color: theme.colors.textMuted }
          ]
        ]}>
          {task.title}
        </Text>

        {/* Описание задачи (отображается только если оно есть) */}
        {task.description && (
          <Text style={[
            styles.description,
            { color: theme.colors.textSecondary },
            task.completed && [
              styles.descriptionCompleted,
              { color: theme.colors.textMuted }
            ]
          ]}>
            {task.description}
          </Text>
        )}

        {/* Дата создания задачи */}
        <Text style={[styles.date, { color: theme.colors.textMuted }]}>
          {task.createdAt.toLocaleDateString()}
        </Text>
      </View>

      {/* Кнопка удаления задачи */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
      >
        <Text style={[styles.deleteText, { color: theme.colors.accent }]}>
          🗑️
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 12,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkContainer: {
    marginRight: 12,
    justifyContent: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    // backgroundColor будет установлен динамически через theme.colors.primary
  },
  checkmark: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  taskContent: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
  },
  description: {
    fontSize: 14,
    marginTop: 2,
  },
  descriptionCompleted: {
    // opacity будет снижен для выполненных задач
  },
  date: {
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
    justifyContent: 'center',
  },
  deleteText: {
    fontSize: 16,
  },
});
