import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { purple, indigo } from '@mui/material/colors';
import Loading from './components/Loading';
import AuthWrapper from './routes/AuthWrapper';


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
      <AuthWrapper />
      <Loading />
    </StrictMode>
  </ThemeProvider>
);