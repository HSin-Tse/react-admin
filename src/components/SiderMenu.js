import React from 'react';
import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {FormattedMessage} from "react-intl";

const renderMenuItem = item => (
    <Menu.Item
        key={item.key}
    >
        <Link to={item.route || item.key}>
            {item.icon && <Icon type={item.icon}/>}
            <span className="nav-text">{item.title}</span>
        </Link>
    </Menu.Item>
);

const renderSubMenu = item => (
    <Menu.SubMenu
        key={item.key}
        title={
            <span>
                {item.icon && <Icon type={item.icon}/>}
                <span className="nav-text">

                     <FormattedMessage
                         id= {item.title}
                     />
                    </span>
            </span>
        }
    >
        {item.subs.map(item => renderMenuItem(item))}
    </Menu.SubMenu>
);

export default ({menus, ...props}) => (
    <Menu {...props}>
        {menus && menus.map(item =>
            item.subs ? renderSubMenu(item) : renderMenuItem(item)
        )}
    </Menu>
);