import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Table, Modal, Image, Space, Select } from 'antd'
import { EyeOutlined, FileSearchOutlined, SoundOutlined, StarTwoTone } from '@ant-design/icons';
import { useSpeechSynthesis } from 'react-speech-kit';

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

// const tailLayout = {
//   wrapperCol: { offset: 8, span: 16 },
// };

export default function TraCuu() {
  const [form] = Form.useForm();

  const data = [
    {
      key: "1",
      tu: "ba",
      tuloai: "Danh từ",
      cautaotu: "Từ đơn",
      nghia: "Số tiếp theo số hai trong dãy số tự nhiên",
      img: "3.png"
    },
    {
      key: "2",
      tu: "ba ba",
      tuloai: "Danh từ",
      cautaotu: "Từ ghép",
      nghia: "Rùa nước ngọt, có mai dẹp phủ da, không vảy",
      img: "3.png"
    },
    {
      key: "3",
      tu: "ba chỉ",
      tuloai: "Danh từ",
      cautaotu: "Từ ghép",
      nghia: "Phần thịt lợn trong bụng, có ba thớ nạc xen mỡ",
      img: "3.png"
    }
  ];

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
      title: "Từ",
      dataIndex: "tu",
      key: "tu",
      render: text => <a>{text}</a>
    },
    {
      title: "Nghĩa",
      dataIndex: "nghia",
      key: "nghia"
    }, {
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
      let checkTu = false;
      let checkTuloai = false;
      let checkCautaotu = false;

      let getTuLoai = '';
      switch (values?.tuloai) {
        case '1':
          getTuLoai = 'Danh từ';
          break;
        case '2':
          getTuLoai = 'Động từ';
          break;
        case '3':
          getTuLoai = 'Tính từ';
          break;
        default:
          checkTuloai = true;
          break;
      }

      let getCauTaoTu = '';
      switch (values?.cautaotu) {
        case '1':
          getCauTaoTu = 'Từ đơn';
          break;
        case '2':
          getCauTaoTu = 'Từ ghép';
          break;
        case '3':
          getCauTaoTu = 'Từ láy';
          break;
        default:
          checkCautaotu = true;
          break;
      }

      if (isNaN(values?.tu) && tu.tu.includes(values?.tu)) {
        checkTu = true;
      }
      if (getTuLoai === tu.tuloai) {
        checkTuloai = true;
      }
      if (getCauTaoTu === tu.cautaotu) {
        checkCautaotu = true;
      }

      if (checkTu && checkTuloai && checkCautaotu) {
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

  return (
    <>
      <div>
        <h1><FileSearchOutlined />Tra Cứu Tiếng Việt </h1>
      </div>
      <div>
        <Form
          {...layout}
          form={form}
          name="control-hooks"
          onFinish={onFinish}
        // style={{ maxWidth: 600 }}
        >
          <Form.Item name="tu" label="Từ" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tuloai" label="Từ loại">
            <Select>
              <Select.Option value="1">Danh từ</Select.Option>
              <Select.Option value="2">Động Từ</Select.Option>
              <Select.Option value="3">Tính từ</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item name="cautaotu" label="Cấu tạo từ">
            <Select>
              <Select.Option value="1">Từ đơn</Select.Option>
              <Select.Option value="2">Từ ghép</Select.Option>
              <Select.Option value="3">Từ láy</Select.Option>
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
            <p><StarTwoTone twoToneColor="#eb2f96" /> {selectedRow?.tu}</p>
            <Button type='default' shape='circle' onClick={() => speechHandler(selectedRow?.tu)} icon={<SoundOutlined />} />
          </Space>
          <Space wrap>
            <Button type="primary" shape="round" size='small'>
              {selectedRow?.tuloai}
            </Button>
            <Button type="dashed" shape="round" size='small'>
              {selectedRow?.cautaotu}
            </Button>
          </Space>
          <Space wrap>
          </Space>
          <Space wrap>
            <p>{selectedRow?.nghia}</p>
          </Space>
          <Image
            width={300}
            src={process.env.PUBLIC_URL + '/img/' + selectedRow?.img}
          />
        </Space>
      </Modal>
    </>
  );
}