import React from 'react';
import { Card, Typography, List, Alert, Tag, Row, Col, Button } from 'antd';
import { 
  DollarOutlined, 
  TrophyOutlined, 
  ReadOutlined, 
  TeamOutlined, 
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileTextOutlined,
  StarOutlined,
  HeartOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import './AdmissionScholarship.css';

const { Title, Paragraph, Text } = Typography;

const AdmissionScholarship: React.FC = () => {
  const scholarshipTypes = [
    { 
      icon: <TrophyOutlined />, 
      title: 'Academic Excellence Scholarship', 
      description: 'Full or partial tuition fee waiver for students with outstanding academic performance',
      coverage: 'Full/Partial Tuition',
      eligibility: 'With honors, 95+ average',
      deadline: 'June 15, 2024',
      status: 'open',
      important: true
    },
    { 
      icon: <DollarOutlined />, 
      title: 'Financial Aid Grant', 
      description: 'Need-based scholarship for financially challenged but academically capable students',
      coverage: 'Up to 75% Tuition',
      eligibility: 'Financial need, 85+ average',
      deadline: 'Rolling',
      status: 'open',
      important: true
    },
    { 
      icon: <TeamOutlined />, 
      title: 'Leadership Scholarship', 
      description: 'For students with proven leadership skills and community involvement',
      coverage: '50% Tuition + Allowance',
      eligibility: 'Leadership experience',
      deadline: 'July 30, 2024',
      status: 'open',
      important: false
    },
    { 
      icon: <ReadOutlined />, 
      title: 'Athletic Scholarship', 
      description: 'For exceptional athletes representing BCAS in regional/national competitions',
      coverage: 'Full Tuition + Training',
      eligibility: 'Sports achievements',
      deadline: 'May 31, 2024',
      status: 'open',
      important: false
    },
    { 
      icon: <HeartOutlined />, 
      title: 'Community Service Scholarship', 
      description: 'For students with significant volunteer work and community service',
      coverage: '25-50% Tuition',
      eligibility: '100+ service hours',
      deadline: 'August 15, 2024',
      status: 'open',
      important: false
    },
    { 
      icon: <GlobalOutlined />, 
      title: 'International Student Grant', 
      description: 'Special scholarship for international students pursuing arts and sciences',
      coverage: 'Variable',
      eligibility: 'International student status',
      deadline: 'Varies',
      status: 'open',
      important: false
    },
  ];

  const requirements = [
    'Completed scholarship application form',
    'Official transcript of records',
    'Certificate of good moral character',
    'Proof of financial status (for need-based scholarships)',
    'Recommendation letters (2 required)',
    'Essay or personal statement',
    'Valid ID and 2x2 photo',
  ];

  const deadlines = [
    { scholarship: 'Academic Excellence', date: 'June 15, 2024' },
    { scholarship: 'Financial Aid', date: 'Rolling Application' },
    { scholarship: 'Athletic', date: 'May 31, 2024' },
    { scholarship: 'Leadership', date: 'July 30, 2024' },
    { scholarship: 'Community Service', date: 'August 15, 2024' },
  ];

  return (
    <div className="scholarships-container">
      <div className="scholarships-hero">
        <Title level={1} className="scholarship-page-title">Scholarships & Financial Aid</Title>
        <Paragraph className="scholarship-page-subtitle">
          Batangas College of Arts and Sciences Inc. offers various scholarship opportunities 
          to support talented and deserving students in achieving their educational goals.
        </Paragraph>
      </div>

      <Card className="scholarships-main-card">
        {/* Available Scholarships Section */}
        <div className="scholarships-section-header">
          <Title level={2} className="scholarships-section-title">
            <StarOutlined className="scholarship-section-icon" />
            Available Scholarships
          </Title>
          <Paragraph className="scholarships-section-description">
            Explore our range of scholarship programs designed to recognize excellence and support diversity
          </Paragraph>
        </div>

        <Row gutter={[24, 24]} className="scholarships-listing">
          {scholarshipTypes.map((scholarship, index) => (
            <Col xs={24} md={12} lg={8} key={index}>
              <div className={`scholarship-card-item ${scholarship.important ? 'featured-scholarship' : ''}`}>
                <div className="scholarship-icon-wrapper">
                  <div className="scholarship-type-icon">{scholarship.icon}</div>
                  {scholarship.important && (
                    <Tag color="gold" className="scholarship-featured-tag">
                      FEATURED
                    </Tag>
                  )}
                  <Tag 
                    color={scholarship.status === 'open' ? 'green' : 'red'} 
                    className="scholarship-status-tag"
                  >
                    {scholarship.status.toUpperCase()}
                  </Tag>
                </div>
                
                <div className="scholarship-card-content">
                  <Title level={4} className="scholarship-card-title">{scholarship.title}</Title>
                  <Paragraph className="scholarship-card-description">{scholarship.description}</Paragraph>
                  
                  <div className="scholarship-details-info">
                    <div className="scholarship-detail">
                      <Text strong>Coverage:</Text>
                      <Tag color="blue" className="scholarship-coverage-tag">{scholarship.coverage}</Tag>
                    </div>
                    <div className="scholarship-detail">
                      <Text strong>Eligibility:</Text>
                      <Text type="secondary">{scholarship.eligibility}</Text>
                    </div>
                    <div className="scholarship-detail">
                      <Text strong>Deadline:</Text>
                      <div className="scholarship-deadline">
                        <ClockCircleOutlined style={{ marginRight: 6, color: '#ff4d4f' }} />
                        <Text type="danger">{scholarship.deadline}</Text>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="primary" 
                    className="scholarship-apply-button"
                    onClick={() => window.open('/admissions/apply', '_blank')}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Requirements Section */}
        <div className="scholarship-requirements">
          <Title level={3} className="scholarship-requirements-title">
            <FileTextOutlined className="scholarship-requirements-icon" />
            General Application Requirements
          </Title>
          <List
            className="scholarship-requirements-list"
            dataSource={requirements}
            renderItem={(item) => (
              <List.Item>
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '12px', flexShrink: 0 }} />
                  <Text style={{ lineHeight: '1.5' }}>{item}</Text>
                </div>
              </List.Item>
            )}
          />
        </div>

        {/* Application Timeline */}
        <div className="scholarship-timeline">
          <Title level={3} className="scholarship-timeline-title">
            <ClockCircleOutlined className="scholarship-timeline-icon" />
            Application Timeline & Deadlines
          </Title>
          <Row gutter={[16, 16]}>
            {deadlines.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={index}>
                <Card className="scholarship-deadline-card">
                  <div className="scholarship-deadline-content">
                    <Text strong className="scholarship-deadline-name">{item.scholarship}</Text>
                    <div className="scholarship-deadline-date">
                      <ClockCircleOutlined style={{ marginRight: 8 }} />
                      <Text>{item.date}</Text>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Important Information */}
        <Alert
          message="Important Information"
          description={
            <div>
              <Paragraph style={{ marginBottom: 8 }}>
                <strong>Renewal Requirements:</strong> Most scholarships require maintaining a specific GPA 
                and participating in college activities for renewal.
              </Paragraph>
              <Paragraph style={{ marginBottom: 8 }}>
                <strong>Multiple Applications:</strong> Students may apply for multiple scholarships but can 
                only accept one major scholarship award.
              </Paragraph>
              <Paragraph>
                <strong>Notification:</strong> Applicants will be notified via email within 4-6 weeks 
                after the application deadline.
              </Paragraph>
            </div>
          }
          type="info"
          showIcon
          className="scholarship-info-alert"
        />

        {/* Contact Information */}
        <div className="scholarship-contact">
          <Title level={4} className="scholarship-contact-title">
            Need More Information?
          </Title>
          <Paragraph>
            Contact our Scholarship Office:
            <br />
            <Text strong>Email:</Text> scholarships@bcas.edu.ph
            <br />
            <Text strong>Phone:</Text> (043) 123-4567 ext. 123
            <br />
            <Text strong>Office Hours:</Text> Monday-Friday, 8:00 AM - 5:00 PM
          </Paragraph>
          <Button 
            type="primary" 
            size="large"
            className="scholarship-contact-button"
            onClick={() => window.location.href = 'mailto:scholarships@bcas.edu.ph'}
          >
            Email Scholarship Office
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdmissionScholarship;