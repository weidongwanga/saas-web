import { contextMenu } from 'react-contexify';

export default {
    showOpt(event, menuId) {
        contextMenu.show({id: menuId,
        event: event,
        })
    }
}