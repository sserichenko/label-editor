import React, { Component, Fragment } from 'react';
import Moveable from 'react-moveable';
import { v4 as uuidv4 } from 'uuid';
import RulerHorizontal from './RulerHorizontal';
import ToolBar from './ToolBar';

export default class MoveableComponent extends Component {
  state = {
    boxes: [
      {
        _id: '5F123',
        name: 'Starter kit',
        target: null,
        status: 'Всегда печатать',
        width: 200,
        height: 80,
        top: 110,
        left: 0,
        rotate: 0,
        picture: null,
        title: null,
        price: null,
        digit: null,
        isResizable: true,
        isRotateble: true,
        isDragable: true,
      },
    ],
    isVerticalRulerShow: true,
    isHorizontalRulerShow: true,
    isGridShow: true,
    isDigitFields: false,
    isFrameFields: false,
    layerSize: {
      labelType: "ITEM",
      DPI : 8,
      width: 600,
      height: 600,
    },
  };

  stylesHorizontal = {
    position: 'absolute',
    top: 0,
    left: '50px',
    // transform: `translate(${-50}%, ${0}px)`,
    width: '600px',
    height: '50px',
    margin: '0 auto',
    textAlign: 'center',
  };

  stylesVertical = {
    position: 'absolute',
    top: '50px',
    left: 0,
    width: '50px',
    height: '600px',
    margin: '0 auto',
    textAlign: 'center',
  };

  getBox(target) {
    return this.state.boxes.find((box) => box._id === target.id.split('-').pop());
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
        b._id === box._id ? { ...b, left: beforeTranslate[0], top: beforeTranslate[1] } : b,
      ),
    }));
    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px) rotate(${box.rotate}deg)`;
  };

  //! Попробовать решить вопрос с возвращением блока из-за границ области

  // onDragEnd = ({target}) => {
  //   const box = this.getBox(target)
  //   if(box.left > (this.state.layerSize.width - box.width)){
  //     console.log("ВЫЛЕЗЛО ЗА РАМКИ")
  //     target.style.transform = `translate(${this.state.layerSize.width - box.width}px, ${box.top}px) rotate(${box.rotate}deg)`;
  //   }
  //   box.left = this.state.layerSize.width;
  //   console.log("BOX LEFT", box.left)
  //   // console.log("DRAG END BOX", box)
  // }

  onResizeStart = ({ target, setOrigin, dragStart }) => {
    console.log('ON RESIZE START');
    const box = this.getBox(target);
    setOrigin(['%', '%']);
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
              width: Math.ceil(width),
              height: Math.ceil(height),
              left: Math.ceil(beforeTranslate[0]),
              top: Math.ceil(beforeTranslate[1]),
            }
          : b,
      ),
    }));
    // console.log("ROTATE CURRENT FROM STATE", box.rotate)
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
    target.style.transform = `translate(${Math.ceil(beforeTranslate[0])}px, ${Math.ceil(beforeTranslate[1])}px) rotate(${box.rotate}deg)`;
  };

  onResizeEnd = ({target}) => {
    console.log('RESIZE END')
    const box = this.getBox(target);
    let reofdi = box.width % 8
    console.log("reofdi >>", reofdi)
    if(reofdi > 0){
      this.setState((prevState) => ({
        ...prevState,
        boxes: prevState.boxes.map((b) =>
          b._id === box._id
            ? {
                ...b,
                width: box.width - reofdi,
                height: box.height - reofdi,
              }
            : b,
        ),
      }))
      target.style.width = `${box.width - reofdi}px`;
      target.style.height = `${box.height - reofdi}px`;
    }
  }

  onRotateStart = ({ target, set }) => {
    const box = this.getBox(target);
    set(box.rotate);
  };
  onRotate = ({ target, beforeRotate }) => {
    // console.log("BEFOREROTATE", beforeRotate)
    const box = this.getBox(target);
    this.setState((prevState) => ({
      ...prevState,
      boxes: prevState.boxes.map((b) => (b._id === box._id ? { ...b, rotate: beforeRotate } : b)),
    }));
    target.style.transform = `translate(${Math.ceil(box.left)}px, ${Math.ceil(box.top)}px) rotate(${beforeRotate}deg)`;
  };
  //
  onRotateEnd = ({ target }) => {
    // console.log("END OF ROTATION")

    const box = this.getBox(target);
    // let degreeValue = parseInt(target.style.transform.split(" ")[2].match(/\d+/));

    const degreeValue = parseFloat(target.style.transform.split(' ')[2].match(/-?\d*\.\d*/)[0]);
    if(!degreeValue) {
      return
    }

    // let degreeWithMinus = parseFloat(target.style.transform.split(" ")[2].match(/-?\d*\.\d*/)[0]);

    // console.log('degreeVALUE >>>', degreeValue);
    // console.log('degreeWithMinus >>>', degreeWithMinus)

    // if(degreeValue < 0 && degreeValue > -45){
    //   target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(0deg)`;
    //   box.rotate = 0;
    // }

    if ((degreeValue >= 0 && degreeValue < 45) || (degreeValue <= 0 && degreeValue > -45)) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(0deg)`;
      box.rotate = 0;
    }
    if (degreeValue > 0 && degreeValue > 45 && degreeValue < 90) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(90deg)`;
      box.rotate = 90;
    }
    if (degreeValue > 0 && degreeValue > 90 && degreeValue < 135) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(90deg)`;
      box.rotate = 90;
    }
    if (
      (degreeValue > 0 && degreeValue > 135 && degreeValue < 180) ||
      (degreeValue < 0 && degreeValue < -135 && degreeValue > -180)
    ) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(180deg)`;
      box.rotate = 180;
    }
    // ---
    if (
      (degreeValue > 180 && degreeValue < 225) ||
      (degreeValue < 0 && degreeValue < -180 && degreeValue > -225)
    ) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(180deg)`;
      box.rotate = 180;
    }
    if (
      (degreeValue > 225 && degreeValue < 270) ||
      (degreeValue < 0 && degreeValue < -45 && degreeValue > -90)
    ) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(270deg)`;
      box.rotate = 270;
    }
    if (
      (degreeValue > 270 && degreeValue < 315) ||
      (degreeValue < 0 && degreeValue < -90 && degreeValue > -135)
    ) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(270deg)`;
      box.rotate = 270;
    }
    if (degreeValue > 315) {
      target.style.transform = `translate(${box.left}px, ${box.top}px) rotate(0deg)`;
      box.rotate = 0;
    }
  };

  onEnd = ({ target, width, height, drag }) => {
    // console.log('target on end >>> ', target);

    // const remOfDiv = 68 % 8
    // console.log('REM OF DIV >>> ', remOfDiv);
  };

  //

  componentDidMount() {
    // console.log("COMPONENT DID MOUNT");
    this.renderElementsWithMoveable();
    window.addEventListener('resize', this.onWindowReisze);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowReisze);
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
        boxes: prevState.boxes.map((b) => (b._id === box._id ? { ...b, target } : b)),
      }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // console.log('COMPONENT DID UPDATE');
    if (prevState.boxes.length !== this.state.boxes.length) {
      this.onCheckDigitFields();
      this.onCheckFrameFields();
      this.renderElementsWithMoveable();
    }
  }

  onCheckDigitFields() {
    const isDigitField = this.state.boxes.find((el, index) => el.type === 'DigitField');
    if (isDigitField) {
      this.setState((prevState) => ({
        ...prevState,
        isDigitFields: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isDigitFields: false,
      }));
    }
  }

  onCheckFrameFields() {
    const isFrameField = this.state.boxes.find((el, index) => el.type === 'frameField');
    if (isFrameField) {
      this.setState((prevState) => ({
        ...prevState,
        isFrameFields: true,
      }));
    } else {
      this.setState((prevState) => ({
        ...prevState,
        isFrameFields: false,
      }));
    }
  }

  onAddItem = (name, image, title, price, picture) => {
    this.setState((prevState) => ({
      ...prevState,
      boxes: [
        ...prevState.boxes,
        {
          _id: uuidv4().split('-')[0],
          name: name,
          target: null,
          status: 'Всегда печатать',
          width: 140,
          height: 80,
          top: 150,
          left: 60,
          rotate: 0,
          picture: picture,
          title: title,
          price: price,
          // digit: digit,
          isResizable: false,
          isRotateble: false,
          isDragable: false,
        },
      ],
    }));
  };

  onAddCustomItem = (item) => {
    this.setState((prevState) => ({
      ...prevState,
      boxes: [...prevState.boxes, item],
    }));
    // console.log('ITEM >>>', item)
  };

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

  onToggleResizable(id) {
    const updatedBoxes = this.state.boxes.map((box) => {
      if (box._id === id && !box.font) {
        // console.log("BOX >>> ", box)
        box.isResizable = true;
        box.isRotateble = true;
        box.isDragable = true;
      }
      if (box._id === id && box.font) {
        box.isResizable = false;
        box.isRotateble = true;
        box.isDragable = true;
      } 
      if (box._id === id && box.type === "frameField") {
        box.isResizable = true;
        box.isRotateble = false;
        box.isDragable = true;
      }else if (box._id !== id) {
        // console.log("BOX >>> ", box)
        box.isResizable = false;
        box.isRotateble = false;
        box.isDragable = false;
      }
      return box;
    });
    this.setState((prevState) => ({
      ...prevState,
      boxes: [...updatedBoxes],
    }));
  }

  onUpdateLabelSizeHandler(data) {
    // console.log("data", data);
    // console.log('STYLES', this.widthStyles)
    this.setState((prevState) => ({
      ...prevState,
      layerSize: {
        ...prevState.layerSize,
        width: data.width,
        height: data.height,
      },
    }));
  }

  onUpdateFontSizeHandler(data) {
    const updatedBoxes = this.state.boxes.map((box) => {
      if (box.font && box.isDragable) {
        // console.log("data >>> ", data)
        box.width = data.value.width;
        box.height = data.value.height;
        box.font = data.label;
        box.isResizable = false;
        box.isRotateble = true;
        box.isDragable = true;
      }
      return box;
    });
    this.setState((prevState) => ({
      ...prevState,
      boxes: [...updatedBoxes],
    }));
    this.renderElementsWithMoveable();
    // this.onEnd()
    // this.onResize()
  }

  onUpdateStatusHandler(data) {
    const updatedBoxes = this.state.boxes.map((box) => {
      if (box.status && box.isDragable) {
        box.status = data.value;
      }
      return box;
    });

    this.setState((prevState) => ({
      ...prevState,
      boxes: [...updatedBoxes],
    }));
  }

  onUpdateBorderSizeHandler(data) {
    const updatedBoxes = this.state.boxes.map((box) => {
      if (box.isDragable && box.type === 'frameField') {
        box.borderWidth = data.value;
      }
      return box;
    });
    this.setState((prevState) => ({
      ...prevState,
      boxes: [...updatedBoxes],
    }));
  }

  onHandleSave(){
    let result = {}
    const layer = {...this.state.layerSize}
    const needBoxes = this.state.boxes.map((box) => ({
        width: box.width,
        height: box.height,
        left: box.left, 
        top: box.top,
        fieldType: box.fieldType,
        rotate: box.rotate ? box.rotate : 0,
        font: box.font ? box.font : null,
        status: box.status,
        borderWidth: box.borderWidth ? box.borderWidth : null
    }))
    result = {boxes: needBoxes, layer: layer}
    console.log("RESULT >>> ", JSON.stringify(result))
  }

  render() {
    const { boxes, isGridShow, layerSize, isDigitFields, isFrameFields } = this.state;

    return (
      <div className="moveableComponent">
        {this.state.isHorizontalRulerShow && (
          <RulerHorizontal
            type="horizontal"
            style={{ ...this.stylesHorizontal, width: layerSize.width + 'px' }}
          />
        )}
        {this.state.isVerticalRulerShow && (
          <RulerHorizontal
            type="vertical"
            style={{ ...this.stylesVertical, height: layerSize.height + 'px' }}
          />
        )}
        <ToolBar
          onAddCustomItem={this.onAddCustomItem}
          onAddItem={this.onAddItem}
          onToggleHorizontalRuler={this.onToggleHorizontalRuler.bind(this)}
          onToggleVerticalRuler={this.onToggleVerticalRuler.bind(this)}
          onToggleGrid={this.onToggleGrid.bind(this)}
          onUpdateLabelSizeHandler={this.onUpdateLabelSizeHandler.bind(this)}
          onUpdateFontSizeHandler={this.onUpdateFontSizeHandler.bind(this)}
          onUpdateStatusHandler={this.onUpdateStatusHandler.bind(this)}
          onUpdateBorderSizeHandler={this.onUpdateBorderSizeHandler.bind(this)}
          isDigitFields={isDigitFields}
          isFrameFields={isFrameFields}
          onHandleSave = {this.onHandleSave.bind(this)}
        />
        <div
          className={isGridShow ? 'parent active' : 'parent'}
          id="parent"
          style={{ width: layerSize.width + 'px', height: layerSize.height + 'px' }}>
          <div className="breakLine" style={{ width: layerSize.width + 'px' }}></div>
          {boxes.map((box, i) => (
            <Fragment key={i}>
              <div
                id={`box-${box._id}`}
                className={'target'}
                onClick={() => this.onToggleResizable(box._id)}>
                {box.isDragable && (
                  <button className="remove-btn" onClick={(e) => this.onRemoveItem(box._id, e)}>
                    x
                  </button>
                )}

                {box.name && (
                  <p className="main-title">
                    <span>{box.name}</span>
                  </p>
                )}
                {box.price && <p className="main-price">{box.price}</p>}

                {box.picture && <img className="barcode-image" src={box.picture} alt={box.title} />}
                {box.type === 'DigitField' && (
                  <img className="barcode-image" src={box.digit} alt={box.title} />
                )}
                {box.type === 'frameField' && (
                  <p className="main-title" style={{ border: `${box.borderWidth}px solid black` }}>
                    <span>{box.label}</span>
                  </p>
                )}
                {box.type === 'TextField' && (
                  <p className="main-title">
                    <span>{box.label}</span>
                  </p>
                )}
                {box.type === "Barcode" && (
                  <img className="barcode-image" src={box.value} alt={box.label} />
                )}
              </div>
              <Moveable
                key={i + 100}
                target={box.target}
                container={document.body}
                origin={false}
                keepRatio={false}
                edge={false}
                snappable={true}
                snapThreshold={5}
                snapCenter={false}
                // bounds={{ left: 20, top: 20, bottom: 920, right: 820 }}
                elementGuidelines={[
                  document.querySelector('.parent'),
                  ...boxes.map((b) => b.target),
                ]}
                verticalGuidelines={[100, 200, 300]}
                horizontalGuidelines={[0, 100, 200]}
                draggable={box.isDragable}
                onDragStart={this.onDragStart}
                onDrag={this.onDrag.bind(this)}
                onDragEnd={this.onDragEnd}
                throttleDrag={1}
                resizable={box.isResizable}
                onResizeStart={this.onResizeStart}
                onResize={this.onResize.bind(this)}
                onResizeEnd={this.onResizeEnd}
                throttleResize={1}
                renderDirections={box.type === "Barcode" ? ['n', 's'] : ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
                // renderDirections={['n', 's']}
                rotatable={box.isRotateble}
                onRotateStart={this.onRotateStart}
                onRotate={this.onRotate.bind(this)}
                onRotateEnd={this.onRotateEnd}
                throttleRotate={0.2}
                rotationPosition={'top'}

                // pinchable={["resizable"]}
                // onPinch={this.onPinch}
                // onPinchEnd={this.onEnd}
                // pinchThreshold={20}
              />
            </Fragment>
          ))}
        </div>
        <div  style={{ width: layerSize.width + 'px' }}>
          {boxes &&
            boxes.map((box) => (
              <div key={box._id}>
                {box.isResizable || box.isDragable ? (
                  <span className="info-block">
                    {' '}
                    Width: {Math.ceil(box.width / 8)} | Height: {Math.ceil(box.height / 8)} |
                    Left: {Math.ceil(box.left / 8)} | Top: {Math.ceil(box.top / 8)} |{' '}
                    {box.font ? `Font: ${box.font}` : ''} {box.borderWidth ? `Border : ${box.borderWidth}` : ""}
                  </span>
                ) : (
                  ''
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}
