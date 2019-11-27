import React, { PureComponent } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Table, Card, Row, Col, Button, message, Divider } from 'antd';
import styles from './style.less';
import CreateForm from './components/CreateForm';
import StandardSearchForm from '@/components/StandardSearchForm';
import UserAccountList from './components/accountList';
import RightOptList from '@/components/RightOptList';
import RightOptShow from '@/components/RightOptShow';
import UserOrganization from './components/userorganization'

const menuId = "RightOptMenuId";

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
        userAccountList(params, callback) {
            const action = {
                type: `${USERMANAGER_}/userAccountList`,
                payload: params,
                callback,
            };
            dispatch(action);
        },
        delete(params, callback) {
            const action = {
                type: `${USERMANAGER_}/delete`,
                payload: params,
                callback,
            };
            dispatch(action);
        },
        userOrgTree(params, callback) {
            const action = {
                type: `${USERMANAGER_}/userOrgTree`,
                payload: params,
                callback,
            };
            dispatch(action);
        },
        saveUserOrg(params, callback) {
            const action = {
                type: `${USERMANAGER_}/saveUserOrg`,
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
        accountModalVisible: false,
        orgModalVisible: false,
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

    handleSaveUserOrg = fields => {
        const {record} = this.state;
        fields = {
            userId: record.id,
            ...fields,
        }
        this.props.saveUserOrg(fields, response => {
            this.handleSearch(this.state.formValues);
            if (response.success) {
                message.success('修改成功', 1, () => { });
            } else {
                message.warning(response.message, 1, () => { });
            }
        });

        this.setState({
            orgModalVisible: false,
        });
    }

    handleDelete = () => {
        const { record } = this.state;
    }

    handleModifiedModalVisible = () => {
        const { record } = this.state;
        this.handleModalVisible(true, '', record);
    }

    handleModalVisible = (flag, title, record = {}) => {
        title = title || this.state.title;

        this.setState({
            title: title,
            record: record,
            modalVisible: !!flag,
        });
    };

    handleUserAccountModalVisible = () => {
        const { record } = this.state;
        if (!this.state.accountModalVisible) {
            this.props.userAccountList(record, response => {
                if (response.success) {
                    this.setState({
                        userAccountList: response.data,
                    });
                }
            });
        }
        this.setState({
            record: record,
            accountModalVisible: !this.state.accountModalVisible,
        });
    };

    orgTreeInfo = [{
        id: 10001,
        orgName: 'test1'
    }]

    handleUserOrgModalVisible = () => {
        const { record } = this.state;
        if (!this.state.orgModalVisible) {
            this.setState({
                userOrgTree: [],
                selected: [],
            });

            this.props.userOrgTree(record, response => {
                if (response.success) {
                    this.setState({
                        userOrgTree: response.data.orgTree,
                        selected: response.data.selected,
                    });
                }
            });
        }
        this.setState({
            record: record,
            orgModalVisible: !this.state.orgModalVisible,
        });
    }

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
            {
                title: '创建时间', dataIndex: 'createTime', key: 'createTime',
                render: text => <span>{moment(text).format('YYYY-MM-DD HH:mm')}</span>,
            },
            { title: '创建人', dataIndex: 'createUser', key: 'createUser', },
            {
                title: '修改时间', dataIndex: 'updateTime', key: 'updateTime',
                render: text => <span>{text > 0 ? moment(text).format('YYYY-MM-DD HH:mm') : ''}</span>,
            },
            { title: '修改人', dataIndex: 'updateUser', key: 'updateUser', },
        ];

        const standardProp = {
            rowKey: 'id',
            loading,
            dataSource: data,
            columns,
            pagination,
            onChange: this.tableChangeHandle,
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
                };
            }}
        />;
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
        const { modalVisible, record, accountModalVisible, userAccountList, orgModalVisible, userOrgTree, selected } = this.state;

        const crateFormProps = {
            handleModal: this.handleModalVisible,
            handleAdd: this.handleAddCompany,
            handleModified: this.handleModified,
            record,
        }

        const userAccountProps = {
            handleModal: this.handleUserAccountModalVisible,
            record,
            data: userAccountList,
        }

        const rightOptOps = [
            {
                id: 1,
                title: '修改',
                icon: 'edit',
                handle: this.handleModifiedModalVisible,
            },
            {
                id: 2,
                title: '登录账号',
                icon: 'delete',
                handle: this.handleUserAccountModalVisible
            },
            {
                id: 3,
                title: '组织信息',
                icon: 'delete',
                handle: this.handleUserOrgModalVisible
            },
        ]

        const userOrgProps = {
            modalVisible: orgModalVisible,
            handleModal: this.handleUserOrgModalVisible,
            orgTree: userOrgTree,
            selected: selected,
            handleSave: this.handleSaveUserOrg,
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
                <UserAccountList {...userAccountProps} modalVisible={accountModalVisible} />
                <RightOptList menuList={rightOptOps} />
                <UserOrganization {...userOrgProps} />
            </div>
        );
    }
}

export default UserInfo;
