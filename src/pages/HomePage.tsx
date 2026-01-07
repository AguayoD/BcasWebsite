import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { Link } from 'react-router-dom';

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

const HomePage: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    const savedNews = localStorage.getItem('schoolNews');
    const savedEvents = localStorage.getItem('schoolEvents');
    
    if (savedNews) setNews(JSON.parse(savedNews));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
  }, []);

  return (
    <div className="homepage-container">

      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Our School</h1>
          <p>Excellence in Education Since 2000</p>
          <Link to="/about">
          <button className="cta-button">Learn More</button>
          </Link>
        </div>
      </section>
      
      {/* NEWS */}
      <section className="news-section">
        <h2>Latest News & Announcements</h2>
        <div className="news-grid">
          {news.map(item => (
            <div key={item.id} className="news-item">
              {item.imageUrl && (
                <div className="news-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              )}
              <h3>{item.title}</h3>
              <div className="news-date">{item.date}</div>
              <p>{item.content}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* EVENT */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          {events.map(item => (
            <div key={item.id} className="event-item">
              {item.imageUrl && (
                <div className="event-image">
                  <img src={item.imageUrl} alt={item.title} />
                </div>
              )}
              <h3>{item.title}</h3>
              <div className="event-date">{item.date}</div>
              <p><strong>Location:</strong> {item.location}</p>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;