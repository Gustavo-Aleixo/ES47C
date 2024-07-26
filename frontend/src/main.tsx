import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Routes from './routes/Routes';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, indigo } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: purple[500],
    },
  },
});


createRoot(document.getElementById('root') as HTMLElement).render(

  <ThemeProvider theme={theme}>
    <StrictMode>
      <Routes />
    </StrictMode>
  </ThemeProvider>
);
