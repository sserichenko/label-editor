import React, { Component, Fragment } from "react";
import Moveable from "react-moveable";
import { v4 as uuidv4 } from "uuid";
import RulerHorizontal from "./RulerHorizontal";
import ToolBar from "./ToolBar";

export default class MoveableComponent extends Component {
  state = {
    boxes: [
      {
        _id: "5F123",
        name: "Box 1",
        target: null,
        width: 200,
        height: 80,
        top: 110,
        left: 0,
        rotate: 0,
        picture: null,
        title: null, 
        price: null,
        digit: null,
        isResizable: true
      },
      // {
      //   _id: "5F456",
      //   name: "Box 2",
      //   target: null,
      //   width: 200,
      //   height: 80,
      //   top: 360,
      //   left: 100,
      //   rotate: 0,
      // },
      // {
      //   _id: "5F789",
      //   name: "Box 3",
      //   target: null,
      //   width: 200,
      //   height: 80,
      //   top: 300,
      //   left: 75,
      //   rotate: 0,
      // },
    ],
    isVerticalRulerShow: true,
    isHorizontalRulerShow: true,
    isGridShow: true,
  };

  stylesHorizontal = {
    position: "absolute",
    top: 0,
    left: "50px",
    // transform: `translate(${-50}%, ${0}px)`,
    width: "600px",
    height: "50px",
    margin: "0 auto",
    textAlign: "center",
  };

  stylesVertical = {
    position: "absolute",
    top: "50px",
    left: 0,
    width: "50px",
    height: "600px",
    margin: "0 auto",
    textAlign: "center",
  };

  getBox(target) {
    return this.state.boxes.find(
      (box) => box._id === target.id.split("-").pop()
    );
  }

  onDragStart = ({ target, set }) => {
    const box = this.getBox(target);
    set([box.left, box.top]);
  };

  onDrag = ({ target, beforeTranslate }) => {
    const box = this.getBox(target);
    this.setState((prevState) => ({
      ...prevState,
      boxes: prevState.boxes.map((b) =>
        b._id === box._id
          ? { ...b, left: beforeTranslate[0], top: beforeTranslate[1] }
          : b
      ),
    }));
    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${box.rotate}deg)`;
  };
  onResizeStart = ({ target, setOrigin, dragStart }) => {
    const box = this.getBox(target);
    setOrigin(["%", "%"]);
    dragStart && dragStart.set([box.left, box.top]);
  };
  onResize = ({ target, width, height, drag }) => {
    const box = this.getBox(target);
    const beforeTranslate = drag.beforeTranslate;
    this.setState((prevState) => ({
      ...prevState,
      boxes: prevState.boxes.map((b) =>
        b._id === box._id
          ? {
              ...b,
              width,
              height,
              left: beforeTranslate[0],
              top: beforeTranslate[1],
            }
          : b
      ),
    }));
    console.log("ROTATE CURRENT FROM STATE", box.rotate)
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${box.rotate}deg)`;
  };
  onRotateStart = ({ target, set }) => {
    const box = this.getBox(target);
    set(box.rotate);
  };
  onRotate = ({ target, beforeRotate }) => {
    // console.log("BEFOREROTATE", beforeRotate)
    const box = this.getBox(target);
    this.setState((prevState) => ({
      ...prevState,
      boxes: prevState.boxes.map((b) =>
        b._id === box._id ? { ...b, rotate: beforeRotate } : b
      ),
    }));
    target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(${beforeRotate}deg)`;
  };
  // 
  onRotateEnd = ({target}) => {
    console.log("END OF ROTATION")
    
    const box = this.getBox(target);
    // let degreeValue = parseInt(target.style.transform.split(" ")[2].match(/\d+/));
    
    let degreeValue = parseFloat(target.style?.transform?.split(" ")[2].match(/-?\d*\.\d*/)[0]);

    // let degreeWithMinus = parseFloat(target.style.transform.split(" ")[2].match(/-?\d*\.\d*/)[0]);

    console.log('degreeVALUE >>>', degreeValue)
    // console.log('degreeWithMinus >>>', degreeWithMinus)
    
    if(degreeValue > 0 && degreeValue < 45){
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(0deg)`;
      box.rotate = 0;
    }
      if(degreeValue > 0 && degreeValue > 45 && degreeValue < 90){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(90deg)`;
        box.rotate = 90;
      }
      if(degreeValue > 0 && degreeValue > 90 && degreeValue < 135){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(90deg)`;
        box.rotate = 90;
      }
      if(degreeValue > 0 && degreeValue > 135 && degreeValue < 180){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(180deg)`;
        box.rotate = 180;
      }
      // ---
      if(degreeValue > 180 && degreeValue < 225){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(180deg)`;
        box.rotate = 180;
      }
      if(degreeValue > 225 && degreeValue < 270){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(270deg)`;
        box.rotate = 270;
      }
      if(degreeValue > 270 && degreeValue < 315){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(270deg)`;
        box.rotate = 270;
      }
      if(degreeValue > 315){
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(0deg)`;
        box.rotate = 0;
      }
  };

  onEnd(){}

  // 

  componentDidMount() {
    // console.log("MOUNT");
    this.renderElementsWithMoveable();
    window.addEventListener("resize", this.onWindowReisze);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onWindowReisze);
  }
  onWindowResize = () => {
    this.moveable.updateRect();
  };

  onRemoveItem = (id, e) => {
    e.stopPropagation();
    this.setState((prevState) => ({
      ...prevState,
      boxes: prevState.boxes.filter((b) => b._id !== id),
    }));
  };

  renderElementsWithMoveable() {
    for (let box of this.state.boxes) {
      const target = document.querySelector(`#box-${box._id}`);
      target.style.width = `${box.width}px`;
      target.style.height = `${box.height}px`;
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(${box.rotate}deg)`;
      this.setState((prevState) => ({
        ...prevState,
        boxes: prevState.boxes.map((b) =>
          b._id === box._id ? { ...b, target } : b
        ),
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.boxes.length !== this.state.boxes.length) {
      this.renderElementsWithMoveable();
    }
  }

  onAddItem = (name, image, title, price, digit) => {
    this.setState((prevState) => ({
      ...prevState,
      boxes: [
        ...prevState.boxes,
        {
          _id: uuidv4().split("-")[0],
          name: name,
          target: null,
          width: 140,
          height: 80,
          top: 150,
          left: 60,
          rotate: 0,
          picture: image,
          title: title, 
          price: price,
          digit: digit,
          isResizable: false
        },
      ],
    }));
  }

  onAddCustomItem = (item) => {
    this.setState((prevState) => ({
      ...prevState,
      boxes:[
        ...prevState.boxes, item
      ]
    }))
    // console.log('ITEM >>>', item)
  }

  onToggleHorizontalRuler() {
    this.setState((prevState) => ({
      ...prevState,
      isHorizontalRulerShow: !this.state.isHorizontalRulerShow,
    }));
  }

  onToggleVerticalRuler() {
    this.setState((prevState) => ({
      ...prevState,
      isVerticalRulerShow: !this.state.isVerticalRulerShow,
    }));
  }

  onToggleGrid() {
    this.setState((prevState) => ({
      ...prevState,
      isGridShow: !this.state.isGridShow,
    }));
  }

  onToggleResizable(id){
    const updatedBoxes  = this.state.boxes.map((box) => {
      if(box._id === id){
        box.isResizable = true
      }else{
        box.isResizable = false
      }
      return box
    })
    this.setState((prevState) => ({
      ...prevState,
      boxes: [...updatedBoxes]
    }))
  }

  render() {
    const { boxes, isGridShow } = this.state;

    return (
      <div className="moveableComponent">
        {this.state.isHorizontalRulerShow && (
          <RulerHorizontal type="horizontal" style={this.stylesHorizontal} />
        )}
        {this.state.isVerticalRulerShow && (
          <RulerHorizontal type="vertical" style={this.stylesVertical} />
        )}
        <ToolBar
          onAddCustomItem={this.onAddCustomItem}
          onAddItem={this.onAddItem}
          onToggleHorizontalRuler={this.onToggleHorizontalRuler.bind(this)}
          onToggleVerticalRuler={this.onToggleVerticalRuler.bind(this)}
          onToggleGrid={this.onToggleGrid.bind(this)}
        />
        <div className={isGridShow ? "parent active" : "parent"} id="parent">
          <div className="breakLine"></div>
          {boxes.map((box, i) => (
            <Fragment key={i}>
              <div
                id={`box-${box._id}`}
                className={"target"}
                onClick={() => this.onToggleResizable(box._id)}
              >
                <button
                  className="remove-btn"
                  onClick={(e) => this.onRemoveItem(box._id, e)}
                >
                  x
                </button>
                {box.name && <p className="main-title">{box.name}</p>}
                {box.price && <p className="main-price">{box.price}</p>}

                {box.picture && <img className="barcode-image" src={box.picture} alt={box.title}/>}
                {box.digit && <img className="barcode-image" src={box.digit} alt={box.title}/>}

                {/* <br /> */}
                
                {/* {box.picture
                  ? (<img className="barcode-image" src={box.picture} alt={box.name}/>)
                  : (<div>{`w:${Math.round(box.width / 8)}, h:${Math.round(
                  box.height / 8
                )}, top:${Math.round(box.top)}, left: ${Math.round(box.left)}`}</div>)
                } */}
                
                
              </div>
              <Moveable
                key={i + 100}
                target={box.target}
                container={document.body}
                origin={false}
                keepRatio={false}
                edge={true}
                snappable={true}
                snapThreshold={5}
                snapCenter={false}
                // bounds={{ left: 20, top: 20, bottom: 920, right: 820 }}
                elementGuidelines={[
                  document.querySelector(".parent"),
                  ...boxes.map((b) => b.target),
                ]}
                verticalGuidelines={[100, 200, 300]}
                horizontalGuidelines={[0, 100, 200]}
                draggable={true}
                onDragStart={this.onDragStart}
                onDrag={this.onDrag.bind(this)}
                onDragEnd={this.onDragEnd}
                throttleDrag={1}
                resizable={box.isResizable}
                onResizeStart={this.onResizeStart}
                onResize={this.onResize}
                onResizeEnd={this.onEnd}
                throttleResize={1}
                renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                rotatable={box.isResizable}
                onRotateStart={this.onRotateStart}
                onRotate={this.onRotate.bind(this)}
                onRotateEnd={this.onRotateEnd}
                throttleRotate={0.2}
                rotationPosition={"top"}

                // pinchable={["resizable"]}
                // onPinch={this.onPinch}
                // onPinchEnd={this.onEnd}
                // pinchThreshold={20}
              />
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}