import { createAsyncThunk } from "@reduxjs/toolkit"
import { BASE_URL } from "../constant/api"

interface FormData {
  name: string;
  phone_number: string;
}

export const postForm = createAsyncThunk(
  'form/postForm',
  async (formData: FormData, thunkApi) => {
    try {
      const response = await fetch(`${BASE_URL}users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const errorMessage = `Ошибка при запросе postForm: ${response.status}`;
        console.error(errorMessage);
        return thunkApi.rejectWithValue({ message: errorMessage, code: response.status })
      }
      const responseData = await response.json()
      console.log(responseData)
      console.log(responseData.chat_name)
      return responseData.chat_name;
    }
    catch (error: any) {
      const errorMessage = `Ошибка при запросе postForm: ${error.message}`;
      console.error(errorMessage);
      return thunkApi.rejectWithValue({ message: errorMessage, code: 0 })
    }
  }
)
