"use client";

import { Layout, Menu, Button } from 'antd';
import Link from 'next/link';
import './globals.css';

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => (
  <html>
    <body>

  <Layout className="layout" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header style={{ backgroundColor: '#001529', display: 'flex', alignItems: 'center', padding: '0 50px' }}>
      <div className='headerContainer' style={{ display: 'flex', flex: 1, alignItems: 'center' }}>
        {/* Updated Logo */}
        <div className="logo" style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', letterSpacing: '2px' }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            Apartment <span style={{ color: '#1890ff' }}>Connect</span>
          </Link>
        </div>

        <div className='navbar' style={{ display: 'flex', marginLeft: 'auto' }}>
          <Menu theme="dark" mode="horizontal" style={{ background: 'transparent', lineHeight: '64px', borderBottom: 'none' }}>
            <Menu.Item key="1">
              <Link href="/">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href="/account">My Account</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link href="/contact">Contact Us</Link>
            </Menu.Item>
            <Menu.Item key="4">
            <Link href="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="5">
            <Link href="/signup">Sign Up</Link>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </Header>
    <Content style={{ padding: '0 50px', flex: '1 0 auto' }}>
      <div className="site-layout-content">{children}</div>
    </Content>
    <Footer style={{ textAlign: 'center', flexShrink: 0, backgroundColor:'olive'}}>
      Apartment Connect ©2024 Created by Juma Omondi John Paul
    </Footer>
  </Layout>
    </body>
  </html>
);

export default MyLayout;
