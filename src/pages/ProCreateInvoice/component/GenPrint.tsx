import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';

import { Button } from 'antd';

class PrintComponent extends Component {
  constructor(props: {} | Readonly<{}>) {
    super(props);
  }
  render() {
    return <>{this.props.children}</>;
  }
}
export default class GenPrint extends Component {
  componentRef: any;
  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.componentRef = React.createRef();
  }

  render() {
    return (
      <div>
        <div style={{ display: 'block' }}>
          <PrintComponent ref={(el) => (this.componentRef = el)} children={this.props.children} />
        </div>
        <ReactToPrint trigger={() => <Button>Print</Button>} content={() => this.componentRef!} />
      </div>
    );
  }
}

/*export const printHelper = (type, data) => {
    // document.getElementById('print-container').innerHTML = ''
    ReactDOM.render(<GenPrint type={type} data={data} />, document.getElementById('print-container'))
}*/
