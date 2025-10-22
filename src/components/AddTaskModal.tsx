import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from 'react-native';
import { useTheme } from './ThemeProvider';


// Свойства модального окна добавления задачи

interface AddTaskModalProps {
  // Флаг видимости модального окна
  visible: boolean;
  // Функция закрытия модального окна
  onClose: () => void;
  // Функция добавления новой задачи
  onAddTask: (title: string, description: string) => void;
}

/**
Модальное окно для добавления новой задачи
Позволяет пользователю ввести название и описание задачи
*/
export const AddTaskModal: React.FC<AddTaskModalProps> = ({ visible, onClose, onAddTask }) => {
  // Получаем текущую тему из контекста
  const { theme } = useTheme();

  // Локальное состояние для полей ввода
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  /**
  Обработчик отправки формы
  Проверяет заполненность обязательных полей и вызывает функцию добавления задачи
  */
  const handleSubmit = () => {
    // Валидация обязательного поля названия
    if (title.trim().length === 0) {
      Alert.alert('Ошибка', 'Название задачи обязательно для заполнения');
      return;
    }

    // Вызываем функцию добавления задачи с очищенными данными
    onAddTask(title.trim(), description.trim());

    // Очищаем поля ввода
    setTitle('');
    setDescription('');

    // Закрываем модальное окно
    onClose();
  };

  /**
  Обработчик отмены
  Очищает поля ввода и закрывает модальное окно
  */
  const handleCancel = () => {
    setTitle('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.title, { color: theme.colors.text }]}>Add New Task</Text>

          <TextInput
            style={[styles.input, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Task Title"
            placeholderTextColor={theme.colors.textMuted}
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />

          <TextInput
            style={[styles.input, styles.descriptionInput, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
            placeholder="Task Description (optional)"
            placeholderTextColor={theme.colors.textMuted}
            value={description}
            onChangeText={setDescription}
            multiline={true}
            maxLength={250}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.cancelButton, { backgroundColor: theme.colors.surfaceSecondary }]}
              onPress={handleCancel}
            >
              <Text style={[styles.cancelButtonText, { color: theme.colors.text }]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.colors.primary }]}
              onPress={handleSubmit}
            >
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    margin: 20,
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  addButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
