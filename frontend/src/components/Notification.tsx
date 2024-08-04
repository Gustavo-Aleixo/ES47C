import React from 'react';
import ReactDOM from 'react-dom/client';
import { Slide, Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
const Transition = (props: any) => <Slide {...props} direction="left" />;

/**
 * Exemplo de Uso:
 * 
 * notification('Parabéns, você conseguiu!', 'success') [ message | type ]
 */

const Notification: React.FC<{
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}> = ({ message, severity, onClose }) => {
  return (
    <Snackbar
      open
      autoHideDuration={4000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      TransitionComponent={Transition}
      onClose={(e, reason) => {
        if (reason === 'clickaway') return
        onClose();
      }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};


const notification = (message: string, severity: 'success' | 'error' | 'info' | 'warning') => {
  let snackbarRoot = document.getElementById('snackbar-root');

  if (!snackbarRoot) {
    snackbarRoot = document.createElement('div');
    snackbarRoot.id = 'snackbar-root';
    document.body.appendChild(snackbarRoot);
  }

  const root = ReactDOM.createRoot(snackbarRoot);

  const onClose = () => {
    root.unmount();
    if (snackbarRoot.parentNode) {
      snackbarRoot.parentNode.removeChild(snackbarRoot);
    }
  };

  root.render(
    <Notification
      message={message}
      severity={severity}
      onClose={onClose}
    />
  );
};

export default notification;