import { Form, Modal, Input, Select, Checkbox } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


const CreateResourceForm = Form.create()((props) => {
  const { title, record = {}, modalVisible, form, handleAdd, handleModal, handleModified, parentRecord={}} = props;

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

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      if (record.id != null && record.id != "" && record.id != 0) {
        fieldsValue.id = record.id;
        handleModified(fieldsValue);
      } else {
        handleAdd(fieldsValue);
      }
    });
  };

  return (
    <Modal width={'50%'} title={title} visible={modalVisible} onOk={okHandle} onCancel={() => handleModal()} destroyOnClose={true}>
      <FormItem {...formItemLayout} label="名称：">
        {form.getFieldDecorator('resourceName', {
          initialValue: record.resourceName,
          rules: [
            {
              required: true,
              message: '请输入资源名称',
            },
          ],
        })(<Input placeholder="资源名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="类型：">
        {form.getFieldDecorator('resourceType', {
          initialValue: record.resourceType,
          rules: [
            {
              required: true,
              message: '请输入资源类型',
            },
          ],
        })(<Select style={{ width: '100%' }} showSearch 
        filterOption={(input, option) =>
          option.props.children.indexOf(input) >= 0
        }
      >
        <Select.Option value="button" key="button">按钮</Select.Option>
        <Select.Option value="URI" key="URI">URI</Select.Option>
        <Select.Option value="OTHER" key="OTHER">其他</Select.Option>
      </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="方法类型：">
        {form.getFieldDecorator('resourceMethod', {
          initialValue: record.resourceMethod,
        })(<Select style={{ width: '100%' }} showSearch 
          filterOption={(input, option) =>
            option.props.children.indexOf(input) >= 0
          }
        >
          <Select.Option key="GET" name="GET">GET</Select.Option>
          <Select.Option key="POST" name="POST">POST</Select.Option>
          <Select.Option key="PUT" name="PUT">PUT</Select.Option>
          <Select.Option key="DELETE" name="DELETE">DELETE</Select.Option>
        </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="值：">
        {form.getFieldDecorator('resourceValue', {
          initialValue: record.resourceValue,
          rules: [
            {
              required: false,
              message: '请输入资源的值',
            },
          ],
        })(<Input placeholder="值" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述：">
        {form.getFieldDecorator('resourceDesc', {
          initialValue: record.resourceDesc,
        })(<TextArea placeholder="描述" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateResourceForm;
