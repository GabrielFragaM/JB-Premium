import {Button, Drawer, Menu, Space, Typography} from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SideMenu from '../SideMenu';
import './style.css';
import Icon from "../icon";

export default function Header() {
    let navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const { Text } = Typography;

    return (
        <>
      <span>
        <Button
            className="menu"
            type="primary"
            icon={<Icon icon={'MenuOutlined'} />}
            onClick={() => setVisible(true)}
        />
        <img
            onClick={() => navigate('/')}
            alt="Logo"
            style={{
                maxHeight: '45px',
                display: 'inline-block',
                cursor: 'pointer',
            }}
            src="/img/logo.png"
        />
      </span>
            <Space>
                <Text style={{ color: '#FFF', fontSize: '12px'}}>
                </Text>
                <Menu
                    theme="dark"
                    mode='horizontal'
                    style={{ flex: 'auto', justifyContent: 'end',  backgroundColor: '#2a2a2a'}}
                    selectable={false}
                    selectedKeys={sessionStorage.getItem('locale') === 'en' ? "en" : "pt"}
                >
                    <Menu.SubMenu
                        key={"user"}
                        icon={<Icon icon={'UserOutlined'} />}
                        title={JSON.parse(sessionStorage.getItem('authDetails')).userDetails.name}
                        popupOffset={[0,0]}
                        theme={"light"}
                    >
                        <Menu.Item onClick={() => {
                            sessionStorage.setItem('authDetails', null);
                            window.location.reload();
                        }} key={"loggout"} >{"Desconectar"}</Menu.Item>
                    </Menu.SubMenu>
                </Menu>
            </Space>
            <Drawer
                title="Menu"
                placement="left"
                open={visible}
                onClose={() => setVisible(false)}
            >
                <SideMenu />
            </Drawer>
        </>
    );
}
