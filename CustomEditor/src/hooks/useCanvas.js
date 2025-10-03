import { fabric } from 'fabric'
import { v4 as uuidv4 } from 'uuid'

export const useCanvas = () => {
  const initializeCanvas = (canvasElement) => {
    const canvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff',
      selection: true,
      preserveObjectStacking: true,
    })

    // Set up default styles
    fabric.Object.prototype.set({
      transparentCorners: false,
      cornerColor: '#3498db',
      cornerStyle: 'circle',
      cornerSize: 10,
      borderColor: '#3498db',
      borderScaleFactor: 2,
    })

    return canvas
  }

  const addText = (canvas, text = 'Text') => {
    const textObject = new fabric.Text(text, {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: '#2c3e50',
      fontFamily: 'Arial',
    })
    
    canvas.add(textObject)
    canvas.setActiveObject(textObject)
    canvas.renderAll()
  }

  const addRectangle = (canvas) => {
    const rect = new fabric.Rect({
      left: 100,
      top: 100,
      width: 100,
      height: 100,
      fill: '#3498db',
      stroke: '#2c3e50',
      strokeWidth: 2,
    })
    
    canvas.add(rect)
    canvas.setActiveObject(rect)
    canvas.renderAll()
  }

  const addCircle = (canvas) => {
    const circle = new fabric.Circle({
      left: 100,
      top: 100,
      radius: 50,
      fill: '#e74c3c',
      stroke: '#2c3e50',
      strokeWidth: 2,
    })
    
    canvas.add(circle)
    canvas.setActiveObject(circle)
    canvas.renderAll()
  }

  const addImage = (canvas, imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to fit canvas if too large
      const maxWidth = 300
      const maxHeight = 300
      
      if (img.width > maxWidth || img.height > maxHeight) {
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height)
        img.scale(scale)
      }
      
      img.set({
        left: 100,
        top: 100,
      })
      
      canvas.add(img)
      canvas.setActiveObject(img)
      canvas.renderAll()
    })
  }

  const setBackground = (canvas, imageUrl) => {
    fabric.Image.fromURL(imageUrl, (img) => {
      // Scale image to cover entire canvas
      const canvasWidth = canvas.width
      const canvasHeight = canvas.height
      const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height)
      
      img.set({
        scaleX: scale,
        scaleY: scale,
        left: 0,
        top: 0,
        selectable: false,
        evented: false,
      })
      
      // Remove existing background
      const existingBackground = canvas.getObjects().find(obj => !obj.selectable)
      if (existingBackground) {
        canvas.remove(existingBackground)
      }
      
      canvas.add(img)
      canvas.sendToBack(img)
      canvas.renderAll()
    })
  }

  const applyTemplate = (canvas, template) => {
    // Clear existing objects (except background)
    const background = canvas.getObjects().find(obj => !obj.selectable)
    canvas.clear()
    if (background) {
      canvas.add(background)
      canvas.sendToBack(background)
    }

    // Add template elements
    template.elements.forEach((element, index) => {
      setTimeout(() => {
        if (element.type === 'text') {
          const textObject = new fabric.Text(element.text, {
            left: element.x,
            top: element.y,
            fontSize: element.fontSize,
            fontWeight: element.fontWeight,
            fill: element.fill,
            fontFamily: 'Arial',
          })
          canvas.add(textObject)
        } else if (element.type === 'rect') {
          const rect = new fabric.Rect({
            left: element.x,
            top: element.y,
            width: element.width,
            height: element.height,
            fill: element.fill,
            stroke: element.stroke,
            strokeWidth: element.strokeWidth,
          })
          canvas.add(rect)
        } else if (element.type === 'circle') {
          const circle = new fabric.Circle({
            left: element.x,
            top: element.y,
            radius: element.radius,
            fill: element.fill,
          })
          canvas.add(circle)
        }
        canvas.renderAll()
      }, index * 100) // Stagger the additions for visual effect
    })
  }

  const saveDesign = (canvas) => {
    const designData = {
      id: uuidv4(),
      name: `Design_${new Date().toISOString().split('T')[0]}`,
      data: JSON.stringify(canvas.toJSON()),
      timestamp: new Date().toISOString(),
    }

    // Save to localStorage
    const savedDesigns = JSON.parse(localStorage.getItem('savedDesigns') || '[]')
    savedDesigns.push(designData)
    localStorage.setItem('savedDesigns', JSON.stringify(savedDesigns))

    // Download as JSON file
    const blob = new Blob([JSON.stringify(designData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${designData.name}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    alert('Design saved successfully!')
  }

  const loadDesign = (canvas, jsonString) => {
    try {
      const designData = JSON.parse(jsonString)
      canvas.loadFromJSON(designData.data, () => {
        canvas.renderAll()
        alert('Design loaded successfully!')
      })
    } catch (error) {
      alert('Error loading design: ' + error.message)
    }
  }

  const exportImage = (canvas) => {
    const dataURL = canvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 2, // Higher resolution
    })

    const link = document.createElement('a')
    link.download = `design_${new Date().toISOString().split('T')[0]}.png`
    link.href = dataURL
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    initializeCanvas,
    addText,
    addRectangle,
    addCircle,
    addImage,
    setBackground,
    applyTemplate,
    saveDesign,
    loadDesign,
    exportImage,
  }
}
