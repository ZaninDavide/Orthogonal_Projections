import React, { Component } from "react";
import { InputNumber, Button, Input, Switch } from "antd";
class PointObject extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={
          this.props.selected
            ? "parallelepipedObjectSelected"
            : "parallelepipedObject"
        }
        style={{ fontSize: "14px", overflow: "hidden", paddingLeft: "5px" }}
        onClick={e => {
          e.stopPropagation();
          this.props.onClick(this.props.num);
        }}
      >
        <div style={{ float: "right" }}>
          <button
            style={{
              height: "20px",
              marginRight: "2px",
              backgroundColor: "transparent",
              border: "0px"
            }}
            onClick={() => this.props.delete(this.props.num)}
          >
            <i className="fa fa-times" aria-hidden="true" />
          </button>
        </div>{" "}
        <p style={{ marginBottom: "6px" }}>
          <i className={"fa fa-cube"} aria-hidden="true" />
          &nbsp;<input
            placeholder="Text"
            style={{
              width: "calc(100% - 100px)",
              height: "20px",
              border: "0px",
              backgroundColor: "transparent",
              outline: "none"
            }}
            value={this.props.text}
            onChange={e => this.props.setText(this.props.num, e.target.value)}
          />
        </p>
        <p>Position:</p>
        <p style={{}}>
          X:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.x}
            onChange={value => this.props.setProp(this.props.num, 1, value)}
          />&nbsp; Y:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.y}
            onChange={value => this.props.setProp(this.props.num, 2, value)}
          />&nbsp; Z:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.z}
            onChange={value => this.props.setProp(this.props.num, 3, value)}
          />
        </p>
        <p>Size:</p>
        <p style={{}}>
          X:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.mx}
            onChange={value => this.props.setProp(this.props.num, 4, value)}
          />&nbsp; Y:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.my}
            onChange={value => this.props.setProp(this.props.num, 5, value)}
          />&nbsp; Z:{" "}
          <InputNumber
            style={{ width: "calc((100% - 90px) / 3)" }}
            value={this.props.mz}
            onChange={value => this.props.setProp(this.props.num, 6, value)}
          />
        </p>
      </div>
    );
  }
}
export default PointObject;
