import React from 'react'
import { 
  MousePointer, 
  Type, 
  Square, 
  Circle, 
  Image, 
  Pen, 
  Save, 
  Upload, 
  Download,
  Undo,
  Redo
} from 'lucide-react'

const Toolbar = ({
  activeTool,
  onToolSelect,
  onAddText,
  onAddShape,
  onImageUpload,
  onSave,
  onLoad,
  onExport
}) => {
  return (
    <div className="toolbar">
      {/* Selection Tool */}
      <button
        className={activeTool === 'select' ? 'active' : ''}
        onClick={() => onToolSelect('select')}
        title="Select Tool"
      >
        <MousePointer size={16} />
        Select
      </button>

      {/* Text Tool */}
      <button
        onClick={onAddText}
        title="Add Text"
      >
        <Type size={16} />
        Text
      </button>

      {/* Shape Tools */}
      <button
        onClick={() => onAddShape('rectangle')}
        title="Add Rectangle"
      >
        <Square size={16} />
        Rectangle
      </button>

      <button
        onClick={() => onAddShape('circle')}
        title="Add Circle"
      >
        <Circle size={16} />
        Circle
      </button>

      {/* Image Tool */}
      <div style={{ position: 'relative' }}>
        <input
          type="file"
          accept="image/*"
          onChange={onImageUpload}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
        <button title="Add Image">
          <Image size={16} />
          Image
        </button>
      </div>

      {/* Drawing Tool */}
      <button
        className={activeTool === 'draw' ? 'active' : ''}
        onClick={() => onToolSelect('draw')}
        title="Drawing Tool"
      >
        <Pen size={16} />
        Draw
      </button>

      {/* Separator */}
      <div style={{ width: '1px', height: '30px', background: '#34495e', margin: '0 10px' }} />

      {/* File Operations */}
      <button
        onClick={onSave}
        title="Save Design"
      >
        <Save size={16} />
        Save
      </button>

      <div style={{ position: 'relative' }}>
        <input
          type="file"
          accept=".json"
          onChange={onLoad}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
        <button title="Load Design">
          <Upload size={16} />
          Load
        </button>
      </div>

      <button
        onClick={onExport}
        title="Export as Image"
      >
        <Download size={16} />
        Export
      </button>
    </div>
  )
}

export default Toolbar
