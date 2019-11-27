import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button, message, Divider } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import StandardSearchForm from '@/components/StandardSearchForm';
import RightOptList from '@/components/RightOptList';
import RightOptShow from '@/components/RightOptShow';
const menuId = "RightOptMenuId";

const ORGANIZATION = 'organization';
const mapStateToProps = state => {
  const organization = state[ORGANIZATION];
  return {
    data: organization.data,
    pagination: organization.pagination,
    loading: state.loading.effects[`${ORGANIZATION}/fetch`],
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetch(params) {
      const action = {
        type: `${ORGANIZATION}/fetch`,
        payload: params,
      };
      dispatch(action);
    },
    addOrganization(params, callback) {
      const action = {
        type: `${ORGANIZATION}/addOrganization`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    modified(params, callback) {
      const action = {
        type: `${ORGANIZATION}/modified`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    delete(params, callback) {
      const action = {
        type: `${ORGANIZATION}/delete`,
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
class Organization extends PureComponent {
  state = {
    modalVisible: false,
    selectedRowKeys: [],
    selectedRecords: {},
    expandRow: false,
    formValues: {},
  }

  constructor() {
    super();
  }

  componentDidMount() {
    const params = {}
    this.props.fetch(params);
  }

  handleSearch = (formValues = {}) => {
    this.props.fetch(formValues);
  }

  searchFormRender = () => {
    const searchProp = {
      formItems: [
        { label: '项目编号', name: 'orgName', type: 'input' },
        { label: '项目名称', name: 'applicationName', type: 'input' },
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
      { title: '组织名称', dataIndex: 'orgName', key: 'orgName' },
      { title: '组织编码', dataIndex: 'orgCode', key: 'orgCode' },
    ];

    const standardProp = {
      rowKey: 'id',
      loading,
      dataSource: data,
      columns,
      pagination: 'disable',

      //   onChange: this.tableChangeHandle
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
    const { modalVisible, record, parentRecord } = this.state;

    const crateFormProps = {
      record,
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

export default Organization;
