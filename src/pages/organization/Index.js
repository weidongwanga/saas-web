import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button, message } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import { Radio } from 'antd-mobile';

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
    }
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Organization extends PureComponent {
  state={
    modalVisible: false,
    selectedRowKeys: [],
    selectedRecords: {},
  }

  constructor() {
    super();
    this.defaultPagination = {
      current: 1,
      size: 10,
    };
  }

  componentDidMount() {
    const params = {
      ...this.defaultPagination,
    };
    this.props.fetch(params);
  }

  searchFormRender = () => {

  }

  handleAddOrg = fields => {
    this.props.addOrganization(fields, response => {
      if (response.success) {
        message.success('添加成功', 1, () => { });
      } else {
        message.warning(response.message, 1, () => { });
      }
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleModalVisible = (flag, title, record = {}) => {
    title = title || this.state.title;

    if (!!record.id || !flag) {
      this.setState({
        selectedRowKeys: [],
        selectedRecords: {},
      });
    }

    this.setState({
      title: title,
      record: record,
      modalVisible: !!flag,
    });
  };
  

  onSelectRows = (selectedRowKeys, selectedRows)  => {
      if (selectedRowKeys.length === 0) {
        this.setState({
          selectedRowKeys: [],
          selectedRecords: {},
        });
      }
      const selectedRowKeyLast = selectedRowKeys[selectedRowKeys.length - 1]
      this.setState({
        selectedRowKeys: [selectedRowKeyLast],
        selectedRecords: selectedRows[selectedRows.length - 1],
      });
  }

  renderTableList = () => {
    const { data, pagination, loading } = this.props;

    const columns = [
        { title: '组织名称', dataIndex: 'orgName', key: 'orgName' },
        { title: '组织编码', dataIndex: 'orgCode', key: 'orgCode' },
        {
          title: '操作', dataIndex: 'operate', key: 'operate',
          render: (text, record) => (
            <div>
              <a
                // href="javascript:void(0)"
                onClick={() => this.handleModalVisible(true, '修改', record)}
              >
                修改
              </a>
            </div>
          ),
        }
      ];
    
    const  rowSelection = {
        selections: true,
        onChange: this.onSelectRows,
        selectedRowKeys: this.state.selectedRowKeys,
        hideDefaultSelections: true,
        selections: [],
        // type: 'radio',
      }

    const standardProp = {
      rowKey: 'id',
      loading,
      dataSource: data,
      columns,
      pagination: 'disable' ,
      //   onChange: this.tableChangeHandle
    };
    return <Table {...standardProp} rowSelection={rowSelection}/>;
  };

  render() {
    const {modalVisible, record, selectedRecords} = this.state;

    const crateFormProps = {
      record,
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddOrg,
      parentRecord: selectedRecords,
    }

    return (
      <div>
        <Card bordered={false}>
          <div className={styles.tableListForm}>{this.searchFormRender()}</div>
          <div className={styles.tableList}>
            <Row type="flex" justify="space-between" style={{ marginBottom: 20 }}>
              <Col md={8} sm={24}>
                <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                  添加
              </Button>
              </Col>
            </Row>
            {this.renderTableList()}
          </div>
        </Card>
        <CreateForm {...crateFormProps} modalVisible={modalVisible} />
      </div>
    );
  }
}

export default Organization;
