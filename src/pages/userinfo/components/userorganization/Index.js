import { PureComponent } from 'react';
import { Modal, Input, Select, Checkbox, Tree } from 'antd';

const { TreeNode } = Tree;

class UserOrganization extends PureComponent {

    state={
        expandedKeys: [],
    }

    componentDidUpdate  (prevProps, prevState) {
        const{selected} = this.props;
        if(prevProps.selected !== this.props.selected) {
            this.setState({
                expandedKeys: selected,
            });
        }
    }

    onCheckTree = (checkedKeys) => {
        const {handleSave} = this.props;
        const params = {
            orgId: checkedKeys[0],
        }
        handleSave(params);
    }

    onExpand = expandedKeys => {
        this.setState({
          expandedKeys,
        });
      };

    render() {
        const { title = "", modalVisible = false, handleModal, orgTree = [], selected = [] } = this.props;
        const treeProps = {
            autoExpandParent: true,
            defaultExpandAll: true,
            className: "draggable-tree",
            onCheck: this.onCheckTree,
        }

        const renderUserOrganizationTree = data =>
            data.map(item => {
                if (item.children && item.children.length) {
                    return (
                        <TreeNode title={item.orgName} key={item.id} >
                            {renderUserOrganizationTree(item.children)}
                        </TreeNode>
                    );
                }
                return <TreeNode title={item.orgName} key={item.id} />;
            });


        return (
            <Modal width={'60%'} title={title} visible={modalVisible} footer={null} onCancel={() => handleModal()} destroyOnClose={true}>
                <Tree
                    autoExpandParent={true}
                    onSelect = {this.onCheckTree}
                    selectedKeys={selected}
                    expandedKeys={this.state.expandedKeys}
                    onExpand={this.onExpand}

                >
                    {renderUserOrganizationTree(orgTree)}
                </Tree>
            </Modal>
        )
    }
}
export default UserOrganization;