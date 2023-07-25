import React from 'react';
import { Input } from 'antd'
import { AlignCenterOutlined, FileSearchOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function TuLoai() {
  return (
    <>
      <div>
        <h1>Từ loại <FileSearchOutlined /></h1>
      </div>
      <div>
        <Search placeholder="input search text" allowClear />
      </div>
    </>
  );
}