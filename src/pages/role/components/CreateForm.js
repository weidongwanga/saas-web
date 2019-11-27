import { Form, Modal, Input, Select, Checkbox } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;


const CreateForm = Form.create()((props) => {
  const { title, record = {}, modalVisible, form, handleAdd, handleModal, handleModified, parentRecord={}, applicationOptions} = props;

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
          {applicationOptions}
        </Select>)}
      </FormItem>
      <FormItem {...formItemLayout} label="角色描述：">
        {form.getFieldDecorator('roleDesc', {
          initialValue: record.roleDesc,
        })(<TextArea placeholder="角色描述" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
