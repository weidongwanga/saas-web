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
      { record.id ? "": (<FormItem {...formItemLayout} label="登录账号：">
        {form.getFieldDecorator('loginAccount', {
          initialValue: record.loginAccount,
          rules: [
            {
              required: true,
              message: '请输入登录账号',
            },
          ],
        })(<Input placeholder="登录账号" />)}
      </FormItem>) }

      <FormItem {...formItemLayout} label="用户名称：">
        {form.getFieldDecorator('userName', {
          initialValue: record.userName,
          rules: [{ 
            required: true, 
            message: '请输入用户名称：' 
          }],
        })(<Input placeholder="用户名称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="用户昵称：">
        {form.getFieldDecorator('userNickName', {
          initialValue: record.userNickName,
          rules: [{ 
            required: true, 
            message: '请输入用户昵称：' 
          }],
        })(<Input placeholder="用户昵称" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="英文名：">
        {form.getFieldDecorator('userEnName', {
          initialValue: record.userEnName,
          rules: [{ 
            required: true, 
            message: '请输入英文名：：' 
          }],
        })(<Input placeholder="英文名：" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="电话：">
        {form.getFieldDecorator('userPhone', {
          initialValue: record.userPhone,
          rules: [{ 
            pattern: '400[0-9]{7}|^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$|^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$',
            required: true, 
            message: '请正确输入电话' 
          }],
        })(<Input placeholder="电话" />)}
      </FormItem>
      <FormItem {...formItemLayout} label="邮箱：">
        {form.getFieldDecorator('userMail', {
          initialValue: record.userMail,
          rules: [{ 
            required: true, 
            message: '请输入邮箱',
            type: 'email',
          }],
        })(<Input placeholder="邮箱" />)}
      </FormItem>
    </Modal>
  );
});

export default CreateForm;
