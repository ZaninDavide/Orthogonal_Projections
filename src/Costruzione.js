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
          points={[
            [this.props.cx, this.props.cy, this.props.cz],
            [0, this.props.cy, this.props.cz]
          ]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[0, 0, this.props.cz], [0, 0, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
          points={[[0, this.props.cy, 0], [0, 0, 0]]}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[this.props.cx, 0, 0], [0, 0, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[
            [this.props.cx, this.props.cy, this.props.cz],
            [this.props.cx, 0, this.props.cz]
          ]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[
            [this.props.cx, this.props.cy, this.props.cz],
            [this.props.cx, this.props.cy, 0]
          ]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />

        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[0, this.props.cy, this.props.cz], [0, 0, this.props.cz]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[this.props.cx, 0, this.props.cz], [0, 0, this.props.cz]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[this.props.cx, this.props.cy, 0], [0, this.props.cy, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />

        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[0, this.props.cy, this.props.cz], [0, this.props.cy, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[this.props.cx, 0, this.props.cz], [this.props.cx, 0, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
        <Line
          linecolor="rgb(200,200,200)"
          ox={this.props.ox}
          oy={this.props.oy}
          onClick={() => ""}
          num={-2}
          selected={false}
          dotted={this.props.cDotted}
          points={[[this.props.cx, this.props.cy, 0], [this.props.cx, 0, 0]]}
          xdeg={this.props.xdeg}
          ydeg={this.props.ydeg}
        />
      </g>
    );
  }
}
export default Costruzione;
