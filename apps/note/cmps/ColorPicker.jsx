

const { useState, useEffect, useRef } = React


export function ColorPicker({ onChangeColor }) {
  const colors = [
    'white',
    '#f6e2dd',
    '#f39f76',
    '#fff8b8',
    '#e2f6d3',
    '#d3bfdb',
  ];
  const [pickedColor, setPickedColor] = useState(null);

  function onColorPickerClick(ev, color) {
    ev.stopPropagation();
    if (!color) return;
    setPickedColor(color);
    onChangeColor(color);

  }



  return (
    <div className="color-picker">
      {colors.map((color) => (
        <div
          key={color}
          style={{
            backgroundColor: color,
            border: pickedColor === color ? '2px solid black' : '',
            width: '24px',
            height: '24px',
            margin: '4px',
            cursor: 'pointer',
          }}
          onClick={(ev) => onColorPickerClick(ev, color)}
        ></div>
      ))}
    </div>
  );
}