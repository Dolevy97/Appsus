

const { useState, useEffect, useRef } = React


export function ColorPicker({ onChangeColor }) {
  const colors = [
    'white',
    '#f6e2dd',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#d3bfdb',
    '#aeccdc',
  ]
  const [pickedColor, setPickedColor] = useState(null)

  function onColorPickerClick(ev, color) {
    ev.stopPropagation()
    if (!color) return
    setPickedColor(color)
    onChangeColor(color)

  }



  return (
    <div className="color-picker icones-display">
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${pickedColor === color ? 'selected' : ''}`}
          style={
            { backgroundColor: color }}
          onClick={(ev) => onColorPickerClick(ev, color)}
        ></div>
      ))}
    </div>
  )
}