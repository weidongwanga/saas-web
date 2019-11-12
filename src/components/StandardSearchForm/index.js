import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { Row, Col, Form, Input, Select, Button, DatePicker, Icon } from 'antd';
import PropTypes from 'prop-types';
import styles from './index.less';
import chunk from 'lodash/chunk';

const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class StandardSearchForm extends PureComponent {
  static propTypes = {
    formItems: PropTypes.array.isRequired,
    onSearch: PropTypes.func,
    otherBtnArray: PropTypes.array,
  };

  static defaultProps = {
    formItems: [],
    otherBtnArray: [],
    onSearch() {},
  };

  constructor() {
    super();
    this.state = {
      expandForm: false
    };
  }

  type2Element = formItem => {
    const type = formItem.type.toLowerCase();
    switch (type) {
      case 'input':
        return <Input placeholder="请输入" style={{ width: '100%' }} />;
        break;
      case 'select':
        return (
          <Select placeholder="请选择" style={{ width: '100%' }} {...formItem.restProps}>
            {formItem.list &&
              formItem.list.map((v, i) => (
                <Option key={i} value={v.value}>
                  {v.name}
                </Option>
              ))}
            {formItem.options}
          </Select>
        );
        break;
      case 'datepicker':
        return (
          <DatePicker
            style={{ width: '100%' }}
            format={formItem.formate || 'YYYY-MM-DD HH:mm:ss'}
            disabledDate={formItem.disabledDate}
            disabledTime={formItem.disabledDateTime}
            showTime={{ defaultValue: formItem.defaultValue || moment('00:00:00', 'HH:mm:ss') }}
          />
        );
        break;
      case 'other':
        return formItem.value;
        break;
      default:
        return (
          <span>
            暂不支持
            {type}
            类型
          </span>
        );
    }
  };

  renderFormItem = (formItem) => {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        sm: { span: 8 },
        md: { span: 5 },
      },
      wrapperCol: {
        sm: { span: 22 },
        md: { span: 14 },
      },
    };

    const colItem = (
      <Col md={8} sm={24} key={formItem.name}>
        <FormItem label={formItem.label} {...formItemLayout}>
          {getFieldDecorator(formItem.name)(this.type2Element(formItem))}
        </FormItem>
      </Col>
    );
    return colItem;
  };

  renderRow = () => {
    const { formItems, otherBtnArray = [] } = this.props;
    const { expandForm } = this.state;
    const formItemsTemp = expandForm? formItems : formItems.slice(0,3);
    return chunk(formItemsTemp, 3).map((element, i) => (
        <Row gutter={{ md: 8, lg: 24, xl: 48 }} key={i}>
          { element.map(item => {
            return this.renderFormItem(item)
            } )}
            {formItems.length < 3 && (
              <Col md={8} sm={24}>
              <div style={{ overflow: '' }}>
                <div style={{ float: 'left', marginBottom: 24 }}>
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                    重置
                  </Button>
                  {otherBtnArray}
                </div>
              </div>
            </Col>
            )}
        </Row>
    ));
  };


  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
  };

  toggleForm = () => {
    const {expandForm} = this.state;
    console.log(this);
    this.setState({
      expandForm: !expandForm,
    },() => {
       console.log('expandForm', expandForm);
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { onSearch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;
      onSearch(fieldsValue);
    });
  };

  render() {
    const { formItems, otherBtnArray = [] } = this.props;
    const { expandForm } = this.state;

    return (
      <Form onSubmit={this.handleSearch} className={styles.baseForm} layout="inline">
        {this.renderRow()}
        {formItems.length > 2 && (
            <div style={{ float: 'right', marginBottom: 24 }}>
                <Button type="primary" htmlType="submit">
                  查询
                </Button>
                <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                  重置
                </Button>
                {otherBtnArray}
                <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                  {expandForm && (<Icon type="up" />)}
                  {!expandForm && (<Icon type="down" />)}
                </a>
              </div>
          )}
      </Form>
    );
  }
}

export default StandardSearchForm;
