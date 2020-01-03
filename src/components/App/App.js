import React from 'react';
import './App.css';
import Sidebar from '../Sidebar/Sidebar';
import {SketchField, Tools} from 'react-sketch';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeAlgos: [],
      queryResults: [],
      img: null
    }
    this.setActiveAlgos = this.setActiveAlgos.bind(this);
    this.getPredictions = this.getPredictions.bind(this);
    this.handleDrawingChange = this.handleDrawingChange.bind(this);
  }

  // this function sets active algos so that when query is made results
  // are collected from all algos that are active
  setActiveAlgos(algos) {
    console.log("Setting active algos");
    this.setState({
      activeAlgos: algos
    })
    console.log(algos);
  }

  // this function sends the base64 encoded png to the server to get predictions
  getPredictions() {
    console.log("Getting predictions");
    // fetch('localhost:5000/api/predictions', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     img: this.state.img
    //   })
    // })
  }

  handleDrawingChange(e) {
    console.log("Change to drawing")
    // console.log(e.target.getContext('2d'));
    let canvas = e.target
    var dataUrl = canvas.toDataURL();
    console.log(dataUrl);
    this.setState({
      img: dataUrl
    })
  }

  render() {
    return (
      <div className="container App m-0">
        <div className="row">

            <Sidebar setAlgos={this.setActiveAlgos}/>

            <div className="col-9 main m-0">
                {/* <h1 className="main-header">Select what algos you want to predict the number you draw!</h1> */}
                <div className="row">
                  <div className="col">
                    <h3 className="main-header">Custom Data</h3>
                    <SketchField 
                      width='280px' 
                      height='280px' 
                      tool={Tools.Pencil} 
                      lineColor='black'
                      backgroundColor='white'
                      lineWidth={3}
                      onChange={this.handleDrawingChange} />
                    <button className="query-button" onClick={this.getPredictions}>Get Predictions</button>
                  </div>
                  <div className="col">
                    <h3 className="main-header">Model Predictions</h3>
                    {this.state.queryResults.map(result => {
                      return (
                        <div className="prediction">
                          <h5 className="prediction-algo">{result.algo}</h5>
                          <p className="prediction-result">{result.prediction}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
            </div>

        </div>
    </div>
    )
  }
}

export default App;
