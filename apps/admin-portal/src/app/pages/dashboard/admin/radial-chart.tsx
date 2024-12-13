import { styled } from '@mui/material/styles';
import { Chart, fNumber, useChart } from '@verisure-core';


// ----------------------------------------------------------------------

const CHART_HEIGHT = 380;

const LEGEND_HEIGHT = 72;

const StyledChart = styled(Chart)(({ theme }) => ({
  height: CHART_HEIGHT,
  '& .apexcharts-canvas, .apexcharts-inner, svg, foreignObject': {
    height: `100% !important`,
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    marginBottom: theme.spacing(3),
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));

// ----------------------------------------------------------------------

type Props = {
  series: number[];
  labels: string[];
  colors: string[];
};

export default function ChartRadialBar({ series, labels, colors }: Props) {
  const chartOptions = useChart({
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    labels,
    colors,
    legend: {
      floating: true,
      position: 'bottom',
      horizontalAlign: 'center',
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '68%',
        },
        dataLabels: {
          name: {
            show: true,
            fontSize: '16px',
          },
          value: {
            show: true,
            fontSize: '22px',
            offsetY: 16,
            formatter: (val) => fNumber(val), // Show value instead of percentage
          },
          total: {
            show: true,
            label: 'Total',
            fontSize: '16px',
            formatter: () => fNumber(series.reduce((a, b) => a + b, 0)), // Show the sum of the series at the center
          },
        },
      },
    },
    tooltip: {
      enabled: false,
    }
  });

  return (
    <StyledChart
      dir="ltr"
      type="radialBar"
      series={series}
      options={chartOptions}
      width="100%"
      height={280}
    />
  );
}
