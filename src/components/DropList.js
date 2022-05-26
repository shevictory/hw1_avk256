import React from 'react';
import data from './data';

class DropList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        value: props.data[0],
        columns: props.data,
        
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
   
  }

  handleSubmit(event) {
    if (this.props.name === "X-Axis type"){
      data.xName = this.state.value;
    }
    if (this.props.name === "Y-Axis type"){
      data.yName = this.state.value;
    }
    if (this.props.name === "Chart type"){
      data.plotType = this.state.value;
    }
    if (this.props.name === "Color"){
      data.color = this.state.value;
    }

    
    // console.log('From drop');
    // console.log(Object(this.state.value));
    // Object.freeze(data);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <p>
            {this.props.name}:
          </p>
          <select onChange={this.handleChange}>
            {this.state.columns.map(columns => (
                <option key={columns} >
                    {columns}
                </option>
            ))}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default DropList;
