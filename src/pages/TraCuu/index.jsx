import React, { useState, useEffect } from 'react';
import { Button, Input, Table, Modal } from 'antd'
import { EyeOutlined, FileSearchOutlined, SoundOutlined } from '@ant-design/icons';

const { Search } = Input;

export default function TraCuu() {
  const data = [
    {
      key: "1",
      tu: "ba",
      nghia: "Số tiếp theo số hai trong dãy số tự nhiên",
    },
    {
      key: "2",
      tu: "ba ba",
      nghia: "Rùa nước ngọt, có mai dẹp phủ da, không vảy"
    },
    {
      key: "3",
      tu: "ba chỉ",
      nghia: "Phần thịt lợn trong bụng, có ba thớ nạc xen mỡ"
    }
  ];

  const [filterInput, setFilterInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});


  const speechHandler = (text) => {
    const lang = 'pt-BR';
    const msg = new SpeechSynthesisUtterance()
    const voices = window.speechSynthesis.getVoices();
    msg.voice = voices.filter(voice => voice.lang === lang)[2];
    msg.lang = lang; 
    msg.text = "Tôi là người việt";

    window.speechSynthesis.speak(msg)
  }

  const filterData = () => {
    if (filterInput === '') return data

    if (isNaN(filterInput)) {
      return data.filter(({ tu }) => tu.includes(filterInput))
    }
    return data.filter(({ nghia }) => nghia === +filterInput)
  }

  const showModal = (record) => {
    setSelectedRow(record);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
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

  return (
    <>
      <div>
        <h1><FileSearchOutlined />Tra Cứu Tiếng Việt </h1>
      </div>
      <div>
        <Search placeholder="input search text" onSearch={setFilterInput} enterButton />
        <Table columns={columns} dataSource={filterData()} />
      </div>

      <Modal title="Chi tiết" open={isModalOpen} onCancel={handleCancel}>
        <p>{selectedRow?.tu}</p>
        <Button type='default' shape='circle' onClick={() => speechHandler(selectedRow?.tu)} icon={<SoundOutlined />} />
        <p>{selectedRow?.nghia}</p>
      </Modal>
    </>
  );
}