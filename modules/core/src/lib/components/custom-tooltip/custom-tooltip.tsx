import { Tooltip, useTheme } from '@mui/material';

import { IToolTipBoxProps, TooltipBox } from '.';
import { paper } from '../../theme/css';

const CustomToolTip = ({ value, toolTips, toolTipHeading, children, ...props }: IToolTipBoxProps) => {
  const theme = useTheme();
  return (
    <Tooltip
      componentsProps={{
        tooltip: {
          sx: {
            boxShadow: theme.shadows[16],
            ...paper({ theme }),
            '& .MuiTooltip-arrow': {
              color: theme.palette.background.paper,
            },
            maxWidth: '360px',
          },
        },
      }}
      arrow
      {...props}
      title={<TooltipBox value={value} toolTipHeading={toolTipHeading} toolTips={toolTips} />}
    >
      {children}
    </Tooltip>
  );
};

export default CustomToolTip;
