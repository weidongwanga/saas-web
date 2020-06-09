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

const CreateDetailForm = Form.create()((props) => {
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
      <FormItem {...formItemLayout} label="编码：">
        {form.getFieldDecorator('detailCode', {
          initialValue: record.detailCode,
          rules: [
            {
              required: true,
              message: '请输入编码',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="编码" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="值：">
        {form.getFieldDecorator('detailValue', {
          initialValue: record.detailValue,
          rules: [
            {
              required: true,
              message: '请输入值',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="值" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="类型：">
        {form.getFieldDecorator('detailType', {
          initialValue: record.detailType,
          rules: [
            {
              required: true,
              message: '请输入类型',
            },
          ],
        })(
        <Select style={{ width: '100%' }}  >
          <Select.Option value="number">數字</Select.Option>
          <Select.Option value="string">字符串</Select.Option>
          <Select.Option value="date">日期</Select.Option>
        </Select>
        )}
      </FormItem>
      <FormItem {...formItemLayout} label="序号：">
        {form.getFieldDecorator('sequence', {
          initialValue: record.sequence,
          rules: [
            {
              required: true,
              message: '请输入序号',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="序号" />)}
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

export default CreateDetailForm;
