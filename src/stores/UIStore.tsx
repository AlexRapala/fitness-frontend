import {action, observable } from 'mobx';


class UIStore {

    @observable selectedKeys: Array<string> = [];

    @action
    setSelectedKeys(keys: Array<string>): void {
        this.selectedKeys = keys;
    }
}

export default new UIStore();