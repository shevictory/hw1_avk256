import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { CHART_TYPE_OPT_LIST, INITIAL_CHART_PARAMS } from './chartOptions';
import styles from './ChartContainer.module.css';
import FileParser from './FileParser';
import PlotData from './PlotData';
import ChartControls from './ChartControls';

const ChartContainer = () => {
  const [file, setFile] = useState(''); // It will store the file uploaded by the user
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(''); // It state will contain the error when correct file extension is not used

  const [plotType, setPlotType] = useState(INITIAL_CHART_PARAMS.plotType);
  const [xName, setXName] = useState(INITIAL_CHART_PARAMS.xName);
  const [yName, setYName] = useState(INITIAL_CHART_PARAMS.yName);
  const [color, setColor] = useState(INITIAL_CHART_PARAMS.color);

  useEffect(() => {
    if (file) {
      // Initialize a reader which allows user to read any file or blob.
      const reader = new FileReader();

      // Event listener on reader when the file loads, we parse it and set the data.
      reader.onload = ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        setParsedData(csv?.data);
      };
      reader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (parsedData.length) {
      setXName(Object.keys(parsedData[0])[0]);
      setYName(Object.keys(parsedData[0])[0]);
    }
  }, [parsedData]);

  const isParsedChartData = Boolean(
    parsedData.length && plotType.length && xName.length && yName.length
  );

  return (
    <div className={styles.row}>
      <div className={styles.menu}>
        <FileParser setError={setError} setFile={setFile} />
        {isParsedChartData && (
          <ChartControls
            chartAxisOptList={Object.keys(parsedData[0])}
            chartTypeOptList={CHART_TYPE_OPT_LIST}
            chartOpt={{ plotType, xName, yName, color }}
            setChartOpt={{ setPlotType, setXName, setYName, setColor }}
          />
        )}
      </div>
      {isParsedChartData && (
        <div className={styles.canvas}>
          <PlotData
            parsedData={parsedData}
            chartOpt={{ plotType, xName, yName, color }}
          />
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default ChartContainer;
