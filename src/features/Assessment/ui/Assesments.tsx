import type { FC } from 'react';
import { useState } from 'react';
import styles from './Assessment.module.scss';
import type { IAssessment } from '../model/types/Assessment';

const Assessment: FC<IAssessment> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = () => {
    if (onSubmit) {
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
