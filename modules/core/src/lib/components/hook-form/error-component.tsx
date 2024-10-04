import { Stack, Typography } from '@mui/material';
import Iconify from '../iconify/iconify';

interface IErrorComponentType {
  message?: string;
  state?: 'active' | 'error' | 'success' | 'disabled';
}

const ErrorComponent = ({ message }: IErrorComponentType) => {
  return (
    <Stack direction="row" gap={0.5} alignItems="center" flexWrap="wrap">
      <Iconify icon="mingcute:alert-fill" />
      <Typography variant="caption">{message}</Typography>
    </Stack>
  );
};

export default ErrorComponent;
