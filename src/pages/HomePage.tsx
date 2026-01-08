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

const HomePage: React.FC = () => {
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

  useEffect(() => {
    const savedNews = localStorage.getItem('schoolNews');
    const savedEvents = localStorage.getItem('schoolEvents');
    const savedHero = localStorage.getItem('schoolHero');
    
    if (savedNews) setNews(JSON.parse(savedNews));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedHero) {
      const saved = JSON.parse(savedHero);
      if (!saved.imagePosition) {
        saved.imagePosition = { x: 50, y: 50, scale: 1.0 };
      }
      setHeroSettings(saved);
    }
  }, []);

  const getHeroBackground = () => {
    if (heroSettings.imageUrl) {
      return {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroSettings.imageUrl})`,
        backgroundSize: `${heroSettings.imagePosition.scale * 100}%`,
        backgroundPosition: `${heroSettings.imagePosition.x}% ${heroSettings.imagePosition.y}%`,
        backgroundRepeat: 'no-repeat'
      };
    } else {
      return {
        background: 'linear-gradient(135deg, #2e8b57 0%, #2e8b57 100%)'
      };
    }
  };

  return (
    <div className="homepage-container">
      <section 
        className="hero-section"
        style={getHeroBackground()}
      >
        <div className="hero-content">
          <h1>{heroSettings.title}</h1>
          <p>{heroSettings.subtitle}</p>
          <Link to="/about">
            <button className="cta-button">Learn More</button>
          </Link>
        </div>
      </section>
      
      <section className="news-section">
        <h2>Latest News & Announcements</h2>
        {news.length === 0 ? (
          <div className="no-content-message">
            <p>No news available. Check back later!</p>
          </div>
        ) : (
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
        )}
      </section>
      
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <div className="no-content-message">
            <p>No events scheduled. Check back soon!</p>
          </div>
        ) : (
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
        )}
      </section>
    </div>
  );
};

export default HomePage;