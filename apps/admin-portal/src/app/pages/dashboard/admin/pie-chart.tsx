import { Chart, useChart } from "@verisure-core";
import { Box, Typography } from "@mui/material";

type Props = {
  series: number[];
  labels: string[];
  colors: string[];
};

export default function ChartPie({ series, labels, colors }: Props) {
  console.log(series);
  console.log(labels);

  const chartOptions = useChart({
    labels,
    colors,
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: true,
      dropShadow: {
        enabled: false,
      },
    },
    tooltip: {
      fillSeriesColor: false,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: false,
          },
        },
      },
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Chart
        dir="ltr"
        type="pie"
        series={series}
        options={chartOptions}
        width={400}
        height={280}
      />
      {/* Custom Legend */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        {labels.map((label, index) => (
          <Box
            key={label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                backgroundColor: chartOptions.colors
                  ? chartOptions.colors[index]
                  : `var(--apexcharts-color-${index})`, // Use ApexCharts color
              }}
            />
            <Typography variant="body2">{label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
