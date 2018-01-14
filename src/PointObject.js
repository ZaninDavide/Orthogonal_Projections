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
            ? this.props.extended
              ? "selectedPointObjExtended "
              : "selectedPointObj"
            : this.props.extended ? "pointObjectExtended " : "pointObject"
        }
        style={{ fontSize: "14px", overflow: "hidden", paddingLeft: "5px" }}
        onClick={e => {
          e.stopPropagation();
          this.props.onClick(this.props.num, e);
        }}
      >
        <div style={{ float: "right" }}>
          <Switch
            checkedChildren=""
            unCheckedChildren=""
            size="small"
            onChange={bool => this.props.setCostruzione(this.props.num, bool)}
          />&nbsp;
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
        </div>
        <p style={{ marginBottom: "6px" }}>
          <i
            className={
              this.props.visible ? "fa fa-dot-circle-o" : "fa fa-circle-o"
            }
            onClick={() =>
              this.props.setVisible(this.props.num, !this.props.visible)
            }
            aria-hidden="true"
          />
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
        <p style={{}}>
          X:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.x}
            onChange={value => this.props.setXYZ(this.props.num, 1, value)}
          />&nbsp; Y:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.y}
            onChange={value => this.props.setXYZ(this.props.num, 2, value)}
          />&nbsp; Z:{" "}
          <InputNumber
            style={{ width: "15%" }}
            value={this.props.z}
            onChange={value => this.props.setXYZ(this.props.num, 3, value)}
          />
        </p>
        {this.props.extended ? (
          <i
            style={{
              position: "relative",
              top: "130px",
              left: "calc(50% - 4.5px)"
            }}
            className="fa fa-angle-up"
            aria-hidden="true"
            onClick={() => this.props.setExtended(this.props.num, false)}
          />
        ) : (
          <i
            className="fa fa-angle-down"
            aria-hidden="true"
            style={{
              position: "relative",
              top: "0px",
              left: "calc(50% - 4.5px)"
            }}
            onClick={() => this.props.setExtended(this.props.num, true)}
          />
        )}
        <br />
        Color:{" "}
        <Input
          placeholder="#000000 / rgb(0, 0, 0)"
          style={{ width: "40%" }}
          value={this.props.colore}
          onChange={e => this.props.setColor(this.props.num, e.target.value)}
        />
        <br />
        TextLocation:<br />
        &nbsp;&nbsp;X:{" "}
        <InputNumber
          value={this.props.xText}
          onChange={value =>
            this.props.setTextLocation(this.props.num, 10, value)
          }
          style={{ width: "30%" }}
        />
        &nbsp;&nbsp;Y:{" "}
        <InputNumber
          value={this.props.yText}
          onChange={value =>
            this.props.setTextLocation(this.props.num, 11, value)
          }
          style={{ width: "30%" }}
        />
        <br />
        Construction dotted:{" "}
        <Switch
          checkedChildren=""
          unCheckedChildren=""
          size="small"
          onChange={bool => this.props.setcDotted(this.props.num, bool)}
        />
      </div>
    );
  }
}
export default PointObject;
