"use client";

import { Card, Row, Col } from 'antd';

const FeaturedApartments = ({ properties }) => {
  return (
    <div>
      <h1 style={{margin:'auto', textAlign:'center', marginBottom:'20px'}}>Featured Apartments</h1>
      <Row gutter={16}>
        {properties.map(property => (
          <Col span={8} key={property.id}>
            <Card title={property.title} cover={<img alt="example" src={property.imgSrc} />}>
              <p>{property.price}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default FeaturedApartments;
