import React, { useState } from 'react';
import Select from 'react-select';
import {digitOptions, statusOptions, fontSizeOptions, frameOptions, borderSizeOptions, textFieldOptions} from "../assets/options";

const ToolBar = ({
  onAddItem,
  onToggleHorizontalRuler,
  onToggleVerticalRuler,
  onToggleGrid,
  onAddCustomItem,
  onUpdateLabelSizeHandler,
  onUpdateFontSizeHandler,
  onUpdateStatusHandler,
  onUpdateBorderSizeHandler,
  isDigitFields,
  isFrameFields,
}) => {

  // const newArr = [];
  // for(let i = 0; i < borderSizeOptions.length; i++){
  //   newArr.push({
  //     label: borderSizeOptions[i],
  //     value: borderSizeOptions[i]
  //   })
  //   console.log(newArr)
  // }

  const [textValue, setTextValue] = useState({ label: 'Выбрать тип поля'});
  const [frameValue, setFrameValue] = useState({ label: 'Выбрать тип поля' });
  const [digitValue, setDigitValue] = useState({ label: 'Выбрать тип поля' });
  const [fontSizeValue, setFontSizeValue] = useState({
    id: 'fontSizeM3',
    label: 'M3',
    value: {
      width: 104,
      height: 24,
    },
  });
  const [status, setStatus] = useState({
    id: 'status1',
    label: 'Всегда печатать',
    value: 'Всегда печатать',
  });
  const [borderSize, setBorderSize] = useState({ label: 'Выберите толщину' });
  const [formData, setFormData] = useState({
    width: 600,
    height: 600,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateLabelSizeHandler(formData);
  };

  return (
    <div className="toolbar">
      <div className="tollbar__wrapper">
        <div className="form-size__wrapper">
          <p className="form-size__title">Label size</p>
          <form id="size-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="width-input">Width</label>
              <input
                type="number"
                name="width"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              />
            </div>
            <div className="form-field">
              <label htmlFor="height-input">Height</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
            </div>
            <button>Submit</button>
          </form>
        </div>
        {/* <div className="info-block">
          <div className="info-block__item">
            <span>Width</span> : span
          </div>
        </div> */}
        <div className="form-select">
          <label htmlFor="status-select">Статус</label>
          <Select
            id="status-select"
            className="custom-select"
            defaultValue={status}
            onChange={(e) => {
              setStatus(e);
              onUpdateStatusHandler(e);
              // console.log('e STATUS >>>', e);
            }}
            options={statusOptions}
          />
        </div>
        <div className="form-select">
          <label htmlFor="digit-select">Цифровое поле (0.0.0)</label>
          <Select
            id="digit-select"
            className="custom-select"
            defaultValue={digitValue}
            onChange={(e) => {
              setDigitValue(e);
              onAddCustomItem(e);
              // console.log("e >>>", e);
            }}
            options={digitOptions}
          />
        </div>
        <div className="form-select">
          <label htmlFor="text-select">Текстовое поле (abc)</label>
          <Select
            id="text-select"
            className="custom-select"
            defaultValue={textValue}
            onChange={(e) => {
              setTextValue(e);
              onAddCustomItem(e);
              console.log("ТЕКСТОВОЕ ПОЛЕ >>>", e);
            }}
            options={textFieldOptions}
          />
        </div>
        {isDigitFields && (
          <div className="form-select">
            <label htmlFor="font-select">Шрифт</label>
            <Select
              id="font-select"
              className="custom-select"
              defaultValue={fontSizeValue}
              onChange={(e) => {
                setFontSizeValue(e);
                onUpdateFontSizeHandler(e);
                // console.log("e >>>", e);
              }}
              options={fontSizeOptions}
            />
          </div>
        )}

        <div className="form-select">
          <label htmlFor="frame-select">Рамка</label>
          <Select
            id="frame-select"
            className="custom-select"
            defaultValue={frameValue}
            onChange={(e) => {
              setFrameValue(e);
              onAddCustomItem(e);
              console.log('FRAME EVENT >>>', e);
            }}
            options={frameOptions}
          />
        </div>
        {isFrameFields && (
          <div className="form-select">
            <label htmlFor="border-size-select">Толщина рамки</label>
            <Select
              id="border-size-select"
              className="custom-select"
              defaultValue={borderSize}
              onChange={(e) => {
                setBorderSize(e);
                onUpdateBorderSizeHandler(e);
                console.log('BORDER EVENT >>>', e);
              }}
              options={borderSizeOptions}
            />
          </div>
        )}

        {/* <button
          className="toolbar__button"
          onClick={() => onAddItem("Яблука голден ваг", null, null, null)}
        >
          Add main title
        </button>
        <button
          className="toolbar__button"
          onClick={() => onAddItem("", "/images/barcode.png", null, null)}
        >
          Add Label
        </button>
        <button
          className="toolbar__button"
          onClick={() => onAddItem("", null, null, "99.99")}
        >
          Add Price
        </button> */}
        <button
          className="toolbar__button"
          onClick={() => onAddItem('', null, null, null, '/images/logo-silpo.svg')}>
          Add Logo
        </button>
        <p className="toolbar__label">Options</p>
        <button className="toolbar__button" onClick={onToggleVerticalRuler}>
          Show/Hide vertical
        </button>
        <button className="toolbar__button" onClick={onToggleHorizontalRuler}>
          Show/Hide horizontal
        </button>
        <button className="toolbar__button" onClick={onToggleGrid}>
          Show/Hide grid
        </button>
        <p className="toolbar__label">Interactions</p>
        <button className="toolbar__button danger" onClick={() => {}}>
          Remove all
        </button>
        <button className="toolbar__button submit" onClick={() => {}}>
          Save
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
