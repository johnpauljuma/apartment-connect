import React, { useState } from 'react';
import { Row, Col, Input, Button, Card } from 'antd';
import { EnvironmentOutlined, DollarOutlined, HomeOutlined } from '@ant-design/icons';

const FavoritesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data simulating user's favorite apartment listings
  const favoritesData = [
    {
      id: 1,
      name: 'Sunny Apartments',
      location: 'Kasarani',
      type: 'Bedsitter',
      rent: '$2500/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 2,
      name: 'Lake View Residences',
      location: 'Pangani',
      type: '3 Bedroom',
      rent: '$3200/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 3,
      name: 'Downtown Condo',
      location: 'Nairobi',
      type: '1 Bedroom',
      rent: '$2800/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
    {
      id: 4,
      name: 'Riverside Flats',
      location: 'Nairobi',
      type: '2 Bedroom',
      rent: '$2700/month',
      image: 'https://via.placeholder.com/300', // Placeholder image
    },
  ];

  // Filter listings based on search term
  const filteredFavorites = favoritesData.filter(listing =>
    listing.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Favorites</h2>
        <Input.Search
          placeholder="Search saved listings..."
          style={{ width: '300px' }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Apartment Listings */}
      <Row gutter={[16, 16]}>
        {filteredFavorites.map((listing) => (
          <Col xs={24} sm={12} md={8} key={listing.id}>
            <Card
              title={listing.name}
              cover={<img alt={listing.name} src={listing.image} />}
              actions={[
                <Button type="link" onClick={() => alert('Remove from favorites')}>Remove from Favorites</Button>,
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

export default FavoritesPage;
