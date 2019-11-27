import { PureComponent } from 'react';
import { Select } from 'antd';
import { connect } from 'dva';


const Option = Select.Option;

const APPLICATION = 'application';

const mapStateToProps = state => {
    const application = state[APPLICATION];
    return {
        data: application.data,
        loading: state.loading.effects[`${APPLICATION}/fetch`],
    };
}

const mapDispatchToProps = dispatch => {
    return {
        fetch(params, callback) {
            const action = {
                type: `${APPLICATION}/list`,
                payload: params,
                callback,
            };
            dispatch(action);
        }
    }
}

@connect(
    mapStateToProps,
    mapDispatchToProps
)
class ApplicationSelect extends PureComponent {

    state = {
        options: [],
    }

    componentDidMount() {
        const params = {}
        this.handleSearch();
    }

    handleSearch = (formValues = {}) => {
        const params = {
            ...formValues,
        };

        this.props.fetch(params, response => {
            if (response.success) {
                this.renderOptions(response.data);
            }
        });
    }


    renderOptions = data => {
        if (!data || data.length == 0) {
            return;
        }
        const options = data.map((item, index) => (
            <Option key={item.id} value={item.applicationName}>
                {item.id}-{item.applicationName}
            </Option>
        ));

        this.setState({
            options: [...options],
        });
    };


    render() {
        const {options} = this.state;
        return (
            <Select style={{ width: '100%' }}>
                {options}
            </Select>
        )
    }
}

export default ApplicationSelect;

