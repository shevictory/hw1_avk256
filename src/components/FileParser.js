import React, { useState } from "react";
import Papa from "papaparse";
import DropList from './DropList';
import data from './data';

import Plot from 'react-plotly.js'
import './FileParser.css';

// Allowed extensions for input file
const allowedExtensions = ["csv"];
let drops = <div> </div>;
let chart = <div> </div>;

let processing = <div> </div>;

const FileParser = () => {
	
	// This state will store the parsed data
	const [data1, setData] = useState([]);
	// It state will contain the error when
	// correct file extension is not used
	const [error, setError] = useState("");
	
	// It will store the file uploaded by the user
	const [file, setFile] = useState("");

	console.log(file.path)

		
	if (data1.length > 0){
		console.log("columns")
		console.log(data1)
		console.log(typeof data1)
		drops = <div> <DropList name="X-Axis type" data={data1} />
		<DropList name="Y-Axis type" data={data1} />
		
		<DropList name="Chart type" data={['bar', 'lines', 'scatter', "pie"]} /> </div>;
		
	}


	const dataPrepare = (dataPlot, xName, yName, typeName) => {

		let x = dataPlot.map((data) => data[xName]);
		x = x.map((x)=>Number(x));
		let y = dataPlot.map((data) => data[yName]);
		y = y.map((y)=>Number(y));
		
		console.log(typeof x[1])
		console.log(x)
		console.log(y)
	

		let userData = {
			x: x,
			y: y,
			name: yName,
			hovertemplate: yName + ' : %{y:.2f}<br>' + xName + ' : %{x:.2f}<extra></extra>',
			marker: {color: 'red'},
		};

		if (typeName === 'lines'){
			userData['type'] = 'scatter';
			userData['mode'] = typeName+'markers';
			};
		if (typeName === 'scatter'){
			userData['type'] = 'scatter';
			userData['mode'] = 'markers';
			};
	

		if (typeName === 'bar'){
			userData['type'] = typeName;
			
			};
		
		if (typeName === 'pie'){
			userData['type'] = typeName;
			
			};
			
		
		return userData;
		
	};

	// This function will be called when
	// the file input changes
	const handleFileChange = (e) => {
		setError("");
		
		// Check if user has entered the file
		if (e.target.files.length) {
			const inputFile = e.target.files[0];
			
			// Check the file extensions, if it not
			// included in the allowed extensions
			// we show the error
			const fileExtension = inputFile?.type.split("/")[1];
			if (!allowedExtensions.includes(fileExtension)) {
				setError("Please input a csv file");
				return;
			}

			// If input type is correct set the state
			setFile(inputFile);
		}
		processing = <div>File loaded. Processing... </div>;
		alert("Click 'Parse CSV' to continue");
	};

	// This function will be called when
	// the parse button pressed	
	const handleParse = () => {
		
		// If user clicks the parse button without
		// a file we show a error
		if (!file) return setError("Enter a valid file");

		// Initialize a reader which allows user
		// to read any file or blob.
		const reader = new FileReader();
		
		
		// Event listener on reader when the file
		// loads, we parse it and set the data.
		reader.onload = async ({ target }) => {
			const csv = Papa.parse(target.result, { header: true });
			const parsedData = csv?.data;
			const columns = Object.keys(parsedData[0]);
			setData(columns);
			processing = <div> </div>;
			plotData(parsedData);
			// if ((parsedData.length>0) && (data.plotType.length>0)&& (data.xName.length>0)&& (data.yName.length>0)){
			// 	console.log('data.plotType');
			// 	console.log(data.plotType);
			// 	console.log('data.xName');
			// 	console.log(data.xName);
			// 	console.log('data.yName');
			// 	console.log(data.yName);
			// 	const userData = dataPrepare (parsedData, data.xName, data.yName, data.plotType);
			// 	console.log('userData');
			// 	console.log(userData);
			// 	chart = <Plot data={[userData]}
			// 			layout={ {width: 1000, height: 500, title: data.plotType + ' ' + data.xName +' vs. '+ data.yName, 
			// 					showlegend:true, xaxis:{title:data.xName }, yaxis:{title:data.yName }} } />;
				
			// 	data.plotType = '';
			// 	console.log(chart);
			// } else{
			// 	alert("Need to choose X,Y-Axis and Chart type!");
			// };
	
			
		};
		reader.readAsText(file);
		
	};

	const plotData = (parsedData) => {
		if ((parsedData.length>0) && (data.plotType.length>0)&& (data.xName.length>0)&& (data.yName.length>0)){
			console.log('data.plotType');
			console.log(data.plotType);
			console.log('data.xName');
			console.log(data.xName);
			console.log('data.yName');
			console.log(data.yName);
			const userData = dataPrepare (parsedData, data.xName, data.yName, data.plotType);
			console.log('userData');
			console.log(userData);
			chart = <Plot data={[userData]}
					layout={ {width: 1000, height: 500, title: data.plotType + ' ' + data.xName +' vs. '+ data.yName, 
							showlegend:true, xaxis:{title:data.xName }, yaxis:{title:data.yName }} } />;
			
			data.plotType = '';
			console.log(chart);
		} else{
			alert("Need to choose X,Y-Axis and Chart type!");
		};
	};

	
	return (
		<div className="row">
			<div className="menu">
				<label htmlFor="csvInput" style={{ display: "block" }}>
					Enter CSV File
				</label>
				<input
					onChange={handleFileChange}
					id="csvInput"
					name="file"
					type="File"
				/>
				<div>
					<p>
					<button onClick={handleParse}>Parse CSV</button>
					</p>
				</div>
				<div> 
					{processing}
				</div>
				<div> 
					{drops}
				</div>

				<div>
					<p>
					<button onClick={handleParse}>Plot</button>
					</p>
				</div>
				
			</div>
			<div className="canvas"> 
				{chart}
			</div>

		</div>
	);
};


export default FileParser;
