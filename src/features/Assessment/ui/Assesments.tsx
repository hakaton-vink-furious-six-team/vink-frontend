import type { FC } from 'react';
import { useState } from 'react';
import styles from './Assessment.module.scss';
import { chatNameValue } from '../../../entity/chatName/chatNameSlice';
import { useAppSelector, useAppDispatch } from '../../../app/store/hooks';
import { selectIsAssesment, setSubmitted } from '../../OpenChatButton/model/ButtonStateSlice';
import { assessmentApi } from '../../../shared/api/assessmentApi';
import type { IAssessment } from '../model/types/Assessment';

const Assessment: FC<IAssessment> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);
  const user_id = useAppSelector(chatNameValue);
  const dispatch = useAppDispatch();
  const assessmentState = useAppSelector(selectIsAssesment)

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      console.log(rating, user_id)
      const responce = await assessmentApi({ rating, user_id })
      console.log(responce)
      if (responce) {
        dispatch(setSubmitted())
      }
      onSubmit(rating);
    }
  };

  return (
    <div className={styles.rating}>
      <div className={styles.text}>Пожалуйста, оцените нашу работу</div>
      <div>
        {[...Array(5)].map((_, index) => {
          const rate = index + 1;
          return (
            <button
              key={rate}
              className={rate <= rating ? styles.filled : styles.empty}
              onClick={() => handleRating(rate)}
              aria-label={`Rate ${rate}`}
              type="button"
            >
              ☆
            </button>
          );
        })}
      </div>
      <button onClick={handleSubmit} className={styles.submitButton} type="button">
        Отправить оценку
      </button>
    </div>
  );
};

export default Assessment;
