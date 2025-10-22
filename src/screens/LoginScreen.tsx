import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { authService } from '../services/authService';
import { useTheme } from '../components/ThemeProvider';


//Свойства экрана входа в систему

interface LoginScreenProps {
  // Функция обратного вызова при успешном входе
  onLoginSuccess: () => void;
}

/**
Экран аутентификации пользователя
Предоставляет интерфейс для входа в систему с именем пользователя и паролем
*/
export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  // Получаем текущую тему из контекста
  const { theme } = useTheme();

  // Локальное состояние для формы входа
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
  Обработчик попытки входа в систему
  Проводит валидацию и аутентификацию пользователя
  */
  const handleLogin = async () => {
    // Валидация заполненности полей
    if (!username.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Пожалуйста, введите имя пользователя и пароль');
      return;
    }

    // Устанавливаем состояние загрузки
    setIsLoading(true);

    try {
      // Вызываем сервис аутентификации
      const success = await authService.login(username, password);

      if (success) {
        // Успешный вход - вызываем коллбек
        onLoginSuccess();
      } else {
        // Неудачная аутентификация
        Alert.alert('Ошибка входа', 'Неверные учетные данные');
      }
    } catch (error) {
      // Обработка ошибок аутентификации
      Alert.alert('Ошибка', 'Произошла ошибка при входе в систему');
    } finally {
      // Сбрасываем состояние загрузки независимо от результата
      setIsLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Task Manager</Text>
      <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>Login to continue</Text>

      <View style={[styles.form, { backgroundColor: theme.colors.surface }]}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Username"
          placeholderTextColor={theme.colors.textMuted}
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!isLoading}
        />

        <TextInput
          style={[styles.input, { backgroundColor: theme.colors.surfaceSecondary, color: theme.colors.text, borderColor: theme.colors.border }]}
          placeholder="Password"
          placeholderTextColor={theme.colors.textMuted}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.loginButton, { backgroundColor: theme.colors.primary }, isLoading && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.surface} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={[styles.helpText, { color: theme.colors.textMuted }]}>
          Default credentials: admin / 1234
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  form: {
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  loginButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  helpText: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
  },
});
