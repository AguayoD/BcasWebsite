import React from 'react';
import { Card, Typography, List, Alert, Tag } from 'antd';
import { CheckCircleOutlined, FileTextOutlined, UserOutlined, IdcardOutlined, BookOutlined, MailOutlined } from '@ant-design/icons';
import './AdmissionRequirements.css';

const { Title, Paragraph, Text } = Typography;

const AdmissionRequirements: React.FC = () => {
  const generalRequirements = [
    { 
      icon: <FileTextOutlined />, 
      title: 'Fully Accomplished Application Form', 
      description: 'Completely filled-out BCAS application form (available online or at the Registrar\'s Office)',
      important: true
    },
    { 
      icon: <BookOutlined />, 
      title: 'Form 137/High School Report Card', 
      description: 'Original copy of Form 137 (Report Card) for senior high school graduates',
      important: true
    },
    { 
      icon: <IdcardOutlined />, 
      title: 'PSA Birth Certificate', 
      description: 'Original and photocopy of authenticated birth certificate',
      important: true
    },
    { 
      icon: <UserOutlined />, 
      title: '2x2 ID Pictures', 
      description: 'Four (4) identical recent 2x2 colored photos with white background and name tag',
      important: true
    },
  ];

  return (
    <div className="admissions-requirements-page">
      <div className="requirements-header">
        <Title level={1} className="page-title"> Requirements</Title>
        <Paragraph className="page-subtitle">
          Batangas College of Arts and Sciences Inc. welcomes applicants. Below are the general admission requirements for all programs.
        </Paragraph>
      </div>

      <Card className="requirements-card">
        <div className="section-header">
          <Title level={2} className="section-title">
            <CheckCircleOutlined className="section-icon" />
            General Requirements
          </Title>
        </div>

        <div className="requirements-grid">
          {generalRequirements.map((item, index) => (
            <div key={index} className={`requirement-item ${item.important ? 'important-requirement' : ''}`}>
              <div className="requirement-icon">{item.icon}</div>
              <div className="requirement-content">
                <div className="requirement-title-container">
                  <Title level={4} className="requirement-title">{item.title}</Title>
                  {item.important && <Tag color="red" className="important-tag">REQUIRED</Tag>}
                </div>
                <Text className="requirement-description">{item.description}</Text>
              </div>
            </div>
          ))}
        </div>

        <div className="submission-guidelines">
          <Title level={3} className="guidelines-title">
            <MailOutlined className="guidelines-icon" />
            Submission Guidelines
          </Title>
          <List
            className="guidelines-list"
            dataSource={[
              'Submit complete documents to the Registrar\'s Office during office hours (8:00 AM - 5:00 PM, Monday to Friday)',
              'Original documents will be verified and returned immediately',
              'Keep photocopies of all submitted documents for your reference',
            ]}
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                  <CheckCircleOutlined style={{ color: '#117405', marginRight: '12px', marginTop: '2px', flexShrink: 0 }} />
                  <Text style={{ lineHeight: '1.5' }}>{item}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>

        <Alert
          message="DepEd and CHED Compliance"
          description="BCAS complies with all Department of Education (DepEd) and Commission on Higher Education (CHED) regulations."
          type="success"
          showIcon
          className="compliance-alert"
        />
      </Card>
    </div>
  );
};

export default AdmissionRequirements;