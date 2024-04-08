import { BASE_URL } from '../constant/api';

interface assessmentData {
  user_id: number | null;
  rating: number;
}

export const assessmentApi = async (assessmentData: assessmentData) => {
  try {
    const response = await fetch(`${BASE_URL}chat_rate/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(assessmentData),
    });
    if (response.ok) {
      return true;
    }
  } catch (error: any) {
    const errorMessage = `Ошибка при запросе postForm: ${error.message}`;
    console.error(errorMessage);
  }
  return false;
};