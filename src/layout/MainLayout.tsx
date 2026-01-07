// MainLayout.tsx
import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { 
  HomeOutlined, 
  HistoryOutlined,
  UserOutlined,
  LoginOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './MainLayout.css';

const { Header, Content } = Layout;

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is admin
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  // Convert current path to menu key
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/about') return 'about';
    if (path === '/admissions') return 'admissions';
    if (path === '/history') return 'history';
    return '';
  };

  const handleMenuClick = (key: string) => {
    switch (key) {
      case 'home':
        navigate('/');
        break;
      case 'about':
        navigate('/about');
        break;
      case 'admissions':
        navigate('/admissions');
        break;
      case 'history':
        navigate('/history');
        break;
      case 'careers':
        // Add navigation for other menu items
        navigate('/careers');
        break;
      case 'opportunities':
        navigate('/opportunities');
        break;
      default:
        break;
    }
  };

  const handleAdminClick = () => {
    if (isAdmin) {
      navigate('/admin/dashboard');
    } else {
      navigate('/admin/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
    window.location.reload(); // Refresh to update UI because it's still local/ will update to dyanmic once code is fully finished with design
  };

  return (
    <Layout className="main-layout">
      <Header className="main-header">
        <div className="nav-container">
          <div className="logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
            <span style={{ color: '#FFBC0D', fontWeight: 'bold', fontSize: '20px' }}>BCAS</span>
          </div>
          <Menu 
            mode="horizontal" 
            className="main-menu" 
            selectedKeys={[getSelectedKey()]}
            onClick={({ key }) => handleMenuClick(key)}
            items={[
              {
                key: 'home',
                icon: <HomeOutlined />,
                label: 'Home'
              },
              {
                key: 'about',
                label: 'About Us'
              },
              {
                key: 'admissions',
                label: 'Admissions'
              },
              {
                key: 'history',
                icon: <HistoryOutlined />,
                label: 'History'
              },
              {
                key: 'careers',
                label: 'Careers'
              },
              {
                key: 'opportunities',
                label: 'Opportunities'
              }
            ]}
          />
          <div className="admin-section">
            {isAdmin ? (
              <div className="admin-controls">
                <Button 
                  type="primary" 
                  icon={<UserOutlined />}
                  onClick={() => navigate('/admin/dashboard')}
                  className="admin-btn"
                >
                  Dashboard
                </Button>
                <Button 
                  onClick={handleLogout}
                  className="logout-btn"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                type="default" 
                icon={<LoginOutlined />}
                onClick={handleAdminClick}
                className="login-btn"
              >
                Admin Login
              </Button>
            )}
          </div>
        </div>
      </Header>

      <Content className="main-content">
        <Outlet />
      </Content>
      
      {/* Footer Section */}
      <footer className="main-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>BCAS Batangas College of Arts and Sciences Inc</h3>
            <p>Excellence in Education Since 2000</p>
            <p>Providing quality education for all students</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p> (123) 456-7890</p>
            <p> info@bcas.edu</p>
            <p> 123 School Street, City, Country</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <p onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</p>
            <p onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About Us</p>
            <p onClick={() => navigate('/admissions')} style={{ cursor: 'pointer' }}>Admissions</p>
            <p onClick={() => navigate('/admin/login')} style={{ cursor: 'pointer', color: '#FFBC0D' }}>
              Admin Portal
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} BCAS School. All rights reserved.</p>
        </div>
      </footer>
    </Layout>
  );
};

export default MainLayout;