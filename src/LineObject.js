import React, { Component } from "react";
import { InputNumber, Button, Input, Switch } from "antd";
class LineObject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={this.props.selected ? "selectedLineObj" : "lineObject"}
        style={{ fontSize: "14px" }}
        onClick={() => this.props.onClick(this.props.num)}
      >
        <div style={{ float: "right" }}>
          <Switch
            style={{}}
            checkedChildren=""
            unCheckedChildren=""
            size="small"
            onChange={bool => this.props.setDotted(this.props.num, bool)}
          />&nbsp;
          <Button
            style={{ height: "20px", marginRight: "2px" }}
            onClick={() => this.props.delete(this.props.num)}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </Button>
        </div>
        <p style={{}}>
          <i className="fa fa-arrows-h" aria-hidden="true" /> {this.props.num}
        </p>
        <p style={{}}>
          X: {this.props.p1x}, Y: {this.props.p1y}, Z: {this.props.p1z}
        </p>
        <p style={{}}>
          X: {this.props.p2x}, Y: {this.props.p2y}, Z: {this.props.p2z}
        </p>
      </div>
    );
  }
}
export default LineObject;
