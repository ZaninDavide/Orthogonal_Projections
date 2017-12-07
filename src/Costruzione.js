import React, { Component } from "react";
import Line from "./Line";
class Costruzione extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <g className="costruzione">
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={this.props.cy}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={0}
          p2y={this.props.cy}
          p2z={this.props.cz}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={this.props.cy}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={this.props.cx}
          p2y={0}
          p2z={this.props.cz}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={this.props.cy}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={this.props.cx}
          p2y={this.props.cy}
          p2z={0}
        />

        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={0}
          p1y={this.props.cy}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={0}
          p2y={0}
          p2z={this.props.cz}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={0}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={0}
          p2y={0}
          p2z={this.props.cz}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={this.props.cy}
          p1z={0}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={0}
          p2y={this.props.cy}
          p2z={0}
        />

        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={0}
          p1y={this.props.cy}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={0}
          p2y={this.props.cy}
          p2z={0}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={0}
          p1z={this.props.cz}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={this.props.cx}
          p2y={0}
          p2z={0}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          p1x={this.props.cx}
          p1y={this.props.cy}
          p1z={0}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          p2x={this.props.cx}
          p2y={0}
          p2z={0}
        />
      </g>
    );
  }
}
export default Costruzione;
