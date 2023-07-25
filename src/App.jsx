import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Routes  } from "react-router-dom";
import TraCuu from './pages/TraCuu'
import TuLoai from './pages/TuLoai'

import { Layout, Menu } from 'antd';
import { UploadOutlined, SearchOutlined, VideoCameraOutlined } from '@ant-design/icons';


const { Header, Content, Footer, Sider } = Layout;

class App extends Component {

    render() {
        const style = {
            logoImg: {
                width: "40px",
                marginRight: "8px"
            }
        };

        return (
            // <Router>
            //     <div className="App">
            //         <Routes>
            //             <Route path="/" element={<Home />} />
            //         </Routes>
            //     </div>
            // </Router>
            <Router>
                <Layout  style={{height:"100vh"}}>
                    <Sider
                        breakpoint="lg"
                        collapsedWidth="0"
                        onBreakpoint={(broken) => {
                            console.log(broken);
                        }}
                        onCollapse={(collapsed, type) => {
                            console.log(collapsed, type);
                        }}
                    >
                        {/* <div className="demo-logo-vertical" /> */}
                        <div className="logo">
                            {/* <img src="/antd-logo.svg" style={style.logoImg}/> */}
                            <span className='logoTitle'>
                                TỪ ĐIỂN THÔNG MINH
                            </span>
                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['4']}
                        >
                            <Menu.Item key="1" icon={<SearchOutlined />}>
                                <span>Tra cứu</span>
                                <Link to="/" />
                            </Menu.Item>
                            <Menu.Item key="2" icon={<UploadOutlined />}>
                                <span>Từ loại</span>
                                <Link to="/tuloai" />
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ padding: 0 }} />
                        <Content style={{ margin: '24px 16px 0' }}>
                            <div>
                                <Routes>
                                    <Route exact path="/" element={<TraCuu />} />
                                    <Route path="/tuloai" element={<TuLoai />} />
                                </Routes>
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Dictionary Created by OriStark</Footer>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default App;