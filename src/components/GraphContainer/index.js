import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import CONSTANTS from '../../constants';
import styles from './GraphContainer.module.css';
import FileParser from './FileParser';
import PlotData from './PlotData';
import GraphControls from './GraphControls';

const { INITIAL_GRAPH_PARAMS } = CONSTANTS;

let processing = <div> </div>;

const GraphContainer = () => {
  const [file, setFile] = useState(''); // It will store the file uploaded by the user
  // const [data1, setData] = useState([]); // This state will store the parsed data
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(''); // It state will contain the error when correct file extension is not used

  const [plotType, setPlotType] = useState(INITIAL_GRAPH_PARAMS.plotType);
  const [xName, setXName] = useState(INITIAL_GRAPH_PARAMS.xName);
  const [yName, setYName] = useState(INITIAL_GRAPH_PARAMS.yName);
  const [color, setColor] = useState(INITIAL_GRAPH_PARAMS.color);

  console.log('file', file);
  // If user clicks the parse button without
  // a file we show a error
  useEffect(() => {
    if (!file) {
      return setError('Enter a valid file');
    } else {
      // Initialize a reader which allows user
      // to read any file or blob.
      const reader = new FileReader();

      // Event listener on reader when the file
      // loads, we parse it and set the data.
      reader.onload = /*async*/ ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        // const parsedData = csv?.data;
        setParsedData(csv?.data);

        // const columns = Object.keys(parsedData[0]);
        // setData(columns);
        // processing = <div> </div>;
        // plotData(parsedData);
      };
      reader.readAsText(file);
    }
  }, [file]);

  useEffect(() => {
    if (parsedData.length) {
      setXName(Object.keys(parsedData[0])[0]);
      setYName(Object.keys(parsedData[0])[0]);
      setPlotType('bar');
    }
  }, [parsedData]);

  return (
    <div className={styles.row}>
      <div className={styles.menu}>
        <FileParser
          setError={setError}
          // handleParse={handleParse}
          setFile={setFile}
        />
        {/* <div>{processing}</div> */}
        {parsedData.length && (
          <GraphControls
            graphOptList={Object.keys(parsedData[0])}
            graphOpt={{ plotType, xName, yName, color }}
            setGraphOpt={{ setPlotType, setXName, setYName, setColor }}
          />
        )}

        <div>
          <p>{/* <button onClick={handleParse}>Plot</button> */}</p>
        </div>
      </div>
      {parsedData.length && plotType.length && xName.length && yName.length && (
        <div className={styles.canvas}>
          <PlotData
            parsedData={parsedData}
            graphOpt={{ plotType, xName, yName, color }}
          />
        </div>
      )}
    </div>
  );
};

export default GraphContainer;
