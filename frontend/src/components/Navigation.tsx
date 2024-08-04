import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useStore } from '../store/useStore';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { Person3 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const Navigation = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    useStore.getState().setLogout()
  };

  const handleWorkshop = () => {
    navigate('/workshop');
  };

  const handleProfessor = () => {
    navigate('/professor');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          {/*LOGO*/}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/home"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>



          {/*LOGO*/}


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleProfessor} >
              Professor
            </Button>

            <Button sx={{ my: 2, color: 'white', display: 'block' }} onClick={handleWorkshop} >
              Workshop
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <IconButton onClick={handleProfile} sx={{ p: 0 }}>
              <Avatar>
                <Person3 />
              </Avatar>
            </IconButton>

            <Button sx={{ marginLeft: 1, color: 'white', }} onClick={handleLogout} >
              Sair
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar >
  );
}