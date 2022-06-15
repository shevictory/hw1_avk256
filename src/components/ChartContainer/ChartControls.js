import React from 'react';
import DropList from './DropList';

function ChartControls ({
  chartAxisOptList,
  chartTypeOptList,
  chartOpt: { plotType, xName, yName, color },
  setChartOpt: { setPlotType, setXName, setYName, setColor },
}) {
  return (
    <div>
      {chartAxisOptList.length && (
        <>
          <DropList
            name='X-Axis type'
            optionsList={chartAxisOptList}
            value={xName}
            setValue={setXName}
          />
          <DropList
            name='Y-Axis type'
            optionsList={chartAxisOptList}
            value={yName}
            setValue={setYName}
          />
          <DropList
            name='Chart type'
            optionsList={chartTypeOptList}
            value={plotType}
            setValue={setPlotType}
          />
        </>
      )}
    </div>
  );
}

export default ChartControls;
