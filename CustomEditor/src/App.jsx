import React, { useState, useRef, useEffect } from 'react'
import { fabric } from 'fabric'
import Toolbar from './components/Toolbar'
import SidePanel from './components/SidePanel'
import PropertyPanel from './components/PropertyPanel'
import { useCanvas } from './hooks/useCanvas'
import { scienceTemplates } from './templates/scienceTemplates'

function App() {
  const canvasRef = useRef(null)
  const [activeTool, setActiveTool] = useState('select')
  const [selectedObject, setSelectedObject] = useState(null)
  const [activeTab, setActiveTab] = useState('templates')
  const [canvas, setCanvas] = useState(null)

  const { 
    initializeCanvas, 
    addText, 
    addRectangle, 
    addCircle, 
    addImage, 
    setBackground,
    applyTemplate,
    saveDesign,
    loadDesign,
    exportImage
  } = useCanvas()

  useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = initializeCanvas(canvasRef.current)
      setCanvas(newCanvas)

      // Set up event listeners
      newCanvas.on('selection:created', (e) => {
        setSelectedObject(e.selected[0])
      })

      newCanvas.on('selection:updated', (e) => {
        setSelectedObject(e.selected[0])
      })

      newCanvas.on('selection:cleared', () => {
        setSelectedObject(null)
      })

      newCanvas.on('object:modified', () => {
        newCanvas.renderAll()
      })

      return () => {
        newCanvas.dispose()
      }
    }
  }, [])

  const handleToolSelect = (tool) => {
    setActiveTool(tool)
    if (canvas) {
      canvas.isDrawingMode = tool === 'draw'
      canvas.selection = tool !== 'draw'
      canvas.forEachObject((obj) => {
        obj.selectable = tool !== 'draw'
        obj.evented = tool !== 'draw'
      })
      canvas.renderAll()
    }
  }

  const handleAddText = () => {
    if (canvas) {
      addText(canvas, 'Click to edit text')
    }
  }

  const handleAddShape = (shape) => {
    if (canvas) {
      if (shape === 'rectangle') {
        addRectangle(canvas)
      } else if (shape === 'circle') {
        addCircle(canvas)
      }
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file && canvas) {
      const reader = new FileReader()
      reader.onload = (e) => {
        addImage(canvas, e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTemplateSelect = (template) => {
    if (canvas) {
      applyTemplate(canvas, template)
    }
  }

  const handleBackgroundSelect = (backgroundUrl) => {
    if (canvas) {
      setBackground(canvas, backgroundUrl)
    }
  }

  const handleSave = () => {
    if (canvas) {
      saveDesign(canvas)
    }
  }

  const handleLoad = (event) => {
    const file = event.target.files[0]
    if (file && canvas) {
      const reader = new FileReader()
      reader.onload = (e) => {
        loadDesign(canvas, e.target.result)
      }
      reader.readAsText(file)
    }
  }

  const handleExport = () => {
    if (canvas) {
      exportImage(canvas)
    }
  }

  return (
    <div className="app">
      <Toolbar
        activeTool={activeTool}
        onToolSelect={handleToolSelect}
        onAddText={handleAddText}
        onAddShape={handleAddShape}
        onImageUpload={handleImageUpload}
        onSave={handleSave}
        onLoad={handleLoad}
        onExport={handleExport}
      />
      
      <SidePanel
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onTemplateSelect={handleTemplateSelect}
        onBackgroundSelect={handleBackgroundSelect}
        templates={scienceTemplates}
      />

      <div className="canvas-container">
        <div className="canvas-wrapper">
          <canvas ref={canvasRef} id="fabric-canvas" width={800} height={600} />
        </div>
      </div>

      {selectedObject && (
        <PropertyPanel
          object={selectedObject}
          canvas={canvas}
          onUpdate={() => canvas?.renderAll()}
        />
      )}
    </div>
  )
}

export default App
