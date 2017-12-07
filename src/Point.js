import React, { Component } from "react";

class Point extends Component {
  constructor(props) {
    super(props);
  }

  getX(x, y, xdeg, ydeg) {
    const xDiff = Math.cos(xdeg * Math.PI / 180) * x;
    const yDiff = Math.cos(ydeg * Math.PI / 180) * y;
    return xDiff + yDiff;
  }

  getY(x, y, z, xdeg, ydeg) {
    const xDiff = -Math.sin(xdeg * Math.PI / 180) * x;
    const yDiff = -Math.sin(ydeg * Math.PI / 180) * y;
    return xDiff + yDiff - z;
  }

  render() {
    return (
      <g>
        <circle
          r={
            this.props.selected
              ? (this.props.r * 1.5).toString().replace(",", ".")
              : this.props.r.toString().replace(",", ".")
          }
          cx={(this.props.ox +
            this.getX(
              this.props.cx,
              this.props.cy,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".") + "mm"}
          cy={(this.props.oy +
            this.getY(
              this.props.cx,
              this.props.cy,
              this.props.cz,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".") + "mm"}
          //fill={this.props.selected ? "#108ee9" : "#000"}
          fill={this.props.colore}
          onClick={e => this.props.onClick(this.props.num, e)}
          className={"pointcircle"}
          strokeWidth={this.props.selected ? "2px" : "0px"}
          stroke={this.props.selected ? "#108ee9" : "#000000"}
          opacity={this.props.visible ? "1" : "0"}
        />
        <text
          opacity={this.props.visible ? "1" : "0"}
          fill={this.props.colore}
          x={
            (this.props.ox +
            this.getX(
              this.props.cx,
              this.props.cy,
              this.props.xdeg,
              this.props.ydeg
            ) +
            this.props.r * 2 +
            this.props.xText - 4).toString() + "mm"
          }
          y={
            (this.props.oy +
            this.getY(
              this.props.cx,
              this.props.cy,
              this.props.cz,
              this.props.xdeg,
              this.props.ydeg
            ) -
            this.props.r * 2 +
            this.props.yText + 4).toString() + "mm"
          }
        >
          {this.props.text}
        </text>
      </g>
    );
  }
}

export default Point;
