import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import PageRoutes from '../../utils/page-routes';

const MainMenu = () => {
  const routesInMenu = PageRoutes.filter((route) => route.menu);
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
