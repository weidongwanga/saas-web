import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Table, Card, Row, Col, message, Select, Tree, Form, Input, Button, Icon, Popconfirm, Divider } from 'antd';
import styles from './style.less';
import CreateResourceForm from './components/CreateResourceForm';
import RightOptList from '@/components/RightOptList';
import LeftTree from './components/LeftTree';
const FormItem = Form.Item;
const { Option } = Select;
const { TreeNode } = Tree;
const menuId = "RightOptMenuId";
const MENU = 'menu';
const APPLICATION = 'application';
const mapStateToProps = state => {
  const menu = state[MENU];
  return {
  };
}

const mapDispatchToProps = dispatch => {
  return {
    treeFetch(params, callback) {
      const action = {
        type: `${MENU}/tree`,
        payload: params,
        callback
      };
      dispatch(action);
    },
    treeFetchById(params, callback) {
      const action = {
        type: `${MENU}/fetchById`,
        payload: params,
        callback
      };
      dispatch(action);
    },
    addMenu(params, callback) {
      const action = {
        type: `${MENU}/add`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    modified(params, callback) {
      const action = {
        type: `${MENU}/modified`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    delete(params, callback) {
      const action = {
        type: `${MENU}/delete`,
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
    },
    fetchResourceListByMenu(params, callback) {
      const action = {
        type: `${MENU}/fetchResourceListByMenu`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    addResource(params, callback) {
      const action = {
        type: `${MENU}/addResource`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    modifiedResource(params, callback) {
      const action = {
        type: `${MENU}/modifiedResource`,
        payload: params,
        callback,
      };
      dispatch(action);
    },
    deletedResource(params, callback) {
      const action = {
        type: `${MENU}/deletedResource`,
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
@Form.create()
class Menu extends PureComponent {
  state = {
    modalVisible: false,
    selectedKeys: [],
    applicationData: [],
    treeNodeDatas: [],
    selectRecord: {},
  }

  constructor() {
    super();
  }

  componentDidMount() {
    const params = {}
    this.handleSearchApplication();
  }

  handleAdd = () => {
    const params = {
      parentId: this.state.rightMenuId,
    }

    this.props.addMenu(params, response => {
      if (response.success) {
        message.success('添加成功', 1, () => { });
        this.changeAppSelected(response.data.applicationId);
        this.setState({
          selectedKeys: [response.data.id + ""]
        });
      } else {
        message.warning(response.message, 3, () => { });
      }
    });

    this.setState({
      modalVisible: false,
    });
  }

  handleDelele = () => {
    const params = {
      id: this.state.rightMenuId,
    }
    this.props.delete(params, response => {
      if (response.success) {
        message.success('删除成功', 1, () => { });
        this.changeAppSelected(this.state.selectApplicationId);
      } else {
        message.warning(response.message, 3, () => { });
      }
    });
  }


  renderOptions = data => {
    if (!data || data.length == 0) {
      return;
    }
    const options = data.map((item, index) => (
      <Option key={index} value={item.id}>
        {item.applicationName}
      </Option>
    ));

    this.setState({
      applicationOptions: [...options],
    });
  };

  handleSearchApplication = (params) => {
    this.props.fetchApplicationList(params, response => {
      if (response.success) {
        this.renderOptions(response.data);
        if (response.data && response.data[0]) {
          this.changeAppSelected(response.data[0].id);
        }
      }
    })
  }


  changeAppSelected = (value) => {
    const params = {
      applicationId: value,
    }
    this.props.treeFetch(params, response => {
      if (response.success) {
        this.renderTreeNodes(response.data);
      } else {
        this.setState({
          treeNodeDatas: [],
        });
      }
    });
    this.setState({
      selectApplicationId: value,
      selectRecord: {}
    });
  }

  treeNode(data) {
    return data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.menuName} key={item.id} icon={<Icon type={item.icon ? item.icon : "bank"} />}>
            {this.treeNode(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.menuName} key={item.id} icon={<Icon type={item.icon ? item.icon : "bank"} />} />;
    });
  }

  renderTreeNodes = (data) => {
    const treeNodeDatas = this.treeNode(data);

    this.setState({
      treeNodeDatas: [...treeNodeDatas],
    });
  }

  saveParentState = (data) => {
    this.setState({
      ...data,
    });
  }

  selectTreeRecord = (data) => {
    this.props.treeFetchById(data, response => {
      if (response.success) {
        this.setState({
          selectRecord: response.data,
          selectedKeys: [data.menuId]
        });
      } else {
        this.setState({
          selectRecord: {}
        });
      }
    });

    this.fetchResourceList(data.menuId);
  }

  fetchResourceList = (id) => {
    const params = {
      menuId: id,
    }
    this.props.fetchResourceListByMenu(params, response => {
      if (response.success) {
        this.setState({
          resourceData: response.data,
        });
      } else {
        this.setState({
          resourceData: []
        });
      }
    });
  }

  menuSaveHandle = () => {
    const { form } = this.props;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      fieldsValue.id = this.state.selectRecord.id;
      this.props.modified(fieldsValue, response => {
        if (response.success) {
          message.success('修改成功', 1, () => { });
          this.changeAppSelected(this.state.selectApplicationId);
          this.setState({
            selectedKeys: [response.data.id + ""],
            selectRecord: response.data,
          });
        }
      })
    });
  };

  renderResourceTable = () => {
    const { loading } = this.props;
    const { resourceData = [] } = this.state;
    const columns = [
      { title: '名称', dataIndex: 'resourceName', key: 'resourceName' },
      { title: '类型', dataIndex: 'resourceType', key: 'resourceType' },
      { title: '值', dataIndex: 'resourceValue', key: 'resourceValue', },
      { title: '方法', dataIndex: 'resourceMethod', key: 'resourceMethod' },
      { title: '描述', dataIndex: 'resourceDesc', key: 'resourceDesc', },
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
            <Divider type="vertical"/>
            <Popconfirm
              title="Are you sure？"
              icon={<Icon type="question-circle-o" style={{ color: 'red' }} />}
              onConfirm = {() => this.handleDeleteResource(record)}
            >
              <a
                href="#"
              >
                删除
            </a>
            </Popconfirm>

          </div>
        ),
      }
    ];

    const standardProp = {
      rowKey: 'id',
      // loading,
      dataSource: resourceData,
      columns
    };
    return <Table {...standardProp} />
  }

  handleAddResource = fields => {
    fields.menuId = this.state.selectRecord.id;
    this.props.addResource(fields, response => {
      this.fetchResourceList(this.state.selectRecord.id);
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

  handleModifiedResource = fields => {
    this.props.modifiedResource(fields, response => {
      this.fetchResourceList(this.state.selectRecord.id);
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

  handleDeleteResource = fields => {
    this.props.deletedResource(fields, response => {
      this.fetchResourceList(this.state.selectRecord.id);
      if (response.success) {
        message.success('删除成功', 1, () => { });
      } else {
        message.warning(response.message, 1, () => { });
      }
    });
  }

  handleModalVisible = (flag, title, resourceRecord = {}) => {
    // title = title || this.state.title;

    this.setState({
      title: title,
      resourceRecord: resourceRecord,
      modalVisible: !!flag,
    });
  };

  render() {
    const { modalVisible, selectRecord, applicationOptions, resourceRecord } = this.state;
    const { form } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const formItemOneLineLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };

    const rightOptOps = [
      {
        id: 1,
        title: '新增菜单',
        icon: 'plus',
        handle: this.handleAdd,
      },
      {
        id: 2,
        title: '删除菜单',
        icon: 'delete',
        handle: this.handleDelele,
      },
    ];

    const treeOptOps = {
      treeNodeDatas: this.state.treeNodeDatas,
      selectedKeys: this.state.selectedKeys,
      saveParentState: this.saveParentState,
      selectTreeRecord: this.selectTreeRecord,
    };

    const crateFormProps = {
      modalVisible,
      handleModal: this.handleModalVisible,
      handleAdd: this.handleAddResource,
      handleModified: this.handleModifiedResource,
      record: resourceRecord,
    }

    return (
      <div>
        <Col span={6}>
          <div>
            <Card style={{ 'overflow': "scroll", height: '800px' }}>
              <Row>
                <Select style={{ width: '100%' }} showSearch onChange={this.changeAppSelected}
                  filterOption={(input, option) =>
                    option.props.children.indexOf(input) >= 0
                  }>
                  {applicationOptions}
                </Select>
              </Row>
              <Row>
                <LeftTree {...treeOptOps} />
              </Row>
            </Card>
          </div>
        </Col>
        
        <Col span={18}>
          <Row >
            {!!this.state.selectRecord.id ? (<Form>
              <Card title="菜单信息" className={styles.card} extra={
                <FormItem style={{ height: 20 }}><Button type="primary" htmlType="submit" onClick={this.menuSaveHandle}>保存</Button></FormItem>
              }
              >
                <Row>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="菜单名称：">
                      {form.getFieldDecorator('menuName', {
                        initialValue: selectRecord.menuName,
                        rules: [
                          {
                            required: true,
                            message: '请输入菜单名称',
                          },
                        ],
                      })(<Input placeholder="菜单名称" />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="菜单图标：">
                      {form.getFieldDecorator('icon', {
                        initialValue: selectRecord.icon,
                      })(<Input placeholder="菜单图标" />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="资源路径：">
                      {form.getFieldDecorator('path', {
                        initialValue: selectRecord.path,
                        rules: [
                          {
                            required: true,
                            message: '请输入资源路径',
                          },
                        ],
                      })(<Input placeholder="资源路径" />)}
                    </FormItem>
                  </Col>
                  <Col span={12}>
                    <FormItem {...formItemLayout} label="转发路径：">
                      {form.getFieldDecorator('redirectPath', {
                        initialValue: selectRecord.redirectPath,
                      })(<Input placeholder="转发路径" />)}
                    </FormItem>
                  </Col>
                  <Col span={24}>
                    <FormItem {...formItemOneLineLayout} label="扩展属性：">
                      {form.getFieldDecorator('extendPropeties', {
                        initialValue: selectRecord.extendPropeties,
                      })(<Input.TextArea rows={3} />)}
                    </FormItem>
                  </Col>
                </Row>
              </Card>
            </Form>) : ""}
          </Row>

          <Row>
            {!!this.state.selectRecord.id ? (<Card title="资源信息" className={styles.card} extra={
              <Button type="primary" icon="plus" onClick={() => this.handleModalVisible(true)}>添加资源</Button>}
            >
              {this.renderResourceTable()}
            </Card>) : ""}
          </Row>
        </Col>
        <RightOptList menuList={rightOptOps} />
        <CreateResourceForm {...crateFormProps} />
      </div>
    );
  }
}

export default Menu;
