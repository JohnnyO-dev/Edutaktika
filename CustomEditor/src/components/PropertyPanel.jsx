import React, { useState, useEffect } from 'react'

const PropertyPanel = ({ object, canvas, onUpdate }) => {
  const [properties, setProperties] = useState({
    fill: '#000000',
    fontSize: 24,
    fontFamily: 'Arial',
    fontWeight: 'normal',
    stroke: '#000000',
    strokeWidth: 0,
    opacity: 1,
    angle: 0,
    scaleX: 1,
    scaleY: 1,
  })

  useEffect(() => {
    if (object) {
      setProperties({
        fill: object.fill || '#000000',
        fontSize: object.fontSize || 24,
        fontFamily: object.fontFamily || 'Arial',
        fontWeight: object.fontWeight || 'normal',
        stroke: object.stroke || '#000000',
        strokeWidth: object.strokeWidth || 0,
        opacity: object.opacity || 1,
        angle: object.angle || 0,
        scaleX: object.scaleX || 1,
        scaleY: object.scaleY || 1,
      })
    }
  }, [object])

  const updateProperty = (property, value) => {
    if (object && canvas) {
      object.set(property, value)
      canvas.renderAll()
      onUpdate()
    }
  }

  const commonColors = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF',
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080',
    '#FFC0CB', '#A52A2A', '#808080', '#000080', '#008000'
  ]

  if (!object) return null

  return (
    <div className="property-panel">
      <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Properties</h4>
      
      {/* Fill Color */}
      <div className="property-group">
        <label>Fill Color</label>
        <div className="color-picker">
          {commonColors.map(color => (
            <div
              key={color}
              className={`color-option ${properties.fill === color ? 'active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => updateProperty('fill', color)}
            />
          ))}
        </div>
        <input
          type="color"
          value={properties.fill}
          onChange={(e) => updateProperty('fill', e.target.value)}
          style={{ marginTop: '5px' }}
        />
      </div>

      {/* Text Properties */}
      {object.type === 'text' && (
        <>
          <div className="property-group">
            <label>Font Size</label>
            <input
              type="number"
              value={properties.fontSize}
              onChange={(e) => updateProperty('fontSize', parseInt(e.target.value))}
              min="8"
              max="200"
            />
          </div>

          <div className="property-group">
            <label>Font Family</label>
            <select
              value={properties.fontFamily}
              onChange={(e) => updateProperty('fontFamily', e.target.value)}
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
              <option value="Courier New">Courier New</option>
            </select>
          </div>

          <div className="property-group">
            <label>Font Weight</label>
            <select
              value={properties.fontWeight}
              onChange={(e) => updateProperty('fontWeight', e.target.value)}
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
        </>
      )}

      {/* Stroke Properties */}
      <div className="property-group">
        <label>Stroke Color</label>
        <input
          type="color"
          value={properties.stroke}
          onChange={(e) => updateProperty('stroke', e.target.value)}
        />
      </div>

      <div className="property-group">
        <label>Stroke Width</label>
        <input
          type="number"
          value={properties.strokeWidth}
          onChange={(e) => updateProperty('strokeWidth', parseInt(e.target.value))}
          min="0"
          max="20"
        />
      </div>

      {/* Opacity */}
      <div className="property-group">
        <label>Opacity</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={properties.opacity}
          onChange={(e) => updateProperty('opacity', parseFloat(e.target.value))}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {Math.round(properties.opacity * 100)}%
        </span>
      </div>

      {/* Rotation */}
      <div className="property-group">
        <label>Rotation</label>
        <input
          type="range"
          min="-180"
          max="180"
          value={properties.angle}
          onChange={(e) => updateProperty('angle', parseInt(e.target.value))}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {properties.angle}°
        </span>
      </div>

      {/* Scale */}
      <div className="property-group">
        <label>Scale X</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={properties.scaleX}
          onChange={(e) => updateProperty('scaleX', parseFloat(e.target.value))}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {Math.round(properties.scaleX * 100)}%
        </span>
      </div>

      <div className="property-group">
        <label>Scale Y</label>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={properties.scaleY}
          onChange={(e) => updateProperty('scaleY', parseFloat(e.target.value))}
        />
        <span style={{ fontSize: '12px', color: '#666' }}>
          {Math.round(properties.scaleY * 100)}%
        </span>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => {
          if (object && canvas) {
            canvas.remove(object)
            canvas.renderAll()
            onUpdate()
          }
        }}
        style={{
          width: '100%',
          padding: '10px',
          background: '#e74c3c',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginTop: '15px'
        }}
      >
        Delete Object
      </button>
    </div>
  )
}

export default PropertyPanel
