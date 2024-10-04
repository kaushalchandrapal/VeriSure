// @mui
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
//
import { Page500 } from '@verisure-commons';
import { LoadingScreen } from '@verisure-core';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function CompactLayout({ children }: Props) {
  return (
    <>

      <Container component="main">
        <Stack
          sx={{
            py: 12,
            m: 'auto',
            maxWidth: 400,
            minHeight: '100vh',
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}

export const CompactErrorPage = ({
  error,
}: {
  error: {
    message: string;
  };
}) => {
  const chunkAssetsFile = /Unable to preload/;
  const chunkjsFile = /Failed to fetch/;

  if (error?.message && (chunkAssetsFile.test(error.message) || chunkjsFile.test(error.message))) {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
    return <LoadingScreen />;
  }

  return (
    <CompactLayout>
      <Page500 />
    </CompactLayout>
  );
};

export default CompactLayout;
