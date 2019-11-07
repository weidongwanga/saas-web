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
  const { title, record = {}, parentId = 0, modalVisible, form, handleAdd, handleModal, handleModified, applicationData, selectOptionHandle, configDataArray, clusterArray, selectClusterHandle, brokerArray } = props;

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
        fieldsValue.parentId = parentId;
        handleAdd(fieldsValue);
      }
    });
  };
  return (
    <Modal width={'50%'} title={title} visible={modalVisible} onOk={okHandle} onCancel={() => handleModal()} destroyOnClose={true}>
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
          initialValue: record.orgLevel,
        })(<Input placeholder="所在层级" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
