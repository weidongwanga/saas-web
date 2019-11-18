import { PureComponent } from 'react';
import { Modal, Input, Select, Checkbox, Tree } from 'antd';

const { TreeNode } = Tree;

class UserOrganization extends PureComponent {



    render() {
        const { title = "", modalVisible = false, handleModal, orgTree = [], selected = [] } = this.props;
        const treeProps = {
            autoExpandParent: true,
            defaultExpandAll: true,
            className: "draggable-tree",
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
                return <TreeNode title={item.orgName} key={item.id}/>;
            });
        

        return (
            <Modal width={'60%'} title={title} visible={modalVisible} footer={null} onCancel={() => handleModal()} destroyOnClose={true}>
                <Tree {...treeProps}> {renderUserOrganizationTree(orgTree)}</Tree>
            </Modal>
        )
    }
}
export default UserOrganization;