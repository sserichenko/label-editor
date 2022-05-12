import React, { useState } from "react";
import Select from "react-select";

const ToolBar = ({
  onAddItem,
  onToggleHorizontalRuler,
  onToggleVerticalRuler,
  onToggleGrid,
  onAddCustomItem,
  onUpdateLabelSizeHandler,
  onUpdateFontSizeHandler,
  onUpdateStatusHandler
}) => {
  const digitOptions = [
    {
      _id: "5F123code",
      type: "DigitField",
      description: "Код товара",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 110,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/code-zzzzzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello1",
      label: "Код товара",
    },
    {
      _id: "5F123price",
      type: "DigitField",
      description: "Стоимость(-налог)",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 140,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello2",
      label: "Стоимость(-налог)",
    },
    {
      _id: "5F123priceperone",
      type: "DigitField",
      description: "Цена за единицу",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 150,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello3",
      label: "Цена за единицу",
    },
    {
      _id: "5F123weight",
      type: "DigitField",
      description: "Вес",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 200,
      left: 0,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zz-dot-zzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Вес",
    },
    {
      _id: "5F123quantity",
      type: "DigitField",
      description: "Количество",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 240,
      left: 40,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zzzzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Количество",
    },
    {
      _id: "5F123packagedate",
      type: "DigitField",
      description: "Дата упаковки",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 260,
      left: 60,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/date-astr-6-symb.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Дата упаковки",
    },
    {
      _id: "5F123packagetime",
      type: "DigitField",
      description: "Время упаковки",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 120,
      left: 60,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/time-zz-zz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Время упаковки",
    },
    {
      _id: "5F123rangeunit",
      type: "DigitField",
      description: "Единица измерения",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 120,
      left: 60,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Единица измерения",
    },
    {
      _id: "5F123selldate",
      type: "DigitField",
      description: "Дата продажи",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 140,
      left: 60,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/date-astr-6-symb.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Дата продажи",
    },
    {
      _id: "5F123selltime",
      type: "DigitField",
      description: "Время продажи",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 140,
      left: 60,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/time-zz-zz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Время продажи",
    },
    {
      _id: "5F123discountvalue",
      type: "DigitField",
      description: "Сумма скидки",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 100,
      left: 50,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Сумма скидки",
    },
    {
      _id: "5F123usagedate",
      type: "DigitField",
      description: "Дата использования",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 80,
      left: 50,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/date-astr-6-symb.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Дата использования",
    },
    {
      _id: "5F123maingroupnumber",
      type: "DigitField",
      description: "Номер основной группы",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 160,
      left: 100,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Номер основной группы",
    },
    {
      _id: "5F123departmentnumber",
      type: "DigitField",
      description: "Номер отдела",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 170,
      left: 50,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Номер отдела",
    },
    {
      _id: "5F123scalenumber",
      type: "DigitField",
      description: "Номер весов",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 110,
      left: 20,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/code-zzzzzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Номер весов",
    },
    {
      _id: "5F123tareweight",
      type: "DigitField",
      description: "Вес тары",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 130,
      left: 30,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-z-zzz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Вес тары",
    },
    {
      _id: "5F123seilorcode",
      type: "DigitField",
      description: "Код продавца",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 90,
      left: 50,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/svg-zz.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Код продавца",
    },
    {
      _id: "5F123priceandtax",
      type: "DigitField",
      description: "Стоимость(+ налог)",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 150,
      left: 30,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Стоимость(+ налог)",
    },
    {
      _id: "5F123taxvalue",
      type: "DigitField",
      description: "Значение налога",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 60,
      left: 30,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Значение налога",
    },
    {
      _id: "5F123bonus",
      type: "DigitField",
      description: "Бонус",
      status: "Всегда печатать",
      font: "M3",
      target: null,
      width: 104,
      height: 24,
      top: 110,
      left: 50,
      rotate: 0,
      picture: null,
      title: null,
      price: null,
      digit: "/images/four-zero-dot-two.svg",
      isResizable: false,
          isRotateble: false,
          isDragable: false,
      value: "Hello4",
      label: "Бонус",
    },
  ];

  const statusOptions = [
    {
      id: "status1",
      label: "Всегда печатать",
      value: "Всегда печатать",
    },
    {
      id: "status2",
      label: "Не печатать",
      value: "Не печатать",
    },
    {
      id: "status3",
      label: "Печать для весового товара",
      value: "Печать для весового товара",
    },
    {
      id: "status4",
      label: "Для весового товара с 1-ой ценой",
      value: "Для весового товара с 1-ой ценой",
    },
    {
      id: "status5",
      label: "Для весового товара с 2-ой ценой",
      value: "Для весового товара с 2-ой ценой",
    },
    {
      id: "status6",
      label: "Печать для штучного товара",
      value: "Печать для штучного товара",
    },
    {
      id: "status7",
      label: "Штучный товар с 1-ой ценой",
      value: "Штучный товар с 1-ой ценой",
    },
    {
      id: "status8",
      label: "Штучный товар со 2-ой ценой",
      value: "Штучный товар со 2-ой ценой",
    },
  ];

  const fontSizeOptions = [
    {
      id: "fontSizeS1",
      label: "S1",
      value: {
        width: 40,
        height: 8
      }
    },
    {
      id: "fontSizeS2",
      label: "S2",
      value: {
        width: 48,
        height: 9
      }
    },
    {
      id: "fontSizeS3",
      label: "S3",
      value: {
        width: 52,
        height: 12
      }
    },
    {
      id: "fontSizeS4",
      label: "S4",
      value: {
        width: 52,
        height: 16
      }
    },
    {
      id: "fontSizeS5",
      label: "S5",
      value: {
        width: 70,
        height: 22
      }
    },
    {
      id: "fontSizeM1",
      label: "M1",
      value: {
        width: 76,
        height: 14
      }
    },
    {
      id: "fontSizeM2",
      label: "M2",
      value: {
        width: 91,
        height: 20
      }
    },
    {
      id: "fontSizeM3",
      label: "M3",
      value: {
        width: 104,
        height: 24
      }
    },
    {
      id: "fontSizeM4",
      label: "M4",
      value: {
        width: 104,
        height: 32
      }
    },
    {
      id: "fontSizeM5",
      label: "M5",
      value: {
        width: 142,
        height: 44
      }
    }
  ]

  const [digitValue, setDigitValue] = useState({ label: "Выбрать тип поля" });
  const [fontSizeValue, setFontSizeValue] = useState({
    id: "fontSizeM3",
      label: "M3",
      value: {
        width: 104,
        height: 24
      }
  })
  const [status, setStatus] = useState({
    id: "status1",
    label: "Всегда печатать",
    value: "Всегда печатать",
  },)
  const [formData, setFormData] = useState({
    width: 600,
    height: 600,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateLabelSizeHandler(formData);
  };

  // console.log("digitValue >>>", digitValue);

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
                onChange={(e) =>
                  setFormData({ ...formData, width: e.target.value })
                }
              />
            </div>
            <div className="form-field">
              <label htmlFor="height-input">Height</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={(e) =>
                  setFormData({ ...formData, height: e.target.value })
                }
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
          <label htmlFor="digit-select">Цифровое поле</label>
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
        <label htmlFor="status-select">Статус</label>
          <Select
            id="status-select"
            className="custom-select"
            defaultValue={status}
            onChange={(e) => {
              setStatus(e);
              onUpdateStatusHandler(e)
              console.log("e STATUS >>>", e);
            }}
            options={statusOptions}
          />
        </div>
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
