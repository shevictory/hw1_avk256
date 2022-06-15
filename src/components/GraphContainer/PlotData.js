import Plot from 'react-plotly.js';

const typeMap = new Map();
typeMap.set('lines', { type: 'scatter', mode: 'lines markers' });
typeMap.set('scatter', { type: 'scatter', mode: 'markers' });
typeMap.set('bar', { type: 'bar' });
typeMap.set('pie', { type: 'pie' });

function PlotData ({
  parsedData,
  graphOpt /*: { plotType, xName, yName, color }*/,
}) {
  console.log('parsedData plotdata', parsedData);
  console.log('graphOpt plotdata', graphOpt);
  const dataPrepare = (dataPlot, xName, yName, typeName) => {
    let userData = {
      x: dataPlot.map(data => Number(data[xName])),
      y: dataPlot.map(data => Number(data[yName])),
      name: yName,
      hovertemplate:
        yName + ' : %{y:.2f}<br>' + xName + ' : %{x:.2f}<extra></extra>',
      marker: { color: 'red' },
    };

    userData = { ...userData, ...typeMap.get(typeName) };
    return userData;
  };

  let userData = [];

  if (
    parsedData.length &&
    graphOpt.plotType.length &&
    graphOpt.xName.length &&
    graphOpt.yName.length
  ) {
    userData = dataPrepare(
      parsedData,
      graphOpt.xName,
      graphOpt.yName,
      graphOpt.plotType
    );

    // graphOpt.plotType = '';
  } else {
    // alert('Need to choose X,Y-Axis and Chart type!');
    console.log('Need to choose X,Y-Axis and Chart type!');
  }

  console.log('userData', userData);

  return (
    <Plot
      data={[userData]}
      layout={{
        width: 1000,
        height: 500,
        title:
          graphOpt.plotType + ' ' + graphOpt.xName + ' vs. ' + graphOpt.yName,
        showlegend: true,
        xaxis: { title: graphOpt.xName },
        yaxis: { title: graphOpt.yName },
      }}
    />
  );
}

export default PlotData;
