import React from 'react'
import Ruler from "@scena/react-ruler";

function RulerHorizontal({type, style}) {

  return (
    <Ruler
        type={type}
        textFormat={(num) => `${parseInt(num / 8)}mm`}
        direction="start"
        textAlign="center"
        mainLineSize="15"
        textOffset={[0, 6]}
        // segment={10}
        // negativeRuler = {true}
        unit={100}
        style={style}
      />
  )
}

export default RulerHorizontal;
