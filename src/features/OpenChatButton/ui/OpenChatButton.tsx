import { useAppDispatch } from '../../../app/store/hooks';
import { clickButton } from '../model/ButtonStateSlice';
import styles from './OpenChatButton.module.scss'

function OpenChatButton() {
  const dispatch = useAppDispatch();

  return (
    <button type="button" onClick={() => dispatch(clickButton())} className={styles.button}>
      Чат
    </button>
  )

}

export default OpenChatButton