import { Form, Modal, Input, Select, Checkbox } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const renderOptions = data => {
  if (!data || data.length == 0) {
    return;
  }
  const options = data.map((item, index) => (
    <Option key={index} value={item}>
      {item}
    </Option>
  ));

  return options;
};

const CreateForm = Form.create()((props) => {
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
        fieldsValue.parentId = !!parentRecord.id ? parentRecord.id : 0;
        handleAdd(fieldsValue);
      }
    });
  };

  const orgLever = !!record.orgLevel ? record.orgLevel : (!!parentRecord.orgLevel ? parentRecord.orgLevel + 1 : 1);

  return (
    <Modal width={'50%'} title={title} visible={modalVisible} onOk={okHandle} onCancel={() => handleModal()} destroyOnClose={true}>
      <FormItem {...formItemLayout} label="上级组织：">
        {form.getFieldDecorator('parentOrg', {
          initialValue: !!parentRecord.orgName ? parentRecord.orgName : '',
        })(<Input disabled />)}
      </FormItem>
      <FormItem {...formItemLayout} label="组织名称：">
        {form.getFieldDecorator('orgName', {
          initialValue: record.orgName,
          rules: [
            {
              required: true,
              message: '请输入组织名称',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="组织名称" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="组织编码：">
        {form.getFieldDecorator('orgCode', {
          initialValue: record.orgCode,
          rules: [
            {
              required: true,
              message: '请输入组织编码',
            },
          ],
        })(<Input placeholder="组织编码" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="所在层级：">
        {form.getFieldDecorator('orgLevel', {
          initialValue: orgLever,
        })(<Input readOnly placeholder="所在层级" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
