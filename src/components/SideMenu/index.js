import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import * as icons from '@ant-design/icons';

const { SubMenu } = Menu;

export default function SideMenu() {

  let navigate = useNavigate();

  const rootSubmenuKeys = [
    'files',
  ];

  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = keys => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const MenuItem = ({...props}) => {

    return (
        <Menu.Item
            {...props}
            onClick={(event) => {
              navigate(event.key);
            }}
        />
    );
  };

  const menu = [
    {
      title: "Todos os Posts",
      key: "/allposts",
      icon: "FileTextOutlined",
    },
    {
      title: "Categorias",
      key: "/categories",
      icon: "FolderOpenOutlined",
      items: [
        {
          title: "Categorias",
          key: "/allcategories",
        },
        {
          title: "Sub Categorias",
          key: "/allsubcategories",
        },
      ]
    },
    {
      title: "Imagens",
      key: "/allfiles",
      icon: "FileImageOutlined",
    },
    {
      title: "Todos os Usuários",
      key: "/allusers",
      icon: "TeamOutlined",
    },
  ];

  const Icon = (props) => {
    const { icon } = props;
    const antIcon = icons;
    return React.createElement(antIcon[icon]);
  };

  return (
      <>
        <Menu
            mode="inline"
            openKeys={openKeys} onOpenChange={onOpenChange}
            style={{ height: '100%', borderRight: 0 }}
        >
          {menu.map((menu) =>
              !menu.items ?
                  <MenuItem key={menu.key} icon={menu.icon && <Icon icon={menu.icon}/>}>{menu.title}</MenuItem>
                  :
                  <SubMenu
                      title={menu.title}
                      key={menu.key}
                      icon={menu.icon && <Icon icon={menu.icon}/>}
                  >
                    {menu.items.map((menu) =>
                        !menu.items ?
                            <MenuItem key={menu.key} icon={menu.icon && <Icon icon={menu.icon}/>}>{menu.title}</MenuItem>
                            :
                            <SubMenu
                                title={menu.title}
                                key={menu.key}
                                icon={menu.icon && <Icon icon={menu.icon}/>}
                            >
                              {menu.items.map((menu) =>
                                  <MenuItem key={menu.key} icon={menu.icon && <Icon icon={menu.icon}/>}>{menu.title}</MenuItem>
                              )}
                            </SubMenu>
                    )}
                  </SubMenu>
          )}
        </Menu>
      </>
  );
}
