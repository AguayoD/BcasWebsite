import React, { useEffect, useState } from 'react';
import './AboutUs.css';

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

interface ValueItem {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const AboutUs: React.FC = () => {
  const [heroSettings, setHeroSettings] = useState<HeroSettings>({
    imageUrl: '',
    title: 'About Us',
    subtitle: '',
    imagePosition: {
      x: 50,
      y: 50,
      scale: 1.0
    }
  });

  const [aboutSections, setAboutSections] = useState<AboutSection[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [values, setValues] = useState<ValueItem[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedAboutHero = localStorage.getItem('schoolAboutHero');
    const savedAboutSections = localStorage.getItem('schoolAboutSections');
    const savedTeamMembers = localStorage.getItem('schoolTeamMembers');
    const savedValues = localStorage.getItem('schoolAboutValues');
    
    if (savedAboutHero) {
      const saved = JSON.parse(savedAboutHero);
      if (!saved.imagePosition) {
        saved.imagePosition = { x: 50, y: 50, scale: 1.0 };
      }
      setHeroSettings(saved);
    }

    if (savedAboutSections) {
      setAboutSections(JSON.parse(savedAboutSections));
    }

    if (savedTeamMembers) {
      setTeamMembers(JSON.parse(savedTeamMembers));
    }

    if (savedValues) {
      setValues(JSON.parse(savedValues));
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
    <div className="aboutus-container">
      <section 
        className="hero-section"
        style={getHeroBackground()}
      >
        <div className="hero-content">
          <h1>{heroSettings.title}</h1>
          {heroSettings.subtitle && <p>{heroSettings.subtitle}</p>}
        </div>
      </section>
      
      <section className="content-section">
        <h2>Our Story</h2>
        {aboutSections.length === 0 ? (
          <div className="no-content-message">
            <p>Content will appear here once added through the admin dashboard.</p>
          </div>
        ) : (
          <div className="about-sections-container">
            {aboutSections.map((section) => (
              <div 
                key={section.id} 
                className={`about-section-item ${section.reverseLayout ? 'reverse-layout' : ''}`}
              >
                <div className="section-content">
                  <div className="section-image">
                    {section.imageUrl ? (
                      <img 
                        src={section.imageUrl} 
                        alt={section.title}
                        style={{
                          objectPosition: section.imagePosition 
                            ? `${section.imagePosition.x}% ${section.imagePosition.y}%`
                            : 'center',
                          objectFit: 'cover',
                          transform: section.imagePosition 
                            ? `scale(${section.imagePosition.scale})`
                            : 'scale(1)'
                        }}
                      />
                    ) : (
                      <div className="no-image-placeholder">
                        Image placeholder
                      </div>
                    )}
                  </div>
                  <div className="section-text">
                    <h3>{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="content-section">
        <h2>Our Team</h2>
        {teamMembers.length === 0 ? (
          <div className="no-content-message">
            <p>Team information will appear here once added through the admin dashboard.</p>
          </div>
        ) : (
          <div className="team-grid">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member">
                <div className="member-image">
                  {member.imageUrl ? (
                    <img src={member.imageUrl} alt={member.name} />
                  ) : (
                    <div className="no-image-placeholder">
                      Team member photo
                    </div>
                  )}
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <div className="member-position">{member.position}</div>
                  <p>{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="content-section">
        <h2>Our Values</h2>
        {values.length === 0 ? (
          <div className="no-content-message">
            <p>Our core values will appear here once added through the admin dashboard.</p>
          </div>
        ) : (
          <div className="values-section">
            <div className="values-grid">
              {values.map((value) => (
                <div key={value.id} className="value-item">
                  <div className="value-icon">{value.icon}</div>
                  <h4>{value.title}</h4>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default AboutUs;