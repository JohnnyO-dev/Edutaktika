import React from 'react';
import { observer } from 'mobx-react-lite';
import { SectionTab } from 'polotno/side-panel';
import { ImagesGrid } from 'polotno/side-panel';
import { getImageSize } from 'polotno/utils/image';
import FaAtom from '@meronex/icons/fa/FaAtom';
import { t } from 'polotno/utils/l10n';

// Science-themed background images and patterns
const SCIENCE_BACKGROUNDS = [
  {
    src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=150&fit=crop',
    credit: 'Chemistry Lab - Unsplash',
    category: 'chemistry'
  },
  {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
    credit: 'Microscope - Unsplash',
    category: 'biology'
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
    credit: 'Space Galaxy - Unsplash',
    category: 'astronomy'
  },
  {
    src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop',
    credit: 'Physics Formulas - Unsplash',
    category: 'physics'
  },
  {
    src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop',
    credit: 'DNA Structure - Unsplash',
    category: 'biology'
  },
  {
    src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
    credit: 'Periodic Table - Unsplash',
    category: 'chemistry'
  },
  {
    src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=150&fit=crop',
    credit: 'Earth Science - Unsplash',
    category: 'earth-science'
  },
  {
    src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
    credit: 'Laboratory Equipment - Unsplash',
    category: 'general'
  },
  {
    src: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=200&h=150&fit=crop',
    credit: 'Solar System - Unsplash',
    category: 'astronomy'
  },
  {
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&h=150&fit=crop',
    credit: 'Molecular Structure - Unsplash',
    category: 'chemistry'
  },
  {
    src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=200&h=150&fit=crop',
    credit: 'Plant Biology - Unsplash',
    category: 'biology'
  },
  {
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
    credit: 'Physics Experiments - Unsplash',
    category: 'physics'
  }
];

// Science-themed template layouts
const SCIENCE_TEMPLATES = [
  {
    id: 'science-lab-report',
    name: 'Lab Report Template',
    preview: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=150&fit=crop',
    category: 'chemistry',
    elements: [
      {
        type: 'text',
        text: 'LAB REPORT',
        fontSize: 32,
        fontWeight: 'bold',
        x: 50,
        y: 50,
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'Experiment: ',
        fontSize: 16,
        x: 50,
        y: 100,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Date: ',
        fontSize: 16,
        x: 50,
        y: 130,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Objective: ',
        fontSize: 16,
        x: 50,
        y: 160,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Materials: ',
        fontSize: 16,
        x: 50,
        y: 190,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Procedure: ',
        fontSize: 16,
        x: 50,
        y: 220,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Results: ',
        fontSize: 16,
        x: 50,
        y: 250,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Conclusion: ',
        fontSize: 16,
        x: 50,
        y: 280,
        fill: '#34495e'
      }
    ]
  },
  {
    id: 'biology-diagram',
    name: 'Biology Diagram Template',
    preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
    category: 'biology',
    elements: [
      {
        type: 'text',
        text: 'BIOLOGY DIAGRAM',
        fontSize: 28,
        fontWeight: 'bold',
        x: 50,
        y: 50,
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
        fontSize: 14,
        x: 110,
        y: 270,
        fill: '#2c3e50'
      }
    ]
  },
  {
    id: 'physics-formula',
    name: 'Physics Formula Sheet',
    preview: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop',
    category: 'physics',
    elements: [
      {
        type: 'text',
        text: 'PHYSICS FORMULAS',
        fontSize: 28,
        fontWeight: 'bold',
        x: 50,
        y: 50,
        fill: '#e74c3c'
      },
      {
        type: 'text',
        text: 'Kinematics:',
        fontSize: 18,
        fontWeight: 'bold',
        x: 50,
        y: 100,
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'v = v₀ + at',
        fontSize: 16,
        x: 70,
        y: 130,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'x = x₀ + v₀t + ½at²',
        fontSize: 16,
        x: 70,
        y: 160,
        fill: '#34495e'
      },
      {
        type: 'text',
        text: 'Dynamics:',
        fontSize: 18,
        fontWeight: 'bold',
        x: 50,
        y: 200,
        fill: '#2c3e50'
      },
      {
        type: 'text',
        text: 'F = ma',
        fontSize: 16,
        x: 70,
        y: 230,
        fill: '#34495e'
      }
    ]
  },
  {
    id: 'astronomy-presentation',
    name: 'Astronomy Presentation',
    preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
    category: 'astronomy',
    elements: [
      {
        type: 'text',
        text: 'ASTRONOMY',
        fontSize: 32,
        fontWeight: 'bold',
        x: 50,
        y: 50,
        fill: '#8e44ad'
      },
      {
        type: 'text',
        text: 'The Solar System',
        fontSize: 20,
        x: 50,
        y: 100,
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
        fontSize: 12,
        x: 145,
        y: 180,
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
        fontSize: 10,
        x: 195,
        y: 170,
        fill: '#2c3e50'
      }
    ]
  }
];

export const ScienceTemplatesPanel = observer(({ store }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  
  const categories = ['all', 'chemistry', 'biology', 'physics', 'astronomy', 'earth-science', 'general'];
  
  const filteredBackgrounds = selectedCategory === 'all' 
    ? SCIENCE_BACKGROUNDS 
    : SCIENCE_BACKGROUNDS.filter(bg => bg.category === selectedCategory);
  
  const filteredTemplates = selectedCategory === 'all' 
    ? SCIENCE_TEMPLATES 
    : SCIENCE_TEMPLATES.filter(template => template.category === selectedCategory);

  const applyTemplate = (template) => {
    // Clear current page
    store.activePage?.children.forEach(child => {
      store.activePage?.removeChild(child);
    });

    // Add template elements
    template.elements.forEach(element => {
      if (element.type === 'text') {
        const textElement = store.activePage?.addElement({
          type: 'text',
          text: element.text,
          fontSize: element.fontSize,
          fontWeight: element.fontWeight,
          x: element.x,
          y: element.y,
          fill: element.fill
        });
      } else if (element.type === 'rect') {
        const rectElement = store.activePage?.addElement({
          type: 'rect',
          x: element.x,
          y: element.y,
          width: element.width,
          height: element.height,
          fill: element.fill,
          stroke: element.stroke,
          strokeWidth: element.strokeWidth
        });
      } else if (element.type === 'circle') {
        const circleElement = store.activePage?.addElement({
          type: 'circle',
          x: element.x,
          y: element.y,
          radius: element.radius,
          fill: element.fill
        });
      }
    });
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px', fontSize: '12px', color: '#666', textAlign: 'center' }}>
        Science-themed templates for students
      </div>
      
      {/* Category Filter */}
      <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '100%', padding: '5px', fontSize: '12px' }}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      {/* Templates Section */}
      <div style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '14px', color: '#2c3e50' }}>
          Quick Templates
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px' }}>
          {filteredTemplates.map(template => (
            <div
              key={template.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '4px',
                padding: '5px',
                cursor: 'pointer',
                textAlign: 'center',
                fontSize: '10px'
              }}
              onClick={() => applyTemplate(template)}
            >
              <img 
                src={template.preview} 
                style={{ width: '100%', height: '40px', objectFit: 'cover', borderRadius: '2px' }}
                alt={template.name}
              />
              <div style={{ marginTop: '2px', color: '#666' }}>
                {template.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Backgrounds Section */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        <h4 style={{ margin: '10px', fontSize: '14px', color: '#2c3e50' }}>
          Science Backgrounds
        </h4>
        <ImagesGrid
          images={filteredBackgrounds}
          getPreview={(image) => image.preview}
          crossOrigin="anonymous"
          onSelect={async (item, pos, element) => {
            const image = item.src;
            let { width, height } = await getImageSize(image);

            // Set as background for the current page
            store.activePage?.set({
              backgroundImage: image,
              backgroundImageWidth: width,
              backgroundImageHeight: height,
            });
          }}
        />
      </div>
    </div>
  );
});

export const ScienceTemplatesSection = {
  name: 'science-templates',
  Tab: observer((props) => (
    <SectionTab name="Science Templates" {...props}>
      <FaAtom />
    </SectionTab>
  )),
  Panel: ScienceTemplatesPanel,
};
