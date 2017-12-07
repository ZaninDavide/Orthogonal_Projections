import React, { Component } from "react";
import { InputNumber, Modal, Button, Input } from "antd";
class NewPointButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
        buttonx: 0,
        buttony: 0,
        buttonz: 0,
        newname: "New Point"
    }
    this.onOKclick = this.onOKclick.bind(this);
  }

  onOKclick(){
    this.props.addPoint(this.state.buttonx, this.state.buttony, this.state.buttonz, this.state.newname);
    this.props.close();
  }

  render() {
    return (
        <div style={{ display: "inline-block" }}>
            <Button type="primary" onClick={this.props.onClickButton}>New point</Button>
            <Modal
                title="Create new point"
                visible={this.props.visible}
                onOk={this.onOKclick}
                onCancel={() => this.props.close()}
                okText="Create"
                cancelText="Cancel"
            >
                X:&nbsp;
                <InputNumber
                    style={{ marginRight: "3px" }}
                    parser={value => value.replace("mm", "")}
                    formatter={value => `${value}mm`}
                    value={this.state.buttonx}
                    min={-200000}
                    max={200000}
                    onChange={value => this.setState({ buttonx: value })}
                />
                Y:&nbsp;
                <InputNumber
                    style={{ marginRight: "3px" }}
                    parser={value => value.replace("mm", "")}
                    formatter={value => `${value}mm`}
                    value={this.state.buttony}
                    min={-200000}
                    max={200000}
                    onChange={value => this.setState({ buttony: value })}
                />
                Z:&nbsp;
                <InputNumber
                    style={{ marginRight: "3px" }}
                    parser={value => value.replace("mm", "")}
                    formatter={value => `${value}mm`}
                    value={this.state.buttonz}
                    min={-200000}
                    max={200000}
                    onChange={value => this.setState({ buttonz: value })}
                /><br /><br />
                <Input placeholder="Point name" 
                    value={this.state.newname}
                    onChange={e => this.setState({newname: e.target.value})}
                />
            </Modal>
      </div>
    );
  }
}
export default NewPointButton;