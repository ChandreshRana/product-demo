import { Input, Layout } from 'antd';
import React from 'react';

const { Header } = Layout;

const { Search } = Input

const AppHeader = () => {
  const onSearch = () => {

  }

  return (
    <Header>
      <div className="gx-search-bar gx-d-none gx-d-lg-block gx-lt-icon-search-bar-lg">
        <div className="d-flex align-items-center" />
      </div>
      <div className="header-notification">
        <Search
          placeholder="Search Product"
          allowClear
          onSearch={onSearch}
          style={{ width: 200, margin: '0 10px' }}
        />
      </div>
    </Header>
  );
};
export default AppHeader;
