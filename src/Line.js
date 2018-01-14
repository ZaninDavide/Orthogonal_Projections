import React, { Component } from "react";
class Line extends Component {
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

  fromMmToPx(mm) {
    return mm * 3.779528;
  }

  render() {
    return (
      <path
        d={
          /*"M " +
          this.fromMmToPx(this.props.ox +
            this.getX(
              this.props.p1x,
              this.props.p1y,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".") +
          "," +
          this.fromMmToPx(this.props.oy +
            this.getY(
              this.props.p1x,
              this.props.p1y,
              this.props.p1z,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".") +
          " " +
          this.fromMmToPx(this.props.ox +
            this.getX(
              this.props.p2x,
              this.props.p2y,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".") +
          "," +
          this.fromMmToPx(this.props.oy +
            this.getY(
              this.props.p2x,
              this.props.p2y,
              this.props.p2z,
              this.props.xdeg,
              this.props.ydeg
            )
          )
            .toString()
            .replace(",", ".")*/
          this.props.points.reduce((tot, cur) => {
            return (
              tot +
              " " +
              (this.fromMmToPx(
                this.props.ox +
                  this.getX(cur[0], cur[1], this.props.xdeg, this.props.ydeg)
              )
                .toString()
                .replace(",", ".") +
                "," +
                this.fromMmToPx(
                  this.props.oy +
                    this.getY(
                      cur[0],
                      cur[1],
                      cur[2],
                      this.props.xdeg,
                      this.props.ydeg
                    )
                )
                  .toString()
                  .replace(",", "."))
            );
          }, "M")
        }
        stroke={
          this.props.selected
            ? "#108ee9"
            : this.props.linecolor ? this.props.linecolor : "#000"
        }
        fill={"none"}
        onClick={() => this.props.onClick(this.props.num)}
        strokeDasharray={this.props.dotted ? "15, 5" : ""}
        className={"linepath"}
      />
    );
  }
}
export default Line;
