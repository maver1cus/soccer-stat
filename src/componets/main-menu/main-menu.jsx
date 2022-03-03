import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import routes from '../../const/index';

const MainMenu = () => {
  const routesInMenu = routes.filter((route) => route.menu);
  return (
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={routesInMenu[0]}>
      {
          routesInMenu.map(({ path, menu }) => (
            <Menu.Item key={path}>
              <Link to={path}>{menu}</Link>
            </Menu.Item>
          ))
        }
    </Menu>
  );
};

export default MainMenu;
