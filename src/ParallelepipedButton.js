import React, { Component } from "react";
import { InputNumber, Modal, Button, Input, Switch } from "antd";
class ParallelepipedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onOKclick = this.onOKclick.bind(this);
    this.drawmodal = this.drawmodal.bind(this);
  }

  onOKclick() {
    //this.props.setProp(this.props.num, 9, -)
    this.props.close();
  }

  drawmodal(colors, widths, dotted) {
    let all = [];
    for (let x = 0; x <= 11; x++) {
      all.push(
        <p>
          Color:&nbsp;<Input value={colors[x]} style={{ width: "20%" }} />&nbsp;Width:&nbsp;<InputNumber
            value={widths[x]}
          />&nbsp;Dotted:&nbsp;<Switch value={dotted[x]} size={"small"} />
        </p>
      );
    }
    return all;
  }

  render() {
    return (
      <div style={{ display: "inline-block" }}>
        <i
          className="fa fa-cog"
          aria-hidden="true"
          onClick={this.props.onClickButton}
        />
        <Modal
          title="Settings"
          visible={this.props.settingsShowed}
          onOk={this.onOKclick}
          onCancel={() => this.props.close()}
          okText="OK"
          cancelText="Close"
        >
          {this.drawmodal(
            this.props.linescolors,
            this.props.lineswidth,
            this.props.linesdotted
          )}
        </Modal>
      </div>
    );
  }
}
export default ParallelepipedButton;
