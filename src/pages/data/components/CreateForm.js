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
  const { title, record = {}, modalVisible, form, handleAdd, handleModal, handleModified, applicationData, selectOptionHandle, configDataArray, clusterArray, selectClusterHandle, brokerArray } = props;

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
    <Modal width={'40%'} title={title} visible={modalVisible} onOk={okHandle} onCancel={() => handleModal()} destroyOnClose={true}>
      <FormItem {...formItemLayout} label="数据组名：">
        {form.getFieldDecorator('dataName', {
          initialValue: record.dataName,
          rules: [
            {
              required: true,
              message: '请输入数据组名',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="数据组名" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="描述：">
        {form.getFieldDecorator('dataDesc', {
          initialValue: record.dataDesc,
          rules: [
            {
              required: true,
              message: '请输入描述',
            },
          ],
        })(<TextArea rows={3} placeholder="描述" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
