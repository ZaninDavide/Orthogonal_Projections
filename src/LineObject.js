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
          X:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p1x}
            onChange={value => this.props.setXYZ(this.props.num, 1, value)}
          />&nbsp; Y:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p1y}
            onChange={value => this.props.setXYZ(this.props.num, 2, value)}
          />&nbsp; Z:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p1z}
            onChange={value => this.props.setXYZ(this.props.num, 3, value)}
          />
        </p>
        <p style={{marginTop: "2px"}}>
          X:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p2x}
            onChange={value => this.props.setXYZ(this.props.num, 4, value)}
          />&nbsp; Y:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p2y}
            onChange={value => this.props.setXYZ(this.props.num, 5, value)}
          />&nbsp; Z:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.p2z}
            onChange={value => this.props.setXYZ(this.props.num, 6, value)}
          />
        </p>
      </div>
    );
  }
}
export default LineObject;
