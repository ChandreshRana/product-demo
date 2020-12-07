import { DeleteRowOutlined, HomeOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { MODULES, ROUTES } from '../../../common/constants';

const { Sider } = Layout;

function Sidebar({ location: { pathname }, history }) {
  const [collapsed, setCollapsed] = useState(false);
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const onMenuSelect = (e) => {
    history.push(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="gx-layout-sider-header">
        <div className="gx-linebar">
          <div className="gx-icon-btn icon" onClick={toggle}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
        <Link to="/" className="gx-site-logo">
          {/* <img src={logo} alt="Put your logo here" /> */}
        </Link>
      </div>
      <div className="gx-sidebar-content">
        <Menu
          theme="lite"
          mode="inline"
          selectedKeys={[`/${pathname.split('/')[1]}`]}
          defaultSelectedKeys={[ROUTES.HOME]}
          onSelect={onMenuSelect}
        >
          <Menu.Item
            key={ROUTES.HOME}
            className="d-flex align-items-center"
          >
            <HomeOutlined />
            <span>{MODULES.HOME}</span>
          </Menu.Item>
          <Menu.Item
            key={ROUTES.TRASH}
            className="d-flex align-items-center"
          >
            <DeleteRowOutlined />
            <span>{MODULES.TRASH}</span>
          </Menu.Item>
        </Menu>
      </div>
    </Sider>
  );
}

export default withRouter(Sidebar);
