import React, { Component } from "react";
import Point from "./Point";
import Line from "./Line";
import LineObject from "./LineObject";
import PointObject from "./PointObject";
import Costruzione from "./Costruzione";
import NewPointButton from "./NewPointButton";
import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { InputNumber, Button, Input, Switch } from "antd";
import "antd/dist/antd.css";
import panzoom from "svg-pan-zoom";

let keynum = 0;
let first = true;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawaxes: true,
      xdeg: 210,
      ydeg: 300,
      points: [
        [10, 20, 30, false, "keyc", false, "#000000", true, "Point 1", 0, 0, false],
        [50, 200, 60, false, "keyb", false, "#000000", true, "Point 2", 0, 0, false],
        [70, 80, 80, false, "keya", false, "#000000", true, "Point 3", 0, 0, false]
      ],
      lines: [[10, 20, 30, 50, 200, 60, false, "keyd"]],
      seledtedpoint: 0,
      ox: 265, //5/12*window.innerWidth,
      oy: 265, //(window.innerHeight-75)/2,
      buttonx: 0,
      buttony: 0,
      buttonz: 0,
      newPointDialogShowed: false,
    };
    this.delete = this.delete.bind(this);
    this.deleteline = this.deleteline.bind(this);
    this.objPointOnClick = this.objPointOnClick.bind(this);
    this.objLineOnClick = this.objLineOnClick.bind(this);
    this.setDotted = this.setDotted.bind(this);
    this.download = this.download.bind(this);
    this.getSVG = this.getSVG.bind(this);
    this.setCostruzione = this.setCostruzione.bind(this);
    this.eventresize = this.eventresize.bind(this);
    this.setExtended = this.setExtended.bind(this);
    this.setColor = this.setColor.bind(this);
    this.setXYZ = this.setXYZ.bind(this);
    this.setVisible = this.setVisible.bind(this);
    this.setText = this.setText.bind(this);
    this.setcDotted = this.setcDotted.bind(this);
    this.setTextLocation = this.setTextLocation.bind(this);
    this.addPoint = this.addPoint.bind(this);
    window.addEventListener("resize", this.eventresize);
  }

  eventresize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    //this.setState({ox: 5/12*w, oy: (h-75)/2})
  }

  delete(num) {
    this.setState(function(state, props) {
      return { points: state.points.filter((x, id) => id !== num) };
    });
  }

  deleteline(num) {
    this.setState(function(state, props) {
      return { lines: state.lines.filter((x, id) => id !== num) };
    });
  }

  objPointOnClick(num, e) {
    e.stopPropagation();
    if (
      e.shiftKey === true &&
      this.state.seledtedpoint < this.state.points.length &&
      num < this.state.points.length
    ) {
      let p1 = this.state.points[this.state.seledtedpoint];
      let p2 = this.state.points[num];
      this.setState({
        lines: [
          ...this.state.lines,
          [p1[0], p1[1], p1[2], p2[0], p2[1], p2[2], false, ++keynum]
        ]
      });
    }
    if (this.state.seledtedpoint !== num) {
      this.setState({ seledtedpoint: num });
    } else {
      this.setState({ seledtedpoint: -1 });
    }
  }

  objLineOnClick(num) {
    if (this.state.seledtedpoint !== num + this.state.points.length) {
      this.setState({ seledtedpoint: num + this.state.points.length });
    } else {
      this.setState({ seledtedpoint: -1 });
    }
  }

  setDotted(num, bool) {
    let ls = [...this.state.lines];
    ls[num][6] = bool;
    this.setState({ lines: ls });
  }

  setExtended(num, bool) {
    let p = [...this.state.points];
    p[num][5] = bool;
    this.setState({ points: p });
  }

  setCostruzione(num, bool) {
    let ls = [...this.state.points];
    ls[num][3] = bool;
    this.setState({ points: ls });
  }

  setColor(num, val) {
    let p = [...this.state.points];
    p[num][6] = val;
    this.setState({ points: p });
  }

  setXYZ(num, xyz, val) {
    let p = [...this.state.points];
    p[num][xyz] = val;
    this.setState({ points: p });
  }

  setVisible(num, bool) {
    let p = [...this.state.points];
    p[num][7] = bool;
    this.setState({ points: p });
  }

  setcDotted(num, bool) {
    let p = [...this.state.points];
    p[num][11] = bool;
    this.setState({ points: p });
  }

  setText(num, val) {
    let p = [...this.state.points];
    p[num][8] = val;
    this.setState({ points: p });
  }

  setTextLocation(num, xy, val) {
    let p = [...this.state.points];
    p[num][xy] = val;
    this.setState({ points: p });
  }

  setNewButtonDialog(bool){
    this.setState({newPointDialogShowed: bool});
  }

  download() {
    var svgString = new XMLSerializer().serializeToString(
      document.querySelector("svg")
    );

    var canvas = document.getElementById("svgCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = "2000";//5 / 6 * window.innerWidth;
    canvas.height = "2000";//window.innerHeight - 75;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var DOMURL = window.URL || window.webkitURL || window;
    var img = new Image();
    var svg = new Blob([svgString], {
      type: "image/svg+xml;charset=utf-8"
    });
    var url = DOMURL.createObjectURL(svg);
    img.onload = function() {
      ctx.drawImage(img, 0, 0);
      var imgURL = canvas.toDataURL("image/png");
      DOMURL.revokeObjectURL(imgURL);
      var dlLink = document.createElement("a");
      dlLink.download = "Project";
      dlLink.href = imgURL;
      dlLink.dataset.downloadurl = [
        "image/png",
        dlLink.download,
        dlLink.href
      ].join(":");
      document.body.appendChild(dlLink);
      dlLink.click();
      document.body.removeChild(dlLink);
    };
    img.src = url;
  }

  getSVG() {
    var svgData = document.getElementById("svgContainer").innerHTML;
    var svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "Project.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  addPoint(x, y, z, name = "New Point") {
    let points = this.state.points;
    this.setState({
      points: [
        ...points,
        [
          x,
          y,
          z,
          false,
          ++keynum,
          false,
          "#000000",
          true,
          name,
          0,
          0,
          false
        ]
      ]
    })
  }

  componentDidMount() {
    if (first) {
      let element = document.getElementById("svgContainer");
      element.scrollTop = (element.scrollHeight - element.clientHeight) / 2;
      element.scrollLeft = (element.scrollWidth - element.clientWidth) / 2;
      first = false;
      /*panzoom("#svgObject",
        {zoomEnabled: true,
        center: true}
      )*/
    }
  }

  render() {
    const { points, buttonx, buttony, buttonz } = this.state;
    return (
      <div>
        <div className="settings row">
          <i className="fa fa-diamond fa-4x" aria-hidden="true" />
          <span style={{ marginRight: "3px" }}>
            <i className="fa fa-repeat" aria-hidden="true" /> X:
          </span>
          <InputNumber
            style={{ marginRight: "3px" }}
            parser={value => value.replace("°", "")}
            formatter={value => `${value}°`}
            min={0}
            max={359}
            value={this.state.xdeg}
            onChange={value => this.setState({ xdeg: value })}
          />
          <span style={{ marginRight: "3px" }}>
            <i className="fa fa-repeat" aria-hidden="true" /> Y:
          </span>
          <InputNumber
            style={{ marginRight: "3px" }}
            parser={value => value.replace("°", "")}
            formatter={value => `${value}°`}
            value={this.state.ydeg}
            min={0}
            max={359}
            onChange={value => this.setState({ ydeg: value })}
          />
          &nbsp;
          <NewPointButton visible={this.state.newPointDialogShowed} onClickButton={() => this.setState({newPointDialogShowed: true})} close={() => this.setState({newPointDialogShowed: false})} addPoint={this.addPoint} style={{display: "inline-block"}}/>   
          &nbsp;Axes:&nbsp;
          <Switch
            style={{}}
            checkedChildren=""
            unCheckedChildren=""
            size="normal"
            defaultChecked
            onChange={bool => this.setState({drawaxes: bool})}
          />&nbsp;
          <Button style={{ marginRight: "3px" }} onClick={this.download}>
            PNG <i className="fa fa-download" aria-hidden="true" />
          </Button>
          <Button style={{ marginRight: "3px" }} onClick={this.getSVG}>
            SVG <i className="fa fa-download" aria-hidden="true" />
          </Button>
        </div>
        <div className="row">
          <div className="objContainer col-sm-2">
            {this.state.points.map((n, id) => (
              <PointObject
                num={id}
                x={n[0]}
                y={n[1]}
                z={n[2]}
                selected={this.state.seledtedpoint == id ? true : false}
                onClick={this.objPointOnClick}
                delete={this.delete}
                setCostruzione={this.setCostruzione}
                key={"po" + n[4]}
                extended={n[5]}
                setExtended={this.setExtended}
                colore={n[6]}
                setColor={this.setColor}
                setXYZ={this.setXYZ}
                setVisible={this.setVisible}
                visible={n[7]}
                setText={this.setText}
                text={n[8]}
                xText={n[9]}
                yText={n[10]}
                setTextLocation={this.setTextLocation}
                setcDotted={this.setcDotted}
              />
            ))}
            <div
              style={{ backgroundColor: "rgb(89, 89, 89)", height: "1px" }}
            />
            {this.state.lines.map((n, id) => (
              <LineObject
                num={id}
                p1x={n[0]}
                p1y={n[1]}
                p1z={n[2]}
                p2x={n[3]}
                p2y={n[4]}
                p2z={n[5]}
                dotted={n[6]}
                selected={
                  this.state.seledtedpoint == id + this.state.points.length
                    ? true
                    : false
                }
                onClick={this.objLineOnClick}
                delete={this.deleteline}
                setDotted={this.setDotted}
                key={"lo" + n[7]}
              />
            ))}
          </div>
          <div id="svgContainer" className="svgContainer col-sm-10">
            <svg className="" width="530mm" height="530mm" id="svgObject">
              {this.state.drawaxes ? <g><Line
                onClick={() => ""}
                ox={this.state.ox}
                oy={this.state.oy}
                xdeg={this.state.xdeg}
                ydeg={this.state.ydeg}
                p1x={0}
                p1y={0}
                p1z={0}
                p2x={700}
                p2y={0}
                p2z={0}
              />
              <Line
                onClick={() => ""}
                ox={this.state.ox}
                oy={this.state.oy}
                xdeg={this.state.xdeg}
                ydeg={this.state.ydeg}
                p1x={0}
                p1y={0}
                p1z={0}
                p2x={0}
                p2y={700}
                p2z={0}
              />
              <Line
                onClick={() => ""}
                ox={this.state.ox}
                oy={this.state.oy}
                xdeg={this.state.xdeg}
                ydeg={this.state.ydeg}
                p1x={0}
                p1y={0}
                p1z={0}
                p2x={0}
                p2y={0}
                p2z={700}
              /></g>
              : ""}
              {this.state.points.map(
                (n, id) =>
                  n[3] ? (
                    <Costruzione
                      key={"pc" + n[4]}
                      cx={n[0]}
                      cy={n[1]}
                      cz={n[2]}
                      cDotted={n[11]}
                      ox={this.state.ox}
                      oy={this.state.oy}
                      xdeg={this.state.xdeg}
                      ydeg={this.state.ydeg}
                    />
                  ) : (
                    ""
                  )
              )}
              {this.state.lines.map((n, id) => (
                <Line
                  key={"l" + n[7]}
                  num={id}
                  dotted={n[6]}
                  p1x={n[0]}
                  p1y={n[1]}
                  p1z={n[2]}
                  p2x={n[3]}
                  p2y={n[4]}
                  p2z={n[5]}
                  ox={this.state.ox}
                  oy={this.state.oy}
                  xdeg={this.state.xdeg}
                  ydeg={this.state.ydeg}
                  selected={
                    this.state.seledtedpoint === id + this.state.points.length
                      ? true
                      : false
                  }
                  onClick={this.objLineOnClick}
                />
              ))}
              {this.state.points.map((n, id) => (
                <Point
                  key={"p" + n[4]}
                  num={id}
                  cx={n[0]}
                  cy={n[1]}
                  cz={n[2]}
                  costruzionebool={n[3]}
                  r={3}
                  ox={this.state.ox}
                  oy={this.state.oy}
                  xdeg={this.state.xdeg}
                  ydeg={this.state.ydeg}
                  selected={this.state.seledtedpoint === id ? true : false}
                  onClick={this.objPointOnClick}
                  colore={n[6]}
                  visible={n[7]}
                  text={n[8]}
                  xText={n[9]}
                  yText={n[10]}
                />
              ))}
            </svg>
          </div>
        </div>
        <div
          style={{
            overflow: "auto",
            visibility: "hidden",
            width: "0",
            height: "0"
          }}
        >
          <canvas
            id="svgCanvas"
            width="530mm"
            height="530mm"
            style={{ visibility: "hidden" }}
          />
        </div>
      </div>
    );
  }
}

/*
<Point r={2} cx={0} cy={0} cz={0} ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg}/>
<Point r={2} cx={50} cy={150} cz={170} ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg}/>
<Line ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg} p1x={50} p1y={150} p1z={0} p2x={50} p2y={0} p2z={0} />
<Line ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg} p1x={50} p1y={150} p1z={0} p2x={0} p2y={150} p2z={0} />
<Line ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg} p1x={50} p1y={150} p1z={0} p2x={50} p2y={150} p2z={170} />
<Line ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg} p1x={50} p1y={0} p1z={170} p2x={50} p2y={0} p2z={0} />
<Line ox={this.state.ox} oy={this.state.oy} xdeg={this.state.xdeg} ydeg={this.state.ydeg} p1x={50} p1y={0} p1z={170} p2x={50} p2y={150} p2z={170} />
*/

export default App;
