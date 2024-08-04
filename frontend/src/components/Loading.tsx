import { useStore } from '../store/useStore';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';


const BlurBackdrop = styled(Backdrop)({
  backdropFilter: 'blur(3px)',
  zIndex: 9999,
});

const Loading = () => {
  const loading = useStore(state => state.loading);

  return (
    <BlurBackdrop open={loading}>
      <CircularProgress color="inherit" />
    </BlurBackdrop>
  );
};

export default Loading;