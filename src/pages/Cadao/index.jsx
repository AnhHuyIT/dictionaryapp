import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Modal, Image, Space, Select } from 'antd'
import { EyeOutlined, FileSearchOutlined, SoundOutlined, StarTwoTone } from '@ant-design/icons';
import { useSpeechSynthesis } from 'react-speech-kit';
import {dataCadao} from '../../data/cadao'

const { Search } = Input;
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};


export default function Cadao() {
  const [form] = Form.useForm();

  const data = dataCadao;

  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});
  const { speak } = useSpeechSynthesis();

  const speechHandler = (text) => {
    speak({
      text: text,
      lang: "vi-VN"
    });
  }

  // const filterData = () => {
  //   if (filterInput === '') return data

  //   if (isNaN(filterInput)) {
  //     return data.filter(({ tu }) => tu.includes(filterInput))
  //   }
  //   return data.filter(({ nghia }) => nghia === +filterInput)
  // }

  const showModal = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Ca Dao",
      dataIndex: "cadao",
      key: "cadao",
      render: text => {
        const arr = text.split("\n");
        return (
          <>
            {arr.map((item, index) => {
              return <div>{item}</div>;
            })}
          </>
        );
      }
    },
    {
      title: 'Chi tiết',
      dataIndex: "",
      key: "",
      render: (text, record) => {
        return (
          <>
            <Button type='default' shape='circle' onClick={() => showModal(record)} icon={<EyeOutlined />} />
          </>
        );
      }
    }
  ];

  const onFinish = (values) => {
    const filter = data.filter((tu) => {
      let checkCadao = false;
      let checkLoai = false;

      let getLoai = '';
      switch (values?.loai) {
        case '1':
          getLoai = 'Ca dao';
          break;
        case '2':
          getLoai = 'Tục ngữ';
          break;
        default:
          checkLoai = true;
          break;
      }
      if (values?.cadao === undefined || values?.cadao === null || values?.cadao === '') {
        checkCadao = true;
      } else {
        if (tu.cadao.includes(values?.cadao)) {
          checkCadao = true;
        }
      }
      if (getLoai === tu.loai) {
        checkLoai = true;
      }

      if (checkCadao && checkLoai) {
        return true;
      } else {
        return false;
      }
    });
    setDataSource(filter);
  };

  const onReset = () => {
    form.resetFields();
  };


  // let detail = <></>;
  // if (!isNaN(selectedRow?.cadao) && selectedRow?.cadao !== undefined)
  // {
  //   const arr = selectedRow?.cadao.split("\n");
  //   detail = (
  //     <>
  //       {arr.map((item, index) => {
  //         return <div>{item}</div>
  //       })};
  //     </>
  //   );
  // }
  

  return (
    <>
      <div>
        <h1><FileSearchOutlined />Ca dao/ Tục ngữ</h1>
      </div>
      <div>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        // style={{ maxWidth: 600 }}
        >
          <Form.Item name="cadao" label="Từ">
            <Input />
          </Form.Item>
          <Form.Item name="loai" label="Loại">
            <Select>
              <Select.Option value="1">Ca dao</Select.Option>
              <Select.Option value="2">Tục ngữ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
          //  {...tailLayout}
          >
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button type="primary" htmlType="submit">
                  Tìm kiếm
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Space>
            </div>
          </Form.Item>
        </Form>
        <Table columns={columns} dataSource={dataSource} />
      </div>

      <Modal title="Tra cứu" open={isModalOpen} onOk={handleOk} cancelButtonProps={{ style: { display: 'none' } }}>
        <Space direction="vertical">
          <Space wrap>
            <p><StarTwoTone twoToneColor="#eb2f96" /> {selectedRow?.cadao}</p>
            <Button type='default' shape='circle' onClick={() => speechHandler(selectedRow?.cadao)} icon={<SoundOutlined />} />
          </Space>
          <Space wrap>
            <Button type="primary" shape="round" size='small'>
              {selectedRow?.loai}
            </Button>
          </Space>
          <Space wrap>
          </Space>
        </Space>
      </Modal>
    </>
  );
}