export const scienceTemplates = [
  {
    id: 'lab-report',
    name: 'Lab Report',
    category: 'chemistry',
    preview: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'LAB REPORT',
        x: 50,
        y: 50,
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'Experiment: ',
        x: 50,
        y: 100,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Date: ',
        x: 50,
        y: 130,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Objective: ',
        x: 50,
        y: 160,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Materials: ',
        x: 50,
        y: 190,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Procedure: ',
        x: 50,
        y: 220,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Results: ',
        x: 50,
        y: 250,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Conclusion: ',
        x: 50,
        y: 280,
        fontSize: 16,
        fill: '#34495e'
      }
    ]
  },
  {
    id: 'biology-diagram',
    name: 'Biology Diagram',
    category: 'biology',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'BIOLOGY DIAGRAM',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#27ae60'
      },
      {
        type: 'rect',
        x: 100,
        y: 100,
        width: 200,
        height: 150,
        fill: '#ecf0f1',
        stroke: '#27ae60',
        strokeWidth: 2
      },
      {
        type: 'text',
        text: 'Label your diagram here',
        x: 110,
        y: 270,
        fontSize: 14,
        fill: '#2c3e50'
      }
    ]
  },
  {
    id: 'physics-formulas',
    name: 'Physics Formulas',
    category: 'physics',
    preview: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'PHYSICS FORMULAS',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#e74c3c'
      },
      {
        type: 'text',
        text: 'Kinematics:',
        x: 50,
        y: 100,
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'v = v₀ + at',
        x: 70,
        y: 130,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'x = x₀ + v₀t + ½at²',
        x: 70,
        y: 160,
        fontSize: 16,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Dynamics:',
        x: 50,
        y: 200,
        fontSize: 18,
        fontWeight: 'bold',
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'F = ma',
        x: 70,
        y: 230,
        fontSize: 16,
        fill: '#34495e'
      }
    ]
  },
  {
    id: 'astronomy-presentation',
    name: 'Astronomy Presentation',
    category: 'astronomy',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'ASTRONOMY',
        x: 50,
        y: 50,
        fontSize: 32,
        fontWeight: 'bold',
        fill: '#8e44ad'
      },
      {
        type: 'text',
        text: 'The Solar System',
        x: 50,
        y: 100,
        fontSize: 20,
        fill: '#2c3e50'
      },
      {
        type: 'circle',
        x: 150,
        y: 150,
        radius: 20,
        fill: '#f39c12'
      },
      {
        type: 'text',
        text: 'Sun',
        x: 145,
        y: 180,
        fontSize: 12,
        fill: '#2c3e50'
      },
      {
        type: 'circle',
        x: 200,
        y: 150,
        radius: 8,
        fill: '#95a5a6'
      },
      {
        type: 'text',
        text: 'Mercury',
        x: 195,
        y: 170,
        fontSize: 10,
        fill: '#2c3e50'
      }
    ]
  },
  {
    id: 'periodic-table',
    name: 'Periodic Table',
    category: 'chemistry',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'PERIODIC TABLE',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#2c3e50'
      },
      {
        type: 'rect',
        x: 100,
        y: 100,
        width: 30,
        height: 30,
        fill: '#3498db',
        stroke: '#2c3e50',
        strokeWidth: 1
      },
      {
        type: 'text',
        text: 'H',
        x: 110,
        y: 120,
        fontSize: 14,
        fontWeight: 'bold',
        fill: '#ffffff'
      },
      {
        type: 'text',
        text: 'Hydrogen',
        x: 140,
        y: 120,
        fontSize: 12,
        fill: '#2c3e50'
      }
    ]
  },
  {
    id: 'cell-structure',
    name: 'Cell Structure',
    category: 'biology',
    preview: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'CELL STRUCTURE',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#27ae60'
      },
      {
        type: 'circle',
        x: 200,
        y: 150,
        radius: 80,
        fill: '#ecf0f1',
        stroke: '#27ae60',
        strokeWidth: 3
      },
      {
        type: 'circle',
        x: 200,
        y: 150,
        radius: 30,
        fill: '#e74c3c',
        stroke: '#c0392b',
        strokeWidth: 2
      },
      {
        type: 'text',
        text: 'Nucleus',
        x: 185,
        y: 155,
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#ffffff'
      }
    ]
  },
  {
    id: 'earth-layers',
    name: 'Earth Layers',
    category: 'earth-science',
    preview: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'EARTH LAYERS',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#8e44ad'
      },
      {
        type: 'circle',
        x: 200,
        y: 200,
        radius: 100,
        fill: '#e67e22',
        stroke: '#d35400',
        strokeWidth: 2
      },
      {
        type: 'circle',
        x: 200,
        y: 200,
        radius: 70,
        fill: '#f39c12',
        stroke: '#e67e22',
        strokeWidth: 2
      },
      {
        type: 'circle',
        x: 200,
        y: 200,
        radius: 40,
        fill: '#e74c3c',
        stroke: '#c0392b',
        strokeWidth: 2
      },
      {
        type: 'text',
        text: 'Core',
        x: 190,
        y: 205,
        fontSize: 12,
        fontWeight: 'bold',
        fill: '#ffffff'
      }
    ]
  },
  {
    id: 'solar-system',
    name: 'Solar System',
    category: 'astronomy',
    preview: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=200&h=150&fit=crop',
    elements: [
      {
        type: 'text',
        text: 'SOLAR SYSTEM',
        x: 50,
        y: 50,
        fontSize: 28,
        fontWeight: 'bold',
        fill: '#2c3e50'
      },
      {
        type: 'circle',
        x: 150,
        y: 150,
        radius: 15,
        fill: '#f39c12'
      },
      {
        type: 'text',
        text: 'Sun',
        x: 145,
        y: 175,
        fontSize: 12,
        fill: '#2c3e50'
      },
      {
        type: 'circle',
        x: 200,
        y: 150,
        radius: 5,
        fill: '#95a5a6'
      },
      {
        type: 'text',
        text: 'Mercury',
        x: 195,
        y: 165,
        fontSize: 10,
        fill: '#2c3e50'
      },
      {
        type: 'circle',
        x: 250,
        y: 150,
        radius: 8,
        fill: '#3498db'
      },
      {
        type: 'text',
        text: 'Earth',
        x: 245,
        y: 170,
        fontSize: 10,
        fill: '#2c3e50'
      }
    ]
  }
]
