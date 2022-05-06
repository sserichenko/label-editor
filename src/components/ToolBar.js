import React, { useState } from "react";
import Select from 'react-select';

const ToolBar = ({
  onAddItem,
  onToggleHorizontalRuler,
  onToggleVerticalRuler,
  onToggleGrid,
  onAddCustomItem
}) => {
  const digitOptions = [
    {
      _id: "5F123code",
      description: "Код товара",
      target: null,
      width: 100,
      height: 40,
      top: 110,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/logo-silpo.svg",
      isResizable: false,
      value: "Hello1",
      label: "Код товара"
    },
    {
      _id: "5F123price",
      description: "Стоимость",
      target: null,
      width: 130,
      height: 60,
      top: 140,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/logo-silpo.svg",
      isResizable: false,
      value: "Hello2",
      label: "Стоимость"
    },
    {
      _id: "5F123weight",
      description: "Вес товара",
      target: null,
      width: 180,
      height: 50,
      top: 150,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/logo-silpo.svg",
      isResizable: false,
      value: "Hello3",
      label: "Вес товара"
    },
    {
      _id: "5F123quantity",
      description: "Количество",
      target: null,
      width: 120,
      height: 40,
      top: 200,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/logo-silpo.svg",
      isResizable: false,
      value: "Hello4",
      label: "Количество"
    },
  ];

  const [digitValue, setDigitValue] = useState({label: "Type of digit"});

  // console.log("digitValue >>>", digitValue);

  return (
    <div className="toolbar">
      <div className="tollbar__wrapper">
        <div className="form-select">
          <label htmlFor="digit-select">Digits</label>
          <Select
        defaultValue={digitValue}
        onChange={(e) => {
          setDigitValue(e)
          onAddCustomItem(e)
          // console.log("e >>>", e);
        }}
        options={digitOptions}
      />
        </div>
        <button
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
        </button>
        <button
          className="toolbar__button"
          onClick={() =>
            onAddItem("", null, null, null, "/images/logo-silpo.svg")
          }
        >
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
