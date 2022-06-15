import Plot from 'react-plotly.js';
import { typeMap } from './chartOptions';

function PlotData ({
  parsedData,
  chartOpt: { plotType, xName, yName, color },
}) {
  const userData = {
    x: parsedData.map(data => Number(data[xName])),
    y: parsedData.map(data => Number(data[yName])),
    name: yName,
    hovertemplate:
      yName + ' : %{y:.2f}<br>' + xName + ' : %{x:.2f}<extra></extra>',
    marker: { color: 'red' },
    ...typeMap.get(plotType),
  };

  return (
    <Plot
      data={[userData]}
      layout={{
        width: 1000,
        height: 500,
        title: plotType + ' ' + xName + ' vs. ' + yName,
        showlegend: true,
        xaxis: { title: xName },
        yaxis: { title: yName },
      }}
    />
  );
}

export default PlotData;
