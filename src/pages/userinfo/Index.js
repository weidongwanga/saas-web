import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Card, Row, Col, Button, message } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import StandardSearchForm from '@/components/StandardSearchForm';

const USERMANAGER_ = 'userManager';
const mapStateToProps = state => {
    const application = state[USERMANAGER_];
    return {
        data: application.data,
        pagination: application.pagination,
        loading: state.loading.effects[`${USERMANAGER_}/fetch`],
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetch(params) {
            const action = {
                type: `${USERMANAGER_}/fetch`,
                payload: params,
            };
            dispatch(action);
        },
        add(params, callback) {
            const action = {
                type: `${USERMANAGER_}/add`,
                payload: params,
                callback,
            };
            dispatch(action);
        },
        modified(params, callback) {
            const action = {
                type: `${USERMANAGER_}/modified`,
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
class UserInfo extends PureComponent {
    state = {
        formValues: {},
    }

    constructor() {
        super();
        this.defaultPagination = {
            current: 1,
            size: 10,
        };
        this.tableChangeHandle = this.tableChangeHandle.bind(this);
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

    componentDidMount() {
        this.handleSearch();
    }


    handleAddCompany = fields => {
        this.props.add(fields, response => {
            this.handleSearch(this.state.formValues);
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

    handleModified = fields => {
        this.props.modified(fields, response => {
            this.handleSearch(this.state.formValues);
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

    tableChangeHandle(pagination) {
        const { formValues } = this.state;
        const params = {
          ...formValues,
          ...pagination,
        };
    
        this.handleSearch(params);
      }

    renderTableList = () => {
        const { data, pagination, loading } = this.props;
        const columns = [
            { title: '用户名', dataIndex: 'userName', key: 'userName' },
            { title: '用户昵称', dataIndex: 'userNickName', key: 'userNickName' },
            { title: '英文名称', dataIndex: 'userEnName', key: 'userEnName', },
            { title: '手机', dataIndex: 'userPhone', key: 'userPhone' },
            { title: '邮箱', dataIndex: 'userMail', key: 'userMail', },
            { title: '状态', dataIndex: 'isActive', key: 'isActive', },
            { title: '创建时间', dataIndex: 'createTime', key: 'createTime', 
                render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>,
            },
            { title: '创建人', dataIndex: 'createUser', key: 'createUser', },
            { title: '修改时间', dataIndex: 'updateTime', key: 'updateTime', 
                render: text => <span>{text > 0 ? moment(text).format('YYYY-MM-DD HH:mm') : ''}</span>,
            },
            { title: '修改人', dataIndex: 'updateUser', key: 'updateUser', },
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
            pagination,
            onChange: this.tableChangeHandle,
        };
        return <Table {...standardProp} />;
    };

    searchFormRender() {
        const { applicationData } = this.props;

        const searchProp = {
            formItems: [
                { label: '用户名', name: 'userName', type: 'input' },
                { label: '用户昵称', name: 'userNickName', type: 'input' },
            ],
            onSearch: this.handleSearch, //搜索回调
        };

        return <StandardSearchForm {...searchProp} />
    }

    render() {
        const { modalVisible, record } = this.state;

        const crateFormProps = {
            handleModal: this.handleModalVisible,
            handleAdd: this.handleAddCompany,
            handleModified: this.handleModified,
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
            </div>
        );
    }
}

export default UserInfo;
