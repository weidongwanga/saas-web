import { PureComponent } from 'react';
import { Tree } from 'antd';
import RightOptList from '@/components/RightOptList';
import RightOptShow from '@/components/RightOptShow';
const menuId = "RightOptMenuId";
const { TreeNode } = Tree;

class LeftTree extends PureComponent {

    state = {
        selectedKeys: [],
    }

    onSelect = (selectedKeys, info) => {
        console.log(info.node.props.eventKey);
        const {selectTreeRecord} = this.props;
        const params = {
            menuId: info.node.props.eventKey,
        };
        selectTreeRecord(params);
    }

    onRightClick = (data) => {
        const {saveParentState} = this.props;
        saveParentState({
            rightMenuId: data.node.props.eventKey,
        });
        RightOptShow.showOpt(data.event, menuId);
    }

    render() {
        const { treeNodeDatas=[], selectedKeys=[]} = this.props;

        return (
            <Tree showLine showIcon onSelect={this.onSelect} selectedKeys={selectedKeys} onRightClick={this.onRightClick}>
                {treeNodeDatas}
            </Tree>
        )
    }
}
export default LeftTree;