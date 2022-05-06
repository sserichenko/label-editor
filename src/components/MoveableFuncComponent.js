import React, {useState, Fragment, useEffect} from 'react';
import Moveable from "react-moveable";
import RulerHorizontal from "./RulerHorizontal";
import ToolBar from "./ToolBar";

const MoveableFuncComponent = () => {

    const [boxes, setBoxes] = useState([
        {
            _id: "5F123",
            name: "Box 1",
            target: null,
            width: 200,
            height: 80,
            top: 110,
            left: 0,
            rotate: 0,
          },
          {
            _id: "5F456",
            name: "Box 2",
            target: null,
            width: 200,
            height: 80,
            top: 360,
            left: 100,
            rotate: 0,
          },
          {
            _id: "5F789",
            name: "Box 3",
            target: null,
            width: 200,
            height: 80,
            top: 300,
            left: 75,
            rotate: 0,
          }
    ])

    const stylesHorizontal = { 
        position: "absolute",
        top: 0,
        left: "50px",
        // transform: `translate(${-50}%, ${0}px)`,
        width: "600px",
        height: "50px",
        margin: "0 auto",
        textAlign: "center"
    };
    
      const stylesVertical = {
          position: "absolute",
          top: "50px",
          left: 0,
          width: "50px",
          height: "600px",
          margin: "0 auto",
          textAlign: "center"
      }

      const getBox = (target) =>{
        return boxes.find(
            (box) => box._id === target.id.split("-").pop()
          );
      }

      const onDragStart = ({ target, set }) => {
        const box = getBox(target);
        set([box.left, box.top]);
      };

      const onDrag = ({ target, beforeTranslate }) => {
        const box = getBox(target);
        setBoxes((prevState) => ({
          boxes: prevState.boxes.map((b) =>
            b._id === box._id
              ? { ...b, left: beforeTranslate[0], top: beforeTranslate[1] }
              : b
          ),
        }));
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${box.rotate}deg)`;
      };

      const onResizeStart = ({ target, setOrigin, dragStart }) => {
        const box = getBox(target);
        setOrigin(["%", "%"]);
        dragStart && dragStart.set([box.left, box.top]);
      };

      const onResize = ({ target, width, height, drag }) => {
        const box = getBox(target);
        const beforeTranslate = drag.beforeTranslate;
        setBoxes((prevState) => ({
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
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;
        target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${box.rotate}deg)`;
      };

      const onRotateStart = ({ target, set }) => {
        const box = getBox(target);
        set(box.rotate);
      };

      const onRotate = ({ target, beforeRotate }) => {
        const box = getBox(target);
        setBoxes((prevState) => ({
          boxes: prevState.boxes.map((b) =>
            b._id === box._id ? { ...b, rotate: beforeRotate } : b
          ),
        }));
        target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(${beforeRotate}deg)`;
      };

      const onEnd = () => {};


      useEffect(() => {
        let updatedBoxes
        for (let box of boxes) {
            const target = document.querySelector(`#box-${box._id}`);
            target.style.width = `${box.width}px`;
            target.style.height = `${box.height}px`;
            target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(${box.rotate}deg)`;
            

            updatedBoxes = boxes.map((b) => {
                return b._id === box._id ? { ...b, target } : b
            })

            // setBoxes((prevState) => ({
            //   boxes: prevState.boxes.map((b) =>
            //     b._id === box._id ? { ...b, target } : b
            //   ),
            // }));
          }
          console.log('updatedBoxes', updatedBoxes)
          setBoxes(updatedBoxes)
          console.log('boxes', boxes)

          window.addEventListener("resize", onWindowResize);

          return () => {
            window.removeEventListener("resize", onWindowResize);
          }

      }, [])

      const onWindowResize = () => {
          console.log("RESIZE")
        // this.moveable.updateRect();
      };

      const onRemoveItem = (id) => {
        setBoxes((prevState) => ({
          boxes: prevState.boxes.filter(b => b._id !== id)
        }))
      }

      const onAddItem = () => {
          setBoxes([...boxes, {
            _id: "5F45612121",
            name: "Box 4",
            target: null,
            width: 200,
            height: 80,
            top: 150,
            left: 60,
            rotate: 0
          }])
      }


  return (
    <div className="moveableComponent">
        <RulerHorizontal type="horizontal" style={stylesHorizontal}/>   
        <RulerHorizontal type="vertical" style={stylesVertical}/> 
        <ToolBar onAddItem={onAddItem}/>
        <div className="parent" id="parent">
           <div className="breakLine"></div>
          {boxes.map((box, i) => (
            <Fragment key={i}>
              <div id={`box-${box._id}`} className={"target"}>
                <button className="remove-btn" onClick={() => onRemoveItem(box._id)}>x</button>
                <strong>{box.name}</strong>
                <br />
                {`w:${Math.round(box.width)}, h:${Math.round(box.height)}, top:${Math.round(box.top)}, left: ${Math.round(box.left)}`}
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
                onDragStart={onDragStart}
                onDrag={onDrag}
                onDragEnd={onEnd}
                throttleDrag={1}
                resizable={true}
                onResizeStart={onResizeStart}
                onResize={onResize}
                onResizeEnd={onEnd}
                throttleResize={1}
                renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
                rotatable={true}
                onRotateStart={onRotateStart}
                onRotate={onRotate}
                onRotateEnd={onEnd}
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
  )
}


export default MoveableFuncComponent;