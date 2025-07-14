// ConfirmModal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import styles from './ConfirmModal.module.css';

interface Props {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<Props> = ({
  title,
  onConfirm,
  onCancel,
}) => {
  return ReactDOM.createPortal(
    <div className={styles.overlay} onClick={onCancel}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p>{title}</p>
        <div className={styles.actions}>
          <button onClick={onConfirm}>Да</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>,
    document.body,
  );
};
