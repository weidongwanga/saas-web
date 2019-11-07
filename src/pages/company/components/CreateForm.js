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
      <FormItem {...formItemLayout} label="公司编码：">
        {form.getFieldDecorator('companyCode', {
          initialValue: record.companyCode,
          rules: [
            {
              required: true,
              message: '请输入公司编码',
            },
          ],
        })(<Input disabled={!!record.id} placeholder="公司编码" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="公司名称：">
        {form.getFieldDecorator('companyName', {
          initialValue: record.companyName,
          rules: [{ required: true, message: '请输入公司名称：' }],
        })(<Input disabled={!!record.id} placeholder="公司名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="公司别名">
        {form.getFieldDecorator('companyDisName', {
          initialValue: record.companyDisName,
          rules: [{ required: true, message: '请输入公司别名：' }],
        })(<Input disabled={!!record.id} placeholder="公司别名" />)}
      </FormItem>

      <FormItem {...formItemLayout} label="企业法人：">
        {form.getFieldDecorator('companyLegal', {
          initialValue: record.companyLegal,
          rules: [
            {
              required: true,
              message: '请输入企业法人',
            },
          ],
        })(<Input placeholder="企业法人" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="公司电话：">
        {form.getFieldDecorator('companyPhone', {
          initialValue: record.companyPhone,
          rules: [
            {
              required: true,
              message: '请输入公司电话',
            },
          ],
        })(<Input placeholder="公司电话" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="公司邮箱">
        {form.getFieldDecorator('companyMail', {
          initialValue: record.companyMail,
          rules: [
            {
              required: true,
              message: '请输入公司邮箱',
            },
          ],
        })(<Input placeholder="公司邮箱" />)}
      </FormItem>
      
      <FormItem {...formItemLayout} label="公司logo">
        {form.getFieldDecorator('companyLogoUrl', {
          initialValue: record.companyLogoUrl,
        })(<Input  placeholder="公司logo地址" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="公司简介：">
        {form.getFieldDecorator('companyProfile', {
          initialValue: record.companyProfile,
          rules: [
            {
              required: true,
              message: '请输入公司简介',
            },
          ],
        })(<TextArea rows={3} placeholder="公司简介" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
