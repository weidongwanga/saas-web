import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Dropdown, Icon } from 'antd';
import styles from './index.less';

const { SubMenu } = Menu;
class RightMenu extends PureComponent {
    state = {
        content: '',
        visible: false,
        list: []
    }

    componentDidMount() {
        const { children } = this.props
        this.setState({
            content: children
        })
        this.getList()
        document.addEventListener('contextmenu', this.handleContextMenu)
        window.addEventListener('resize', this.resize);
        document.addEventListener('click', this.handleClick);
        document.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        document.removeEventListener('contextmenu', this.handleContextMenu)
        window.removeEventListener('resize', this.resize);
        document.removeEventListener('click', this.handleClick);
        document.removeEventListener('scroll', this.handleScroll);
    }

    getList() {
        const { rightList } = this.props;
        this.setState({
            list: rightList,
        });
    }

    handleClick = (event) => {
        const { visible } = this.state;
        const wasOutside = !(event.target.contains === this.root);
    
        if (wasOutside && visible) this.setState({ visible: false, });
      };
    
      handleScroll = () => {
          const { visible } = this.state;
          if (visible) this.setState({ visible: false, });
      }

    runderMenu = () => {
        const { visible, list } = this.state;
        const menu = list.map(item => {
            if (item.children) {
                return (<SubMenu  className={styles.contextMenuOption} title={<span><Icon type={item.icon} />{item.title}</span>}  key={item.id}>
                    {item.children.map(i => {
                        return (<Menu.Item className={styles.contextMenuOption}  key = {i.id} onClick={()=>{console.log()}} ><Icon type={i.icon} />{i.title}</Menu.Item>)
                    })}
                </SubMenu>)
            } else {
                return (
                    <Menu.Item  className={styles.contextMenuOption} key = {item.id} onClick={()=>{console.log()}}><Icon type={item.icon} />{item.title}</Menu.Item>
                )
            }
        })
        console.log(menu)
        return (
          visible && (
            <div ref={(ref) => { this.root = ref }} className={styles.contextMenuWrap}>
                <Menu>
                    {
                        menu
                    }
                </Menu>
            </div>
            
          )
        )
      }
    handleContextMenu = (event) => {
          event.preventDefault()
          this.setState({ visible: true })
          // clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离
          const clickX = event.clientX
          const clickY = event.clientY
          // window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度
          const screenW = window.innerWidth
          const screenH = window.innerHeight
          // 获取自定义菜单的宽度/高度
          const rootW = this.root.offsetWidth
          const rootH = this.root.offsetHeight
    
          // right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。
          // bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。
          const right = (screenW - clickX) > rootW
          const left = !right
          const bottom = (screenH - clickY) > rootH
          const top = !bottom
    
          if (right) {
            this.root.style.left = `${clickX}px`
          }
    
          if (left) {
            this.root.style.left = `${clickX - rootW}px`
          }
    
          if (bottom) {
            this.root.style.top = `${clickY}px`
          }
          if (top) {
            this.root.style.top = `${clickY - rootH}px`
          }
        
      };
    render() {
        return (
            <div >
                {/* demo
                {this.state.content} */}
                {this.runderMenu()}
            </div>
        );
    }
}

export default RightMenu;