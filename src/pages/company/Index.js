import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table, Card, Row, Col, Button } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';

const COMPANY = 'company';
const mapStateToProps = state => {
  const company = state[COMPANY];
  return {
    data: company.data,
    pagination: company.pagination,
    loading: state.loading.effects[`${COMPANY}/fetch`],
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetch(params) {
      const action = {
        type: `${COMPANY}/fetch`,
        payload: params,
      };
      dispatch(action);
    },
    addCompany(params, callback) {
        const action = {
          type: `${COMPANY}/addCompany`,
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
class Company extends PureComponent {
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

  searchFormRender = () => {

  }

  handleAddCompany = fields => {
    this.props.addCompany(fields, response => {
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
      { title: '公司编码', dataIndex: 'companyCode', key: 'companyCode' },
      { title: 'Namesvr端口', dataIndex: 'port', key: 'port' },
      { title: '机房', dataIndex: 'engineRoom', key: 'engineRoom', },
      {
        title: '操作', dataIndex: 'operate', key: 'operate',
        // render: (text, record) => (
        //   <div>
        //     {/* <a
        //       href="javascript:void(0)"
        //       onClick={() => this.handleModalVisible(true, '修改', record)}
        //     >
        //       修改
        //     </a> */}
        //   </div>
        // ),
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
    return <Table {...standardProp} />;
  };

  render() {
    const {modalVisible} = this.state;

    const crateFormProps = {
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddCompany,
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

export default Company;
