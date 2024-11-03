import React, { useState } from 'react';
import { Row, Col, Input, Button, Card, Select } from 'antd';
import { EnvironmentOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';

const { Option } = Select;

const Listings = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Sample data simulating apartment listings
  const listingsData = [
    {
      id: 1,
      name: 'Sunny Apartments',
      location: 'New York, NY',
      type: 'two bedroom',
      rent: '$2500/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 2,
      name: 'Lake View Residences',
      location: 'Chicago, IL',
      type: 'three bedroom',
      rent: '$3200/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 3,
      name: 'Downtown Condo',
      location: 'San Francisco, CA',
      type: 'one bedroom',
      rent: '$2800/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 4,
      name: 'Riverside Flats',
      location: 'Miami, FL',
      type: 'two bedroom',
      rent: '$2700/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 5,
      name: 'Urban Studio',
      location: 'Los Angeles, CA',
      type: 'single room',
      rent: '$1500/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
  ];

  // Filter listings based on search term and selected type
  const filteredListings = listingsData.filter(listing => {
    const matchesSearchTerm = listing.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || listing.type === selectedType;
    return matchesSearchTerm && matchesType;
  });

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Listings</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Search Bar */}
          <Input.Search
            placeholder="Search listings..."
            style={{ width: '300px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Dropdown for apartment types */}
          <Select
            defaultValue="all"
            style={{ width: 150 }}
            onChange={(value) => setSelectedType(value)}
          >
            <Option value="all">All</Option>
            <Option value="single room">Single Room</Option>
            <Option value="bedsitter">Bedsitter</Option>
            <Option value="one bedroom">One Bedroom</Option>
            <Option value="two bedroom">Two Bedroom</Option>
            <Option value="three bedroom">Three Bedroom</Option>
            <Option value="four bedroom">Four Bedroom</Option>
          </Select>
        </div>
      </div>

      {/* Apartment Listings */}
      <Row gutter={[16, 16]}>
        {filteredListings.map((listing) => (
          <Col xs={24} sm={12} md={8} key={listing.id}>
            <Card
              title={listing.name}
              cover={<img alt={listing.name} src={listing.image} />}
              actions={[
                <Button type="link" onClick={() => alert('Remove listing')}>Remove</Button>,
                <Button type="default" onClick={() => alert('Edit listing')}>Edit</Button>,
                <Button type="primary" onClick={() => alert('View listing')}>View</Button>
              ]}
            >
              <p><EnvironmentOutlined /> {listing.location}</p>
              <p><HomeOutlined /> {listing.type}</p>
              <p><DollarOutlined /> {listing.rent}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Listings;
