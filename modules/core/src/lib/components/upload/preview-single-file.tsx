import Box from '@mui/material/Box';

import Image from '../image';

// ----------------------------------------------------------------------

type Props = {
  imgUrl?: string;
};

export default function SingleFilePreview({ imgUrl = '' }: Props) {
  return (
    <Box
      sx={{
        p: 1,
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
      }}
    >
      <img
        alt="file preview"
        src={imgUrl}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain', // Prevent distortion
          borderRadius: '8px',
        }}
      />
    </Box>
  );
}
