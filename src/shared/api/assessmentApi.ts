import { BASE_URL } from '../constant/api';

interface assessmentData {
  user_id: number | null;
  rating: number;
}

export const assessmentApi = async (assessmentData: assessmentData) => {
  await fetch(`${BASE_URL}chat_rate/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(assessmentData),
  }
  )
};