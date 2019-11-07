import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button, message } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';

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

    this.setState({
      title: title,
      record: record,
      modalVisible: !!flag,
    });
  };

  onExpandedRowRender = (expended, record) => {
    // subRowAddCallback(record.id);
    const expandedRowColumns = [
        { title: '组织名称', dataIndex: 'orgName', key: 'orgName' },
        { title: '组织编码', dataIndex: 'orgCode', key: 'orgCode' },
      ];

    return <Fragment>
    {/* <Form layout="inline">{subRowButtons}</Form> */}
    <Table
      columns={expandedRowColumns}
      dataSource={[]}
      bordered
      style={{"margin-right":20}}
      pagination={false}
    />
  </Fragment>
  };

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
                href="javascript:void(0)"
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
      //   onChange: this.tableChangeHandle
    };
    return <Table {...standardProp} expandedRowRender={this.onExpandedRowRender} />;
  };

  render() {
    const {modalVisible, record} = this.state;

    const crateFormProps = {
      record,
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddOrg,
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
