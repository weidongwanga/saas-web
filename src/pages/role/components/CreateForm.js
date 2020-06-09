import { Form, Modal, Input, Select, Col } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

const Option = Select.Option;

const renderOptions = (data) => {
  if (!data || data.length == 0) {
    return;
  }
  return data.map((item, index) => (
    <Option key={index} value={item.value}>
      {item.name}
    </Option>
  ));
};

const CreateForm = Form.create()((props) => {
  const { title, record = {}, modalVisible, form, handleAdd, handleModal, handleModified, parentRecord = {}, applicationData } = props;

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
      <div>
        <FormItem {...formItemLayout} label="角色名稱：">
          {form.getFieldDecorator('roleName', {
            initialValue: record.roleName,
            rules: [
              {
                required: true,
                message: '请输入角色名稱',
              },
            ],
          })(<Input disabled={!!record.id} placeholder="角色名稱" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="所屬項目：">
          {form.getFieldDecorator('applicationId', {
            initialValue: record.applicationId,
            rules: [
              {
                required: true,
                message: '请输選擇項目',
              },
            ],
          })(<Select style={{ width: '100%' }} showSearch
            filterOption={(input, option) =>
              option.props.children.indexOf(input) >= 0
            }
          >
            {renderOptions(applicationData)}
          </Select>)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色描述：">
          {form.getFieldDecorator('roleDesc', {
            initialValue: record.roleDesc,
          })(<TextArea placeholder="角色描述" />)}
        </FormItem>
        </div>
    </Modal>
  );
});

export default CreateForm;
