import React, { Component } from "react";

class Parallelepiped extends Component {
  constructor(props) {
    super(props);
    this.drawParallelepiped = this.drawParallelepiped.bind(this);
    this.getPoint = this.getPoint.bind(this);
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

  getPoint(x, y, z) {
    return [
      this.getX(
        this.fromMmToPx(x),
        this.fromMmToPx(y),
        this.props.xdeg,
        this.props.ydeg
      ) + this.fromMmToPx(this.props.ox),
      this.getY(
        this.fromMmToPx(x),
        this.fromMmToPx(y),
        this.fromMmToPx(z),
        this.props.xdeg,
        this.props.ydeg
      ) + this.fromMmToPx(this.props.oy)
    ];
  }

  drawParallelepiped(x, y, z, mx, my, mz) {
    return (
      <path
        onClick={() => this.props.onClick(this.props.num)}
        stroke={
          this.props.selected
            ? "#108ee9"
            : this.props.linecolor ? this.props.linecolor : "#000"
        }
        fill={"none"}
        d={`M ${this.getPoint(x, y, z)[0]},${this.getPoint(x, y, z)[1]} ${
          this.getPoint(x, y + my, z)[0]
        },${this.getPoint(x, y + my, z)[1]} ${
          this.getPoint(x + mx, y + my, z)[0]
        },${this.getPoint(x + mx, y + my, z)[1]} ${
          this.getPoint(x + mx, y, z)[0]
        },${this.getPoint(x + mx, y, z)[1]} ${this.getPoint(x, y, z)[0]},${
          this.getPoint(x, y, z)[1]
        } M ${this.getPoint(x, y, z + mz)[0]},${
          this.getPoint(x, y, z + mz)[1]
        } ${this.getPoint(x, y + my, z + mz)[0]},${
          this.getPoint(x, y + my, z + mz)[1]
        } ${this.getPoint(x + mx, y + my, z + mz)[0]},${
          this.getPoint(x + mx, y + my, z + mz)[1]
        } ${this.getPoint(x + mx, y, z + mz)[0]},${
          this.getPoint(x + mx, y, z + mz)[1]
        } ${this.getPoint(x, y, z + mz)[0]},${this.getPoint(x, y, z + mz)[1]} 
        M ${this.getPoint(x, y, z)[0]},${this.getPoint(x, y, z)[1]}  ${
          this.getPoint(x, y, z + mz)[0]
        },${this.getPoint(x, y, z + mz)[1]}
        M ${this.getPoint(x, y + my, z)[0]},${
          this.getPoint(x, y + my, z)[1]
        }  ${this.getPoint(x, y + my, z + mz)[0]},${
          this.getPoint(x, y + my, z + mz)[1]
        } 
        M ${this.getPoint(x + mx, y, z)[0]},${this.getPoint(x + mx, y, z)[1]} ${
          this.getPoint(x + mx, y, z + mz)[0]
        },${this.getPoint(x + mx, y, z + mz)[1]}
        M  ${this.getPoint(x + mx, y + my, z)[0]},${
          this.getPoint(x + mx, y + my, z)[1]
        } ${this.getPoint(x + mx, y + my, z + mz)[0]},${
          this.getPoint(x + mx, y + my, z + mz)[1]
        } `}
      />
    );
  }

  render() {
    return (
      <g className="parallelepiped">
        {this.drawParallelepiped(
          this.props.x,
          this.props.y,
          this.props.z,
          this.props.mx,
          this.props.my,
          this.props.mz
        )}
      </g>
    );
  }
}

export default Parallelepiped;
