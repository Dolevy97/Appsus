

const { useState, useEffect, useRef } = React
const { Link, useParams, useNavigate } = ReactRouterDOM


export function ColorPicker({ onChangeColor }) {
  const navigate = useNavigate()


  const { noteId } = useParams()



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
    <div className={`color-picker ${noteId ? 'icones-display-edit' : 'icones-display'}`}>
      {colors.map((color) => (
        <div
          key={color}
          className={`color-option ${pickedColor === color ? 'selected' : ''}`}
          style={
            { backgroundColor: color }}
          onClick={(ev) => {
            onColorPickerClick(ev, color)
            navigate('/note')
          }}

        ></div>
      ))}
    </div>
  )
}