"use client";
import { Card, Col, Row, Statistic, Table, Input, Button, Dropdown, Menu, Space, Divider, theme } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts"; // Import necessary components for BarChart
import { PieChart, Pie, Cell } from "recharts"; // Import necessary components for PieChart
import {
  HomeOutlined,
  AppstoreAddOutlined,
  CheckCircleOutlined,
  ApartmentOutlined,
  MoreOutlined,
  
} from "@ant-design/icons";
import { useState } from "react";

// Dummy data for the table
const apartmentData = [
  {
    key: 1,
    apartmentId: "A-001",
    name: "Apartment 1",
    location: "Downtown",
    type: "One Bedroom",
    occupiedRooms: 5,
    bookedRooms: 3,
    availableRooms: 2,
    rent: "$1000",
    dateListed: "2024-01-05",
  },
  {
    key: 1,
    apartmentId: "A-001",
    name: "Apartment 1",
    location: "Downtown",
    type: "One Bedroom",
    occupiedRooms: 5,
    bookedRooms: 3,
    availableRooms: 2,
    rent: "$1000",
    dateListed: "2024-01-05",
  },
  {
    key: 1,
    apartmentId: "A-001",
    name: "Apartment 1",
    location: "Downtown",
    type: "One Bedroom",
    occupiedRooms: 5,
    bookedRooms: 3,
    availableRooms: 2,
    rent: "$1000",
    dateListed: "2024-01-05",
  },
  // Add more apartments data here
];

// Bar chart data
const barData = [
  { type: "Single Room", inUse: 10, booked: 5, available: 8 },
  { type: "Bedsitter", inUse: 20, booked: 15, available: 12 },
  { type: "One Bedroom", inUse: 15, booked: 10, available: 5 },
  { type: "Two Bedroom", inUse: 8, booked: 3, available: 2 },
  { type: "Three Bedroom", inUse: 5, booked: 2, available: 1 },
];

// Pie chart data
const pieData = [
  { name: "Single Room", value: 30 },
  { name: "Bedsitter", value: 47 },
  { name: "One Bedroom", value: 45 },
  { name: "Two Bedroom", value: 20 },
  { name: "Three Bedroom", value: 8 },
];

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");

  const handleMenuClick = (e) => {
    console.log("Menu item clicked", e.key);
  };

  const columns = [
    { title: "Apartment ID", dataIndex: "apartmentId", key: "apartmentId" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Occupied Rooms", dataIndex: "occupiedRooms", key: "occupiedRooms" },
    { title: "Booked Rooms", dataIndex: "bookedRooms", key: "bookedRooms" },
    { title: "Available Rooms", dataIndex: "availableRooms", key: "availableRooms" },
    { title: "Rent", dataIndex: "rent", key: "rent" },
    { title: "Date Listed", dataIndex: "dateListed", key: "dateListed" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          overlay={
            <Menu onClick={handleMenuClick}>
              <Menu.Item key="view">View</Menu.Item>
              <Menu.Item key="edit">Edit</Menu.Item>
              <Menu.Item key="delete">Delete</Menu.Item>
            </Menu>
          }
        >
          <Button icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Cards Section */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Occupied Rooms"
              value={50}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: "#3f8600", fontSize: "24px" }}
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: 10, right: 10, fontSize: "16px", color: "#3f8600" }}>50%</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Rooms Booked"
              value={35}
              prefix={<AppstoreAddOutlined />}
              valueStyle={{ color: "#1890ff", fontSize: "24px" }}
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: 10, right: 10, fontSize: "16px", color: "#1890ff" }}>35%</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Available Rooms"
              value={15}
              prefix={<HomeOutlined />}
              valueStyle={{ color: "#ff4d4f", fontSize: "24px" }}
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: 10, right: 10, fontSize: "16px", color: "#ff4d4f" }}>15%</div>
          </Card>
        </Col>
        <Col span={6}>
          <Card bordered>
            <Statistic
              title="Total Rooms"
              value={100}
              prefix={<ApartmentOutlined />}
              valueStyle={{ color: "#faad14", fontSize: "24px" }}
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: 10, right: 10, fontSize: "16px", color: "#faad14" }}>100%</div>
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Row gutter={16} style={{ marginBottom: "20px" }}>
        <Col span={18}>
          <Card bordered title={<div style={{ padding: "10px", color: "#000" }}>Apartment Rooms</div>}>
            <BarChart width={800} height={300} data={barData}>
              <XAxis dataKey="type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="inUse" fill="#8884d8" />
              <Bar dataKey="booked" fill="#82ca9d" />
              <Bar dataKey="available" fill="#ffc658" />
            </BarChart>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            bordered
            title={
              <div style={{ padding: "10px", color: "#000" }}>
                My Apartments
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <PieChart width={250} height={300} margin={{ top: 0, bottom: 10 }}>
                <Pie
                  data={pieData}
                  cx={125}
                  cy={110} // Adjusted the vertical center position
                  labelLine={false}
                  outerRadius={80}
                  fill="#002379"
                  dataKey="value" // Adding the dataKey for the PieChart
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#0088FE' : '#00C49F'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend
                  layout="vertical"
                  verticalAlign="bottom"
                  wrapperStyle={{
                    paddingLeft: 10,
                    paddingTop: 5,
                    paddingBottom: 0,
                    height: 100,
                    
                  }}
                  itemStyle={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: "5px 0",
                  }}
                />
              </PieChart>
              
            </div>
          </Card>
        </Col>

      </Row>

      {/* Table Section */}
      <Card bordered style={{ marginTop: "20px" }}
        title={
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px", padding: "10px", marginTop:'10px'}}>
          <h3 style={{ margin: 0 }}>Apartment Details</h3>
          <Space>
            <Input.Search
              placeholder="Search apartments"
              onChange={(e) => setSearchText(e.target.value)}
              style={{}}
            />
            <Button type="primary">Add New</Button>
          </Space>
        </div>
        }>
        
        
        <Table columns={columns} dataSource={apartmentData} />
      </Card>
    </div>
  );
};

export default Dashboard;
