import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button, message, Select } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import StandardSearchForm from '@/components/StandardSearchForm';
import RightOptList from '@/components/RightOptList';
import RightOptShow from '@/components/RightOptShow';
import {selectData} from '@/utils/selectDataParse';
const {Option} = Select;
const menuId = "RightOptMenuId";
const ROLE = 'role';
const APPLICATION = 'application';
const mapStateToProps = state => {
  const role = state[ROLE];
  return {
    data: role.data,
    pagination: role.pagination,
    loading: state.loading.effects[`${ROLE}/fetch`],
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetch(params) {
      const action = {
        type: `${ROLE}/fetch`,
        payload: params,
      };
      dispatch(action);
    },
    addOrganization(params, callback) {
      const action = {
        type: `${ROLE}/add`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    modified(params, callback) {
      const action = {
        type: `${ROLE}/modified`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    delete(params, callback) {
      const action = {
        type: `${ROLE}/delete`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    fetchApplicationList(params, callback) {
      const action = {
          type: `${APPLICATION}/list`,
          payload: params,
          callback,
      };
      dispatch(action);
    }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Role extends PureComponent {
  state = {
    modalVisible: false,
    selectedRowKeys: [],
    selectedRecords: {},
    expandRow: false,
    formValues: {},
    applicationData: [],
  }

  constructor() {
    super();
    this.defaultPagination = {
      current: 1,
      size: 10,
    };
    this.tableChangeHandle = this.tableChangeHandle.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    
  }

  componentDidMount() {
    const params = {}
    this.handleSearch();
    this.props.fetchApplicationList({}, response => {
      if (response.success) {
        const applicationData = selectData(response.data, "id", "applicationName");
        this.setState({
          applicationData: [...applicationData],
        });
      }
    })
  }

  handleSearch = (formValues = {}) => {
    const params = {
        current: this.defaultPagination.current,
        size: this.defaultPagination.size,
        ...formValues,
    };

    this.setState({
        formValues: { ...formValues }
    });

    this.props.fetch(params);
}

tableChangeHandle(pagination) {
  const { formValues } = this.state;
  const params = {
      ...formValues,
      ...pagination,
  };

  this.handleSearch(params);
}

  searchFormRender = () => {
    const {applicationData} = this.state;
    const searchProp = {
      formItems: [
        { label: '角色名称', name: 'roleName', type: 'input' },
        { label: '所属项目', name: 'applicationId', type: 'select', list: [...applicationData]},
      ],
      onSearch: this.handleSearch, //搜索回调
    };

    return <StandardSearchForm {...searchProp} />
  }

  handleAddOrg = fields => {
    this.props.addOrganization(fields, response => {
      this.handleSearch();
      if (response.success) {
        message.success('添加成功', 1, () => { });
      } else {
        message.warning(response.message, 3, () => { });
      }
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleModified = fields => {
    this.props.modified(fields, response => {
      this.handleSearch();
      if (response.success) {
        message.success('修改成功', 1, () => { });
      } else {
        message.warning(response.message, 3, () => { });
      }
    })

    this.setState({
      modalVisible: false,
      expandRow: true,
    });
  }

  handleDelete = () => {
    const { record } = this.state;
    this.props.delete(record, response => {
      this.handleSearch();
      if (response.success) {
        message.success('删除成功', 1, () => { });
      } else {
        message.warning(response.message, 3, () => { });
      }
    })
  }

  handleSearchApplication = (params) => {
    
  }

  handleModifiedModalVisible = () => {
    const { record } = this.state;
    this.setState({
      parentRecord: {},
    });
    this.handleModalVisible(true, '', record);
  }

  handleAddModalVisible = () => {
    const { record } = this.state;
    this.setState({
      parentRecord: record,
    });
    this.handleModalVisible(true, '');
  }

  handleButtonAddModalVisible = () => {
    this.setState({
      parentRecord: {},
    });
    this.handleModalVisible(true, '');
  }

  handleModalVisible = (flag, title, record = {}) => {
    title = title || this.state.title;
    this.setState({
      title: title,
      record: record,
      modalVisible: !!flag,
    });
  };

  renderTableList = () => {
    const { data, pagination, loading } = this.props;

    const columns = [
      { title: '角色名称', dataIndex: 'roleName', key: 'roleName' },
      { title: '所属项目', dataIndex: 'applicationId', key: 'applicationId'},
      { title: '角色描述', dataIndex: 'roleDesc', key: 'roleDesc' },
    ];

    const standardProp = {
      rowKey: 'id',
      loading,
      dataSource: data,
      columns,
      pagination,
      onChange: this.tableChangeHandle
    };
    return <Table {...standardProp}
      onRow={record => {
        return {
          onContextMenu: event => {
            event.preventDefault();
            RightOptShow.showOpt(event, menuId);
            this.setState({
              record: record,
            });
          }
        }
      }}
    />;
  };


  render() {
    const { modalVisible, record, parentRecord, applicationData } = this.state;

    const crateFormProps = {
      record,
      applicationData,
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddOrg,
      parentRecord: parentRecord,
      handleModified: this.handleModified,
    }

    const rightOptOps = [
      {
        id: 1,
        title: '添加子组织',
        icon: 'edit',
        handle: this.handleAddModalVisible,
      },
      {
        id: 2,
        title: '修改',
        icon: 'edit',
        handle: this.handleModifiedModalVisible,
      },
      {
        id: 3,
        title: '删除',
        icon: 'delete',
        handle: this.handleDelete
      },
    ];

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.searchFormRender()}</div>
          <div className={styles.tableList}>
            <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
              <Col md={8} sm={24}>
                <Button icon="plus" type="primary" onClick={() => this.handleButtonAddModalVisible(true)}>
                  添加
                </Button>
              </Col>
            </Row>
            {this.renderTableList()}
          </div>
        </Card>
        <CreateForm {...crateFormProps} modalVisible={modalVisible} />
        <RightOptList menuList={rightOptOps} />
      </div>
    );
  }
}

export default Role;
