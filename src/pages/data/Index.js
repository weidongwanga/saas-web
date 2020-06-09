import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import CreateDetailForm from './components/CreateDetailForm';
import StandardSearchForm from '@/components/StandardSearchForm';

const DATA = 'data';
const mapStateToProps = state => {
  const data = state[DATA];
  return {
    data: data.data,
    pagination: data.pagination,
    loading: state.loading.effects[`${DATA}/fetch`],
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetch(params) {
      const action = {
        type: `${DATA}/fetch`,
        payload: params,
      };
      dispatch(action);
    },
    addData(params, callback) {
      const action = {
        type: `${DATA}/addData`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    modifiedData(params, callback) {
      const action = {
        type: `${DATA}/modifiedData`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    addDataDetail(params, callback) {
      const action = {
        type: `${DATA}/addDataDetail`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
  }
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
class Data extends PureComponent {
  state = {

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

  handleAddData = fields => {
    this.props.addData(fields, response => {
      // this.handleSearchDefault();
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

  handleAddDataDetail = fields => {
    this.props.addDataDetail(fields, response => {
      // this.handleSearchDefault();
      if (response.success) {
        message.success('添加成功', 1, () => { });
      } else {
        message.warning(response.message, 1, () => { });
      }
    });

    this.setState({
      modalDetailVisible: false,
    });
  }

  handleModifiedData = fields => {
    this.props.modifiedData(fields, response => {
      // this.handleSearchDefault();
      if (response.success) {
        message.success('修改成功', 1, () => { });
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

    this.setState({
      title: title,
      record: record,
      modalVisible: !!flag,
    });
  };

  handleModalDetailVisible = (flag, title, record = {}) => {
    title = title || this.state.title;

    this.setState({
      title: title,
      record: record,
      modalDetailVisible: !!flag,
    });
  };

  renderTableList = () => {
    const { data, pagination, loading } = this.props;
    const columns = [
      { title: '数据组名', dataIndex: 'dataName', key: 'dataName' },
      { title: '描述', dataIndex: 'dataDesc', key: 'dataDesc' },
      {
        title: '操作', dataIndex: 'operate', key: 'operate',
        render: (text, record) => (
          <div>
            <a

              onClick={() => this.handleModalVisible(true, '修改', record)}
            >
              修改
            </a>
          </div>
        ),
      }
    ];

    const standardProp = {
      rowKey: 'id',
      loading,
      dataSource: data,
      columns,
      pagination: { pagination },
      indentSize: 100,

      //   onChange: this.tableChangeHandle
    };
    return <Table {...standardProp}
      expandedRowRender={this.renderDetailTableList}
      onExpand={(expanded, record) => { this.onExpandTableRow(expanded, record) }}
    />;
  };

  onExpandTableRow = (expanded, record) => {
    if (expanded === false) {
      return;
    }

  }

  renderDetailTableList = (record) => {

    const { data, pagination, loading } = this.props;

    const columns = [
      { title: 'CODE', dataIndex: 'dataName', key: 'dataName' },
      { title: '值', dataIndex: 'dataName', key: 'dataName' },
      { title: '类型', dataIndex: 'dataName', key: 'dataName' },
      { title: '序号', dataIndex: 'dataName', key: 'dataName' },
      { title: '状态', dataIndex: 'dataName', key: 'dataName' },
      { title: '描述', dataIndex: 'dataDesc', key: 'dataDesc' },
      {
        title: '操作', dataIndex: 'operate', key: 'operate',
        render: (text, record) => (
          <div>
            <a
              href="javascript:void(0)"
              onClick={() => this.handleModalDetailVisible(true, '修改', record)}
            >
              修改
            </a>
          </div>
        ),
      }
    ];

    const standardProp = {
      rowKey: 'id',
      loading,
      dataSource: data,
      columns,
      pagination: { pagination },
    };

    return <div >
      <Row type="flex" justify="space-between" style={{ marginBottom: 5 }}>
        <Col md={8} sm={24}>
          <Button style={{ marginLeft: 5 }} icon="plus" type="primary" onClick={() => this.handleModalDetailVisible(true)}>添加</Button>
          <Button style={{ marginLeft: 5 }} icon="upload" type="primary" onClick={() => this.handleModalDetailVisible(true)}>上传</Button>
        </Col>
      </Row>
      <Table bordered={true} {...standardProp} />
    </div>
  }

  searchFormRender() {

    const searchProp = {
      formItems: [
        { label: '数据组名', name: 'userName', type: 'input' },
      ],
      onSearch: this.handleSearch, //搜索回调
    };

    return <StandardSearchForm {...searchProp} />
  }

  render() {
    const { modalVisible, modalDetailVisible, record } = this.state;

    const crateFormProps = {
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddData,
      handleModified: this.handleModifiedData,
      record,
    }

    const crateDetailFormProps = {
      handleModal: this.handleModalDetailVisible,
      handleAdd: this.handleAddDataDetail,
      handleModified: this.handleModifiedData,
      record,
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
        <CreateDetailForm {...crateDetailFormProps} modalVisible={modalDetailVisible} />
      </div>
    );
  }
}

export default Data;
