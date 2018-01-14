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
      objects: [
        [
          "point",
          10,
          20,
          30,
          false,
          "keyc",
          false,
          "#000000",
          true,
          "Point 1",
          0,
          0,
          false
        ],
        [
          "point",
          50,
          200,
          60,
          false,
          "keyb",
          false,
          "#000000",
          true,
          "Point 2",
          0,
          0,
          false
        ],
        [
          "point",
          70,
          80,
          80,
          false,
          "keya",
          false,
          "#000000",
          true,
          "Point 3",
          0,
          0,
          false
        ],
        [
          "line",
          [[10, 20, 30], [50, 200, 60], [10, 100, 175]],
          false,
          "keyd",
          "Line 1"
        ] //-5 posizioni
      ],
      //lines: [[10, 20, 30, 50, 200, 60, false, "keyd"]],
      selectedPoint: 0,
      ox: 265, //5/12*window.innerWidth,
      oy: 265, //(window.innerHeight-75)/2,
      buttonx: 0,
      buttony: 0,
      buttonz: 0,
      newPointDialogShowed: false
    };
    this.deleteobj = this.deleteobj.bind(this);
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
    this.addLine = this.addLine.bind(this);
    this.setXYZpoligons = this.setXYZpoligons.bind(this);
    this.setTextpoligons = this.setTextpoligons.bind(this);
    this.poligonAddPoint = this.poligonAddPoint.bind(this);
    this.poligonRemovePoint = this.poligonRemovePoint.bind(this);
    window.addEventListener("resize", this.eventresize);
  }

  eventresize() {
    let w = window.innerWidth;
    let h = window.innerHeight;
    //this.setState({ox: 5/12*w, oy: (h-75)/2})
  }

  deleteobj(num) {
    this.setState(function(state, props) {
      return { objects: state.objects.filter((x, id) => id !== num) };
    });
  }

  objPointOnClick(num, e) {
    e.stopPropagation();
    let bool = true;
    if (
      e.shiftKey === true &&
      this.state.selectedPoint < this.state.objects.length &&
      num < this.state.objects.length
    ) {
      if (this.state.objects[this.state.selectedPoint][0] === "point") {
        let p1 = this.state.objects[this.state.selectedPoint];
        let p2 = this.state.objects[num];
        this.addLine(
          [[p1[1], p1[2], p1[3]], [p2[1], p2[2], p2[3]]],
          p1[9] + " - " + p2[9]
        );
        this.setState({ selectedPoint: this.state.objects.length });
        bool = false;
      } else if (this.state.objects[this.state.selectedPoint][0] === "line") {
        let p2 = this.state.objects[num];
        this.poligonAddPoint(this.state.selectedPoint, p2[1], p2[2], p2[3]);
        bool = false;
      }
    }
    if (bool) {
      if (this.state.selectedPoint !== num) {
        this.setState({ selectedPoint: num });
      } else {
        this.setState({ selectedPoint: -1 });
      }
    }
  }

  objLineOnClick(num) {
    if (this.state.selectedPoint !== num) {
      this.setState({ selectedPoint: num });
    } else {
      this.setState({ selectedPoint: -1 });
    }
  }

  addPoint(x = 0, y = 0, z = 0, name = "New Point") {
    let objects = this.state.objects;
    this.setState({
      objects: [
        ...objects,
        [
          "point",
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
    });
  }

  addLine(points, name = "New Line") {
    this.setState({
      objects: [...this.state.objects, ["line", points, false, ++keynum, name]]
    });
  }

  setDotted(num, bool) {
    let ls = [...this.state.objects];
    ls[num][2] = bool;
    this.setState({ objects: ls });
  }

  setExtended(num, bool) {
    let p = [...this.state.objects];
    p[num][6] = bool;
    this.setState({ objects: p });
  }

  setCostruzione(num, bool) {
    let ls = [...this.state.objects];
    ls[num][4] = bool;
    this.setState({ objects: ls });
  }

  setColor(num, val) {
    let p = [...this.state.objects];
    p[num][7] = val;
    this.setState({ objects: p });
  }

  setXYZ(num, xyz, val) {
    let p = [...this.state.objects];
    p[num][xyz] = val;
    this.setState({ objects: p });
  }

  setXYZpoligons(num, index, xyz, val) {
    let p = [...this.state.objects];
    p[num][1][index][xyz] = val;
    this.setState({ objects: p });
  }

  setVisible(num, bool) {
    let p = [...this.state.objects];
    p[num][8] = bool;
    this.setState({ objects: p });
  }

  setcDotted(num, bool) {
    let p = [...this.state.objects];
    p[num][12] = bool;
    this.setState({ objects: p });
  }

  setText(num, val) {
    let p = [...this.state.objects];
    p[num][9] = val;
    this.setState({ objects: p });
  }

  setTextpoligons(num, val) {
    let p = [...this.state.objects];
    p[num][4] = val;
    this.setState({ objects: p });
  }

  setTextLocation(num, xy, val) {
    let p = [...this.state.objects];
    p[num][xy] = val;
    this.setState({ objects: p });
  }

  poligonAddPoint(num, x, y, z) {
    let p = [...this.state.objects];
    p[num][1].push([x, y, z]);
    this.setState({ objects: p });
  }

  poligonRemovePoint(num, numpoint) {
    let p = [...this.state.objects];
    p[num][1].splice(numpoint, 1);
    this.setState({ objects: p });
  }

  setNewButtonDialog(bool) {
    this.setState({ newPointDialogShowed: bool });
  }

  download() {
    var svgString = new XMLSerializer().serializeToString(
      document.querySelector("svg")
    );

    var canvas = document.getElementById("svgCanvas");
    var ctx = canvas.getContext("2d");
    canvas.width = "2000"; //5 / 6 * window.innerWidth;
    canvas.height = "2000"; //window.innerHeight - 75;
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
    const { objects, buttonx, buttony, buttonz } = this.state;
    return (
      <div>
        <div className="settings row">
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
          <NewPointButton
            visible={this.state.newPointDialogShowed}
            onClickButton={() => this.setState({ newPointDialogShowed: true })}
            close={() => this.setState({ newPointDialogShowed: false })}
            addPoint={this.addPoint}
            style={{ display: "inline-block" }}
          />
          &nbsp;Axes:&nbsp;
          <Switch
            style={{}}
            checkedChildren=""
            unCheckedChildren=""
            size="normal"
            defaultChecked
            onChange={bool => this.setState({ drawaxes: bool })}
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
            {[...this.state.objects].reverse().map(
              (n, id) =>
                n[0] === "point" ? (
                  <PointObject
                    num={this.state.objects.length - 1 - id}
                    x={n[1]}
                    y={n[2]}
                    z={n[3]}
                    selected={
                      this.state.selectedPoint ===
                      this.state.objects.length - 1 - id
                        ? true
                        : false
                    }
                    onClick={this.objPointOnClick}
                    delete={this.deleteobj}
                    setCostruzione={this.setCostruzione}
                    key={"po" + n[5]}
                    extended={n[6]}
                    setExtended={this.setExtended}
                    colore={n[7]}
                    setColor={this.setColor}
                    setXYZ={this.setXYZ}
                    setVisible={this.setVisible}
                    visible={n[8]}
                    setText={this.setText}
                    text={n[9]}
                    xText={n[10]}
                    yText={n[11]}
                    setTextLocation={this.setTextLocation}
                    setcDotted={this.setcDotted}
                  />
                ) : (
                  <LineObject
                    num={this.state.objects.length - 1 - id}
                    /*p1x={n[1]}
                      p1y={n[2]}
                      p1z={n[3]}
                      p2x={n[4]}
                      p2y={n[5]}
                      p2z={n[6]}*/
                    points={n[1]}
                    setXYZpoligons={this.setXYZpoligons}
                    setText={this.setTextpoligons}
                    text={n[4]}
                    dotted={n[2]}
                    selected={
                      this.state.selectedPoint ===
                      this.state.objects.length - 1 - id
                        ? true
                        : false
                    }
                    poligonAddPoint={this.poligonAddPoint}
                    poligonRemovePoint={this.poligonRemovePoint}
                    onClick={this.objLineOnClick}
                    delete={this.deleteobj}
                    setDotted={this.setDotted}
                    key={"lo" + n[3]}
                  />
                )
            )}
          </div>
          <div id="svgContainer" className="svgContainer col-sm-10">
            <svg className="" width="530mm" height="530mm" id="svgObject">
              {this.state.objects.map(
                (n, id) =>
                  n[4] & (n[0] === "point") ? (
                    <Costruzione
                      key={"pc" + n[5]}
                      cx={n[1]}
                      cy={n[2]}
                      cz={n[3]}
                      cDotted={n[12]}
                      ox={this.state.ox}
                      oy={this.state.oy}
                      xdeg={this.state.xdeg}
                      ydeg={this.state.ydeg}
                    />
                  ) : (
                    ""
                  )
              )}
              {this.state.drawaxes ? (
                <g>
                  <Line
                    onClick={() => ""}
                    ox={this.state.ox}
                    oy={this.state.oy}
                    xdeg={this.state.xdeg}
                    ydeg={this.state.ydeg}
                    points={[[0, 0, 0], [700, 0, 0]]}
                  />
                  <Line
                    onClick={() => ""}
                    ox={this.state.ox}
                    oy={this.state.oy}
                    xdeg={this.state.xdeg}
                    ydeg={this.state.ydeg}
                    points={[[0, 0, 0], [0, 700, 0]]}
                  />
                  <Line
                    onClick={() => ""}
                    ox={this.state.ox}
                    oy={this.state.oy}
                    xdeg={this.state.xdeg}
                    ydeg={this.state.ydeg}
                    points={[[0, 0, 0], [0, 0, 700]]}
                  />
                </g>
              ) : (
                ""
              )}
              {this.state.objects.map(
                (n, id) =>
                  n[0] === "line" ? (
                    <Line
                      key={"l" + n[3]}
                      num={id}
                      dotted={n[2]}
                      points={n[1]}
                      ox={this.state.ox}
                      oy={this.state.oy}
                      xdeg={this.state.xdeg}
                      ydeg={this.state.ydeg}
                      selected={this.state.selectedPoint === id ? true : false}
                      onClick={this.objLineOnClick}
                    />
                  ) : (
                    <Point
                      key={"p" + n[5]}
                      num={id}
                      cx={n[1]}
                      cy={n[2]}
                      cz={n[3]}
                      costruzionebool={n[4]}
                      r={3}
                      ox={this.state.ox}
                      oy={this.state.oy}
                      xdeg={this.state.xdeg}
                      ydeg={this.state.ydeg}
                      selected={this.state.selectedPoint === id ? true : false}
                      onClick={this.objPointOnClick}
                      colore={n[7]}
                      visible={n[8]}
                      text={n[9]}
                      xText={n[10]}
                      yText={n[11]}
                    />
                  )
              )}
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
