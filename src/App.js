import React from 'react';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      cols: null,
      rows: null,
      rows2: null,
      search: ""
    }
  }
  fileHandler = (event) => {
    let fileObj = event.target.files[0];

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if(err){
        console.log(err);            
      }
      else{
        this.setState({
          cols: resp.cols,
          rows: resp.rows
        });
        let t = "a-zA-Z0-9";
        console.log({
          ...this.state,
          rows: this.state.rows.filter((row) => RegExp('['+ t +']+').test(row[1]) )
        })
      }
    });
  }

  filterInputHandler = e => {
    e.preventDefault()
    this.setState({ search: e.target.value })
    // console.log(this.state.search)
    console.log(e.target.value)
    this.setState({
      rows2: this.state.rows.filter((row) => RegExp('['+ e.target.value +']+').test(row[1]) )
    })
  }

  render() {
    return(
      <div>
        <h1>Test excel</h1>
        <input type="file" onChange={this.fileHandler.bind(this)} style={{"padding":"10px"}} />
        <input type="text" className="form-control" onChange={ this.filterInputHandler } />
        {
          this.state.rows2 === null ? (
            <div>
              {
                this.state.rows !== null && this.state.cols !== null ? (
                  <OutTable data={this.state.rows} columns={this.state.cols} tableClassName="table table-bordered" tableHeaderRowClass="heading" />
                ) : (<span></span>)
              }
            </div>
          ) : (
            <div>
              {
                <OutTable data={this.state.rows2} columns={this.state.cols} tableClassName="table table-bordered" tableHeaderRowClass="heading" />
              }
            </div>
          )
        }
        
      </div>
    );
  }
}

export default App;
