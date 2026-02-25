import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_STORAGE_KEY = '@auth_state';

export interface AuthState {
  token: string;
  refreshToken: string;
  citizenId: string;
}

export async function saveAuthState(authState: AuthState): Promise<void> {
  try {
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
  } catch (error) {
    console.error('Erro ao salvar estado de autenticação:', error);
  }
}

export async function loadAuthState(): Promise<AuthState | null> {
  try {
    const data = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
    if (data) {
      return JSON.parse(data) as AuthState;
    }
    return null;
  } catch (error) {
    console.error('Erro ao carregar estado de autenticação:', error);
    return null;
  }
}

export async function clearAuthState(): Promise<void> {
  try {
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar estado de autenticação:', error);
  }
}
