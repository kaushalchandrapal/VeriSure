import { Box, List, ListItem, Typography, useTheme } from '@mui/material';
import * as Yup from 'yup';
import { IToolTipBoxProps, IToolTips } from '.';

const TooltipBox = ({ value, toolTips, toolTipHeading }: IToolTipBoxProps) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        maxWidth: '360px',
        bgcolor: 'transparent',
        px: 2,
        py: 12 / 8,
      }}
    >
      {toolTipHeading ? (
        <Typography variant="subtitle2" color={theme.palette.text.primary}>
          {toolTipHeading}
        </Typography>
      ) : null}
      <List
        sx={{
          listStyleType: 'disc',
          pl: 2,
          '& .MuiListItem-root': {
            display: 'list-item',
            color: theme.palette.text.secondary,
          },
          display: 'flex',
          flexDirection: 'column',
          gap: '.4rem',
        }}
      >
        {toolTips?.map((tip: IToolTips) => {
          const isValid: boolean =
            Yup.string()
              .matches(tip?.regex || '', '')
              .isValidSync(value) && !tip?.showFailed;
          return (
            <ListItem sx={{ p: 0 }} key={tip?.title}>
              <Typography variant="caption" color={!isValid ? theme.palette.error.main : ''}>
                {tip?.title}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default TooltipBox;
