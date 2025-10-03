import React, { useState } from 'react'
import { Atom, Palette, Folder } from 'lucide-react'

const SidePanel = ({
  activeTab,
  onTabChange,
  onTemplateSelect,
  onBackgroundSelect,
  templates
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = ['all', 'chemistry', 'biology', 'physics', 'astronomy', 'earth-science', 'general']

  const scienceBackgrounds = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=150&fit=crop',
      category: 'chemistry',
      name: 'Chemistry Lab'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=150&fit=crop',
      category: 'biology',
      name: 'Microscope'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=150&fit=crop',
      category: 'astronomy',
      name: 'Space Galaxy'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=150&fit=crop',
      category: 'physics',
      name: 'Physics Formulas'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=200&h=150&fit=crop',
      category: 'biology',
      name: 'DNA Structure'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
      category: 'chemistry',
      name: 'Periodic Table'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=200&h=150&fit=crop',
      category: 'earth-science',
      name: 'Earth Science'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=800&h=600&fit=crop',
      preview: 'https://images.unsplash.com/photo-1554475901-4538ddfbccc2?w=200&h=150&fit=crop',
      category: 'astronomy',
      name: 'Solar System'
    }
  ]

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory)

  const filteredBackgrounds = selectedCategory === 'all' 
    ? scienceBackgrounds 
    : scienceBackgrounds.filter(bg => bg.category === selectedCategory)

  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h3>Science Design Tools</h3>
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === 'templates' ? 'active' : ''}`}
            onClick={() => onTabChange('templates')}
          >
            <Atom size={14} />
            Templates
          </button>
          <button
            className={`tab-button ${activeTab === 'backgrounds' ? 'active' : ''}`}
            onClick={() => onTabChange('backgrounds')}
          >
            <Palette size={14} />
            Backgrounds
          </button>
          <button
            className={`tab-button ${activeTab === 'saved' ? 'active' : ''}`}
            onClick={() => onTabChange('saved')}
          >
            <Folder size={14} />
            Saved
          </button>
        </div>
      </div>

      <div className="tab-content">
        {/* Category Filter */}
        <div className="category-filter">
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div>
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Quick Templates</h4>
            <div className="template-grid">
              {filteredTemplates.map(template => (
                <div
                  key={template.id}
                  className="template-item"
                  onClick={() => onTemplateSelect(template)}
                >
                  <img src={template.preview} alt={template.name} />
                  <h4>{template.name}</h4>
                  <p>{template.category}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Backgrounds Tab */}
        {activeTab === 'backgrounds' && (
          <div>
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Science Backgrounds</h4>
            <div className="background-grid">
              {filteredBackgrounds.map(background => (
                <div
                  key={background.id}
                  className="background-item"
                  onClick={() => onBackgroundSelect(background.src)}
                >
                  <img src={background.preview} alt={background.name} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Saved Designs Tab */}
        {activeTab === 'saved' && (
          <div>
            <h4 style={{ marginBottom: '15px', color: '#2c3e50' }}>Saved Designs</h4>
            <div className="loading">
              <p>No saved designs yet. Create and save your first design!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SidePanel
