import { Form, Modal, Input, Select, Checkbox, Table } from 'antd';
import moment from 'moment';

const renderOptions = data => {
  if (!data || data.length == 0) {
    return;
  }
  const options = data.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ));

  return options;
};

const UserAccountList = ((props) => {
  const { title, modalVisible, handleModal} = props;

  const renderTableList = () => {
    const { data, loading } = props;
    const columns = [
        { title: '账号', dataIndex: 'userAccount', key: 'userAccount' },
        { title: '账号类型', dataIndex: 'accountType', key: 'accountType' },
        { title: '状态', dataIndex: 'isActive', key: 'isActive', },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime', 
            render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>,
        },
        { title: '创建人', dataIndex: 'createUser', key: 'createUser', },
        { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', 
            render: text => <span>{text > 0 ? moment(text).format('YYYY-MM-DD HH:mm') : ''}</span>,
        },
        { title: '修改人', dataIndex: 'updateUser', key: 'updateUser', },
    ];

    const standardProp = {
        rowKey: 'id',
        loading,
        dataSource: data,
        columns,
    };
    return <Table {...standardProp} />;
};

  
  return (
    <Modal width={'60%'} title={title} visible={modalVisible} footer={null} onCancel={() => handleModal()} destroyOnClose={true}>
        {renderTableList()}
    </Modal>
  );
});

export default UserAccountList;
