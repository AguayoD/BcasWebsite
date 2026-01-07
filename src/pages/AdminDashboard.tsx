import React, { useState, useEffect } from 'react';
import ImageUploader from './ImageUploader.tsx';
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

const AdminDashboard: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [activeTab, setActiveTab] = useState('news');

  useEffect(() => {
    const savedNews = localStorage.getItem('schoolNews');
    const savedEvents = localStorage.getItem('schoolEvents');
    
    if (savedNews) setNews(JSON.parse(savedNews));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  useEffect(() => {
    localStorage.setItem('schoolNews', JSON.stringify(news));
    localStorage.setItem('schoolEvents', JSON.stringify(events));
  }, [news, events]);

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

  const deleteNews = (id: number) => {
    setNews(news.filter(item => item.id !== id));
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(item => item.id !== id));
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

  const handleImageUpload = (type: 'news' | 'events', id: number, imageUrl: string) => {
    if (type === 'news') {
      setNews(news.map(item => 
        item.id === id ? { ...item, imageUrl } : item
      ));
    } else {
      setEvents(events.map(item => 
        item.id === id ? { ...item, imageUrl } : item
      ));
    }
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
      </div>

      <div className="dashboard-content">
        {activeTab === 'news' ? (
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;