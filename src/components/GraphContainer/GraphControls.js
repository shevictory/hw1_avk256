import React from 'react';
import DropList from './DropList';

function GraphControls ({
  graphOptList,
  graphOpt: { plotType, xName, yName, color },
  setGraphOpt: { setPlotType, setXName, setYName, setColor },
}) {
  // console.log('graphOpt', graphOpt);
  return (
    <div>
      {graphOptList.length && (
        <>
          <DropList
            name='X-Axis type'
            optionsList={graphOptList}
            value={xName}
            setValue={setXName}
          />
          <DropList
            name='Y-Axis type'
            optionsList={graphOptList}
            value={yName}
            setValue={setYName}
          />
          <DropList
            name='Chart type'
            optionsList={['bar', 'lines', 'scatter', 'pie']}
            value={plotType}
            setValue={setPlotType}
          />
        </>
      )}
    </div>
  );
}

export default GraphControls;
