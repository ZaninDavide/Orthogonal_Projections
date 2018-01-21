import React, { Component } from "react";
class Cerchio extends Component {
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

  generate(source, target) {
    var transform = [
      {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: target[2].x,
        f: target[2].y
      },
      {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        e: -source[2].x,
        f: -source[2].y
      }
    ];
    source = source.map(point => ({
      x: point.x - source[2].x,
      y: point.y - source[2].y
    }));
    target = target.map(point => ({
      x: point.x - source[2].x,
      y: point.y - source[2].y
    }));

    var div = source[0].x * source[1].y - source[1].x * source[0].y;
    var matrix = {
      a: (target[0].x * source[1].y - target[1].x * source[0].y) / div,
      b: (target[0].y * source[1].y - target[1].y * source[0].y) / div,
      c: (target[1].x * source[0].x - target[0].x * source[1].x) / div,
      d: (target[1].y * source[0].x - target[0].y * source[1].x) / div,
      e: 0,
      f: 0
    };
    transform.splice(1, 0, matrix);

    return transform.reduce(
      function(m1, m2) {
        return {
          a: m1.a * m2.a + m1.c * m2.b,
          b: m1.b * m2.a + m1.d * m2.b,
          c: m1.a * m2.c + m1.c * m2.d,
          d: m1.b * m2.c + m1.d * m2.d,
          e: m1.a * m2.e + m1.c * m2.f + m1.e,
          f: m1.b * m2.e + m1.d * m2.f + m1.f
        };
      },
      { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 }
    );
  }

  arc_transform(transform, arc) {
    var co = Math.cos(arc.rotation / 180 * Math.PI),
      si = Math.sin(arc.rotation / 180 * Math.PI);
    var m = [
      arc.rx * (transform.a * co + transform.c * si),
      arc.rx * (transform.b * co + transform.d * si),
      arc.ry * (transform.c * co - transform.a * si),
      arc.ry * (transform.d * co - transform.b * si)
    ];
    var A = m[0] * m[0] + m[2] * m[2],
      B = 2 * (m[0] * m[1] + m[2] * m[3]),
      C = m[1] * m[1] + m[3] * m[3],
      K = Math.sqrt((A - C) * (A - C) + B * B);

    if (transform.a * transform.d - transform.b * transform.c < 0) {
      arc.sweep = !arc.sweep;
    }

    return {
      rx: Math.sqrt(0.5 * (A + C + K)),
      ry: Math.sqrt(0.5 * Math.max(0, A + C - K)),
      rotation:
        Math.abs((A - C) / B) < 1e-6 ? 90 : Math.atan2(B, A - C) * 90 / Math.PI,
      large: arc.large,
      sweep: arc.sweep,
      x: transform.a * arc.x + transform.c * arc.y + transform.e,
      y: transform.b * arc.x + transform.d * arc.y + transform.f
    };
  }

  getArcPO(xradius, yradius, ox, oy, oz, xdeg, ydeg) {
    let s0 = [ox - xradius, oy - yradius, oz];
    let s1 = [ox + xradius, oy + yradius, oz];
    let s2 = [ox - xradius, oy + yradius, oz];
    let t0 = [
      this.getX(s0[0], s0[1], xdeg, ydeg),
      this.getY(s0[0], s0[1], s0[2], xdeg, ydeg)
    ];
    let t1 = [
      this.getX(s1[0], s1[1], xdeg, ydeg),
      this.getY(s1[0], s1[1], s1[2], xdeg, ydeg)
    ];
    let t2 = [
      this.getX(s2[0], s2[1], xdeg, ydeg),
      this.getY(s2[0], s2[1], s2[2], xdeg, ydeg)
    ];
    let tran = this.generate(
      [{ x: s0[0], y: s0[1] }, { x: s1[0], y: s1[1] }, { x: s2[0], y: s2[1] }],
      [{ x: t0[0], y: t0[1] }, { x: t1[0], y: t1[1] }, { x: t2[0], y: t2[1] }]
    );

    const arc = this.arc_transform(tran, {
      rx: xradius,
      ry: yradius,
      xdeg: xdeg,
      large: true,
      sweep: true,
      rotation: xdeg,
      x: 0,
      y: 0
    });

    console.log(arc);
    return (
      <path
        d={`M ${this.props.axesx} ${this.props.axesy} a ${arc.rx} ${arc.ry} ${
          arc.rotation
        } ${+arc.large} ${+arc.sweep} ${arc.x} ${arc.y}`}
        stroke="black"
        fill="green"
        strokeWidth="2"
        fillOpacity="0.5"
      />
    );
  }

  render() {
    return (
      <g className="cerchio">
        {this.getArcPO(
          this.props.rx,
          this.props.ry,
          this.props.ox,
          this.props.oy,
          this.props.oz,
          this.props.xdeg,
          this.props.ydeg
        )}
      </g>
    );
  }
}
export default Cerchio;
