import React, { useState, useEffect, useRef } from 'react';
import ImageUploader from './ImageUploader.tsx';
import ReactCrop, { type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import './AdminDashboard.css';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

interface EventItem {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  imageUrl?: string;
}

interface HeroSettings {
  imageUrl: string;
  title: string;
  subtitle: string;
  imagePosition: {
    x: number;
    y: number;
    scale: number;
  };
}

interface AboutSection {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  imagePosition?: {
    x: number;
    y: number;
    scale: number;
  };
  reverseLayout?: boolean;
}

interface TeamMember {
  id: number;
  name: string;
  position: string;
  bio: string;
  imageUrl?: string;
}

interface ValueItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface AboutHeroSettings {
  imageUrl: string;
  title: string;
  subtitle: string;
  imagePosition: {
    x: number;
    y: number;
    scale: number;
  };
}

const AdminDashboard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    imageUrl: '',
    title: 'Welcome to Our School',
    subtitle: 'Excellence in Education Since 2000',
    imagePosition: {
      x: 50,
      y: 50,
      scale: 1.0
    }
  });
  const [aboutHero, setAboutHero] = useState<AboutHeroSettings>({
    imageUrl: '',
    title: 'About Us',
    subtitle: '',
    imagePosition: {
      x: 50,
      y: 50,
      scale: 1.0
    }
  });
  const [aboutSections, setAboutSections] = useState<AboutSection[]>([
    {
      id: 1,
      title: 'Our Story',
      content: 'Add your story here...',
      reverseLayout: false
    }
  ]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<ValueItem[]>([
    {
      id: 1,
      title: 'Excellence',
      description: 'Striving for the highest standards in everything we do.',
      icon: ''
    },
    {
      id: 2,
      title: 'Integrity',
      description: 'Acting with honesty and strong moral principles.',
      icon: ''
    },
    {
      id: 3,
      title: 'Innovation',
      description: 'Embracing creativity and forward-thinking approaches.',
      icon: ''
    }
  ]);
  const [activeTab, setActiveTab] = useState('hero');
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 100,
    height: 100,
    x: 0,
    y: 0
  });
  const [isEditingPosition, setIsEditingPosition] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const savedNews = localStorage.getItem('schoolNews');
    const savedEvents = localStorage.getItem('schoolEvents');
    const savedHero = localStorage.getItem('schoolHero');
    const savedAboutHero = localStorage.getItem('schoolAboutHero');
    const savedAboutSections = localStorage.getItem('schoolAboutSections');
    const savedTeamMembers = localStorage.getItem('schoolTeamMembers');
    const savedValues = localStorage.getItem('schoolAboutValues');
    
    if (savedNews) setNews(JSON.parse(savedNews));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedHero) {
      const saved = JSON.parse(savedHero);
      if (!saved.imagePosition) {
        saved.imagePosition = { x: 50, y: 50, scale: 1.0 };
      }
      setHeroSettings(saved);
      setCrop({
        unit: '%',
        width: 100,
        height: 100,
        x: saved.imagePosition?.x || 0,
        y: saved.imagePosition?.y || 0
      });
    }
    if (savedAboutHero) {
      const saved = JSON.parse(savedAboutHero);
      if (!saved.imagePosition) {
        saved.imagePosition = { x: 50, y: 50, scale: 1.0 };
      }
      setAboutHero(saved);
    }
    if (savedAboutSections) setAboutSections(JSON.parse(savedAboutSections));
    if (savedTeamMembers) setTeamMembers(JSON.parse(savedTeamMembers));
    if (savedValues) setValues(JSON.parse(savedValues));
  }, []);

  useEffect(() => {
    localStorage.setItem('schoolNews', JSON.stringify(news));
    localStorage.setItem('schoolEvents', JSON.stringify(events));
    localStorage.setItem('schoolHero', JSON.stringify(heroSettings));
    localStorage.setItem('schoolAboutHero', JSON.stringify(aboutHero));
    localStorage.setItem('schoolAboutSections', JSON.stringify(aboutSections));
    localStorage.setItem('schoolTeamMembers', JSON.stringify(teamMembers));
    localStorage.setItem('schoolAboutValues', JSON.stringify(values));
  }, [news, events, heroSettings, aboutHero, aboutSections, teamMembers, values]);

  const addNews = () => {
    const newNews: NewsItem = {
      id: Date.now(),
      title: `News Title ${news.length + 1}`,
      content: 'News content here...',
      date: new Date().toLocaleDateString()
    };
    setNews([...news, newNews]);
  };

  const addEvent = () => {
    const newEvent: EventItem = {
      id: Date.now(),
      title: `Event ${events.length + 1}`,
      description: 'Event description here...',
      date: new Date().toLocaleDateString(),
      location: 'School Auditorium'
    };
    setEvents([...events, newEvent]);
  };

  const addAboutSection = () => {
    const newSection: AboutSection = {
      id: Date.now(),
      title: `New Section ${aboutSections.length + 1}`,
      content: 'Add section content here...',
      reverseLayout: aboutSections.length % 2 === 1
    };
    setAboutSections([...aboutSections, newSection]);
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now(),
      name: `Team Member ${teamMembers.length + 1}`,
      position: 'Position',
      bio: 'Team member bio here...'
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const addValue = () => {
    const newValue: ValueItem = {
      id: Date.now(),
      title: `New Value ${values.length + 1}`,
      description: 'Value description here...',
      icon: '🌟'
    };
    setValues([...values, newValue]);
  };

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(item => item.id !== id));
  };

  const deleteAboutSection = (id: number) => {
    setAboutSections(aboutSections.filter(section => section.id !== id));
  };

  const deleteTeamMember = (id: number) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const deleteValue = (id: number) => {
    setValues(values.filter(value => value.id !== id));
  };

  const updateItem = (type: 'news' | 'events', id: number, field: string, value: string) => {
    if (type === 'news') {
      setNews(news.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    } else {
      setEvents(events.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      ));
    }
  };

  const updateAboutSection = (id: number, field: string, value: any) => {
    setAboutSections(aboutSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const updateTeamMember = (id: number, field: string, value: string) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const updateValue = (id: number, field: string, value: string) => {
    setValues(values.map(item => 
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const handleImageUpload = (type: 'news' | 'events' | 'hero' | 'aboutHero' | 'aboutSection' | 'teamMember', id?: number, imageUrl?: string) => {
    if (type === 'news' && id !== undefined) {
      setNews(news.map(item => 
        item.id === id ? { ...item, imageUrl: imageUrl || '' } : item
      ));
    } else if (type === 'events' && id !== undefined) {
      setEvents(events.map(item => 
        item.id === id ? { ...item, imageUrl: imageUrl || '' } : item
      ));
    } else if (type === 'hero') {
      setHeroSettings({ 
        ...heroSettings, 
        imageUrl: imageUrl || '',
        imagePosition: { x: 50, y: 50, scale: 1.0 }
      });
      setCrop({
        unit: '%',
        width: 100,
        height: 100,
        x: 0,
        y: 0
      });
    } else if (type === 'aboutHero') {
      setAboutHero({ 
        ...aboutHero, 
        imageUrl: imageUrl || '',
        imagePosition: { x: 50, y: 50, scale: 1.0 }
      });
    } else if (type === 'aboutSection' && id !== undefined) {
      setAboutSections(aboutSections.map(section => 
        section.id === id ? { ...section, imageUrl: imageUrl || '' } : section
      ));
    } else if (type === 'teamMember' && id !== undefined) {
      setTeamMembers(teamMembers.map(member => 
        member.id === id ? { ...member, imageUrl: imageUrl || '' } : member
      ));
    }
  };

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop);
    if (newCrop.x !== undefined && newCrop.y !== undefined) {
      setHeroSettings(prev => ({
        ...prev,
        imagePosition: {
          ...prev.imagePosition,
          x: newCrop.x || 0,
          y: newCrop.y || 0
        }
      }));
    }
  };

  const handlePositionChange = (axis: 'x' | 'y', value: number) => {
    const newPosition = { ...heroSettings.imagePosition, [axis]: value };
    setHeroSettings({ ...heroSettings, imagePosition: newPosition });
    setCrop(prev => ({ ...prev, [axis]: value }));
  };

  const handleScaleChange = (value: number) => {
    const newPosition = { ...heroSettings.imagePosition, scale: value };
    setHeroSettings({ ...heroSettings, imagePosition: newPosition });
  };

  const resetHero = () => {
    setHeroSettings({
      imageUrl: '',
      title: 'Welcome to Our School',
      subtitle: 'Excellence in Education Since 2000',
      imagePosition: { x: 50, y: 50, scale: 1.0 }
    });
    setCrop({
      unit: '%',
      width: 100,
      height: 100,
      x: 0,
      y: 0
    });
    setIsEditingPosition(false);
  };

  const togglePositionEditor = () => {
    setIsEditingPosition(!isEditingPosition);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button 
          className="logout-button"
          onClick={() => {
            localStorage.removeItem('isAdmin');
            window.location.href = '/';
          }}
        >
          Logout
        </button>
      </header>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'hero' ? 'active' : ''}`}
          onClick={() => setActiveTab('hero')}
        >
          Homepage Hero
        </button>
        <button 
          className={`tab-button ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          Manage News
        </button>
        <button 
          className={`tab-button ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          Manage Events
        </button>
        <button 
          className={`tab-button ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          Manage About Us
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'hero' ? (
          <div className="hero-management">
            <div className="section-header">
              <h2>Hero Section Settings</h2>
            </div>
            
            <div className="editable-item">
              <input
                type="text"
                value={heroSettings.title}
                onChange={(e) => setHeroSettings({ ...heroSettings, title: e.target.value })}
                className="edit-input"
                placeholder="Hero Title"
              />
              
              <input
                type="text"
                value={heroSettings.subtitle}
                onChange={(e) => setHeroSettings({ ...heroSettings, subtitle: e.target.value })}
                className="edit-input"
                placeholder="Hero Subtitle"
              />
              
              <div className="image-upload-section">
                <label>Hero Background Image</label>
                {heroSettings.imageUrl && (
                  <div style={{ marginBottom: '20px' }}>
                    {isEditingPosition ? (
                      <div className="position-editor">
                        <div className="editor-header">
                          <h4>Adjust Image Position & Zoom</h4>
                          <button 
                            className="done-button"
                            onClick={togglePositionEditor}
                          >
                            Done
                          </button>
                        </div>
                        <div className="crop-container">
                          <ReactCrop
                            crop={crop}
                            onChange={handleCropChange}
                            aspect={16/9}
                            minWidth={30}
                            minHeight={30}
                          >
                            <img 
                              ref={imgRef}
                              src={heroSettings.imageUrl} 
                              alt="Crop preview" 
                              style={{ maxWidth: '100%', maxHeight: '400px' }}
                            />
                          </ReactCrop>
                        </div>
                        <div className="position-controls">
                          <div className="control-group">
                            <label>Horizontal Position: {heroSettings.imagePosition.x}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={heroSettings.imagePosition.x}
                              onChange={(e) => handlePositionChange('x', parseInt(e.target.value))}
                              className="position-slider"
                            />
                            <div className="slider-labels">
                              <span>Left</span>
                              <span>Center</span>
                              <span>Right</span>
                            </div>
                          </div>
                          <div className="control-group">
                            <label>Vertical Position: {heroSettings.imagePosition.y}%</label>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={heroSettings.imagePosition.y}
                              onChange={(e) => handlePositionChange('y', parseInt(e.target.value))}
                              className="position-slider"
                            />
                            <div className="slider-labels">
                              <span>Top</span>
                              <span>Center</span>
                              <span>Bottom</span>
                            </div>
                          </div>
                          <div className="control-group">
                            <label>Zoom Level: {(heroSettings.imagePosition.scale * 100).toFixed(0)}%</label>
                            <input
                              type="range"
                              min="50"
                              max="200"
                              step="5"
                              value={heroSettings.imagePosition.scale * 100}
                              onChange={(e) => handleScaleChange(parseInt(e.target.value) / 100)}
                              className="position-slider"
                            />
                            <div className="slider-labels">
                              <span>50%</span>
                              <span>100%</span>
                              <span>200%</span>
                            </div>
                          </div>
                          <button 
                            className="reset-position-button"
                            onClick={() => {
                              setHeroSettings({
                                ...heroSettings,
                                imagePosition: { x: 50, y: 50, scale: 1.0 }
                              });
                              setCrop({
                                unit: '%',
                                width: 100,
                                height: 100,
                                x: 0,
                                y: 0
                              });
                            }}
                          >
                            Reset to Center
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="preview-container">
                          <img 
                            src={heroSettings.imageUrl} 
                            alt="Hero Preview" 
                            className="hero-preview"
                            style={{
                              objectPosition: `${heroSettings.imagePosition.x}% ${heroSettings.imagePosition.y}%`,
                              objectFit: 'cover',
                              transform: `scale(${heroSettings.imagePosition.scale})`
                            }}
                          />
                          <div className="position-indicator" style={{
                            left: `${heroSettings.imagePosition.x}%`,
                            top: `${heroSettings.imagePosition.y}%`
                          }}></div>
                        </div>
                        <button 
                          className="position-button"
                          onClick={togglePositionEditor}
                        >
                           Adjust Image Position & Zoom
                        </button>
                      </>
                    )}
                  </div>
                )}
                <ImageUploader
                  onImageUpload={(imageUrl: string) => handleImageUpload('hero', undefined, imageUrl)}
                  existingImage={heroSettings.imageUrl}
                />
                <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                </p>
              </div>
              
              <div className="hero-controls">
                <button 
                  className="delete-button"
                  onClick={() => {
                    setHeroSettings({ ...heroSettings, imageUrl: '' });
                    setIsEditingPosition(false);
                  }}
                >
                  Remove Image
                </button>
                <button 
                  className="add-button"
                  onClick={resetHero}
                >
                  Reset All Settings
                </button>
              </div>
            </div>
            
            <div className="preview-section" style={{ marginTop: '30px' }}>
              <h3>Live Preview</h3>
              <div className="hero-preview-container" style={{
                backgroundImage: heroSettings.imageUrl 
                  ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroSettings.imageUrl})`
                  : 'linear-gradient(135deg, #2c5aa0 0%, #1d3d6f 100%)',
                backgroundSize: heroSettings.imageUrl ? `${heroSettings.imagePosition.scale * 100}%` : 'cover',
                backgroundPosition: heroSettings.imageUrl 
                  ? `${heroSettings.imagePosition.x}% ${heroSettings.imagePosition.y}%` 
                  : 'center',
                backgroundRepeat: 'no-repeat',
                color: 'white',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                borderRadius: '10px',
                marginTop: '10px',
                padding: '20px',
                overflow: 'hidden'
              }}>
                <div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                    {heroSettings.title}
                  </h2>
                  <p style={{ fontSize: '1.2rem', marginBottom: '2rem', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                    {heroSettings.subtitle}
                  </p>
                  <button style={{
                    backgroundColor: '#2c5aa0',
                    color: 'white',
                    border: 'none',
                    padding: '15px 30px',
                    fontSize: '1.2rem',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    transition: 'all 0.3s'
                  }}>
                    Learn More
                  </button>
                </div>
              </div>
              {heroSettings.imageUrl && (
                <div style={{ 
                  marginTop: '10px', 
                  fontSize: '14px', 
                  color: '#666',
                  textAlign: 'center',
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  borderRadius: '5px'
                }}>
                  📍 Current position: {heroSettings.imagePosition.x}% horizontal • {heroSettings.imagePosition.y}% vertical • 
                  🔍 Zoom: {(heroSettings.imagePosition.scale * 100).toFixed(0)}%
                </div>
              )}
            </div>
          </div>
        ) : activeTab === 'news' ? (
          <div className="news-management">
            <div className="section-header">
              <h2>News Management</h2>
              <button className="add-button" onClick={addNews}>+ Add News</button>
            </div>
            
            <div className="items-list">
              {news.map(item => (
                <div key={item.id} className="editable-item">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem('news', item.id, 'title', e.target.value)}
                    className="edit-input"
                    placeholder="News Title"
                  />
                  <textarea
                    value={item.content}
                    onChange={(e) => updateItem('news', item.id, 'content', e.target.value)}
                    className="edit-textarea"
                    placeholder="News Content"
                  />
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateItem('news', item.id, 'date', e.target.value)}
                    className="edit-input"
                    placeholder="Date"
                  />
                  
                  <div className="image-upload-section">
                    <label>News Image</label>
                    <ImageUploader
                      onImageUpload={(imageUrl: string) => handleImageUpload('news', item.id, imageUrl)}
                      existingImage={item.imageUrl}
                    />
                  </div>
                  
                  <button 
                    className="delete-button"
                    onClick={() => deleteNews(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : activeTab === 'events' ? (
          <div className="events-management">
            <div className="section-header">
              <h2>Events Management</h2>
              <button className="add-button" onClick={addEvent}>+ Add Event</button>
            </div>
            
            <div className="items-list">
              {events.map(item => (
                <div key={item.id} className="editable-item">
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => updateItem('events', item.id, 'title', e.target.value)}
                    className="edit-input"
                    placeholder="Event Title"
                  />
                  <textarea
                    value={item.description}
                    onChange={(e) => updateItem('events', item.id, 'description', e.target.value)}
                    className="edit-textarea"
                    placeholder="Event Description"
                  />
                  <input
                    type="text"
                    value={item.date}
                    onChange={(e) => updateItem('events', item.id, 'date', e.target.value)}
                    className="edit-input"
                    placeholder="Date"
                  />
                  <input
                    type="text"
                    value={item.location}
                    onChange={(e) => updateItem('events', item.id, 'location', e.target.value)}
                    className="edit-input"
                    placeholder="Location"
                  />
                  
                  <div className="image-upload-section">
                    <label>Event Image</label>
                    <ImageUploader
                      onImageUpload={(imageUrl: string) => handleImageUpload('events', item.id, imageUrl)}
                      existingImage={item.imageUrl}
                    />
                  </div>
                  
                  <button 
                    className="delete-button"
                    onClick={() => deleteEvent(item.id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="about-management">
            <div className="section-header">
              <h2>About Us Management</h2>
            </div>

            {/* About Us Hero Section */}
            <div className="editable-item">
              <h3>About Us Hero Section</h3>
              <input
                type="text"
                value={aboutHero.title}
                onChange={(e) => setAboutHero({ ...aboutHero, title: e.target.value })}
                className="edit-input"
                placeholder="About Us Title"
              />
              
              <input
                type="text"
                value={aboutHero.subtitle}
                onChange={(e) => setAboutHero({ ...aboutHero, subtitle: e.target.value })}
                className="edit-input"
                placeholder="About Us Subtitle"
              />
              
              <div className="image-upload-section">
                <label>Hero Background Image</label>
                <ImageUploader
                  onImageUpload={(imageUrl: string) => handleImageUpload('aboutHero', undefined, imageUrl)}
                  existingImage={aboutHero.imageUrl}
                />
                {aboutHero.imageUrl && (
                  <div style={{ marginTop: '15px' }}>
                    <div className="preview-container">
                      <img 
                        src={aboutHero.imageUrl} 
                        alt="About Hero Preview" 
                        className="hero-preview"
                        style={{
                          objectPosition: `${aboutHero.imagePosition.x}% ${aboutHero.imagePosition.y}%`,
                          objectFit: 'cover',
                          transform: `scale(${aboutHero.imagePosition.scale})`
                        }}
                      />
                    </div>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                      <button 
                        className="delete-button"
                        onClick={() => setAboutHero({ ...aboutHero, imageUrl: '' })}
                      >
                        Remove Image
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* About Sections */}
            <div className="section-header" style={{ marginTop: '40px' }}>
              <h3>About Sections</h3>
              <button className="add-button" onClick={addAboutSection}>+ Add Section</button>
            </div>
            
            <div className="items-list">
              {aboutSections.map(section => (
                <div key={section.id} className="editable-item">
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateAboutSection(section.id, 'title', e.target.value)}
                    className="edit-input"
                    placeholder="Section Title"
                  />
                  <textarea
                    value={section.content}
                    onChange={(e) => updateAboutSection(section.id, 'content', e.target.value)}
                    className="edit-textarea"
                    placeholder="Section Content"
                  />
                  
                  <div className="image-upload-section">
                    <label>Section Image</label>
                    <ImageUploader
                      onImageUpload={(imageUrl: string) => handleImageUpload('aboutSection', section.id, imageUrl)}
                      existingImage={section.imageUrl}
                    />
                  </div>
                  
                  <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <input
                        type="checkbox"
                        checked={section.reverseLayout || false}
                        onChange={(e) => updateAboutSection(section.id, 'reverseLayout', e.target.checked)}
                      />
                      Reverse Layout (Image on Right)
                    </label>
                  </div>
                  
                  <button 
                    className="delete-button"
                    onClick={() => deleteAboutSection(section.id)}
                    style={{ marginTop: '15px' }}
                  >
                    Delete Section
                  </button>
                </div>
              ))}
            </div>

            {/* Team Members */}
            <div className="section-header" style={{ marginTop: '40px' }}>
              <h3>Team Members</h3>
              <button className="add-button" onClick={addTeamMember}>+ Add Team Member</button>
            </div>
            
            <div className="items-list">
              {teamMembers.map(member => (
                <div key={member.id} className="editable-item">
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                        className="edit-input"
                        placeholder="Team Member Name"
                      />
                      <input
                        type="text"
                        value={member.position}
                        onChange={(e) => updateTeamMember(member.id, 'position', e.target.value)}
                        className="edit-input"
                        placeholder="Position"
                      />
                      <textarea
                        value={member.bio}
                        onChange={(e) => updateTeamMember(member.id, 'bio', e.target.value)}
                        className="edit-textarea"
                        placeholder="Bio"
                        style={{ minHeight: '80px' }}
                      />
                    </div>
                    <div style={{ width: '150px' }}>
                      <div className="image-upload-section">
                        <label>Profile Photo</label>
                        <ImageUploader
                          onImageUpload={(imageUrl: string) => handleImageUpload('teamMember', member.id, imageUrl)}
                          existingImage={member.imageUrl}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className="delete-button"
                    onClick={() => deleteTeamMember(member.id)}
                    style={{ marginTop: '15px' }}
                  >
                    Delete Team Member
                  </button>
                </div>
              ))}
            </div>

            {/* Values */}
            <div className="section-header" style={{ marginTop: '40px' }}>
              <h3>Core Values</h3>
              <button className="add-button" onClick={addValue}>+ Add Value</button>
            </div>
            
            <div className="items-list">
              {values.map(value => (
                <div key={value.id} className="editable-item">
                  <input
                    type="text"
                    value={value.title}
                    onChange={(e) => updateValue(value.id, 'title', e.target.value)}
                    className="edit-input"
                    placeholder="Value Title"
                  />
                  <textarea
                    value={value.description}
                    onChange={(e) => updateValue(value.id, 'description', e.target.value)}
                    className="edit-textarea"
                    placeholder="Value Description"
                    style={{ minHeight: '80px' }}
                  />
                  <input
                    type="text"
                    value={value.icon}
                    onChange={(e) => updateValue(value.id, 'icon', e.target.value)}
                    className="edit-input"
                    placeholder="Emoji / Icon (Optional)"
                  />
                  
                  <button 
                    className="delete-button"
                    onClick={() => deleteValue(value.id)}
                    style={{ marginTop: '15px' }}
                  >
                    Delete Value
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;