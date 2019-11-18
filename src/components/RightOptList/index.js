import React, { PureComponent, Fragment } from 'react';
import { Icon, Popconfirm } from 'antd';
import { Menu, Item, Submenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import styles from './index.less';
import { getMenuIdFromSubMenuEventKey } from 'rc-menu/lib/util';

const menuId = "RightOptMenuId";

class RightOptList extends PureComponent {
    render() {
        const { menuList = [], data = {} } = this.props;

        const menuItem = menuList.map(item => {
            if (item.children) {
                return (<Submenu className={styles.contextMenuOption} label={<span><Icon type={item.icon} />{item.title}</span>} key={item.id}>
                    {item.children.map(i => {
                        return (<Item className={styles.contextMenuOption} key={i.id} onClick={i.handle} ><Icon type={i.icon} />{i.title}</Item>)
                    })}
                </Submenu>)
            } else {
                return (
                    <Item className={styles.contextMenuOption} key={item.id} onClick={item.handle}><Icon type={item.icon} />{item.title}</Item>
                )
            }
        })


        return (
            <Menu id={menuId} >
                {menuItem}
            </Menu>
        )
    }
}

export default RightOptList;