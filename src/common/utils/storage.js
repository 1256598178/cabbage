const Util = require('./utils');
const storage = weex.requireModule('storage')
const modal = weex.requireModule('modal')
let AIstorage = {
    // 存入到手机储存中
    setItems(obj) {
        for (var item in obj) {
            storage.setItem(item, obj[item], event => {
                console.log('set success')
            })
        }
    },
    // 获取
    getItems(obj) {
        let arr = '';
        storage.getItem(obj.value, event => {
            arr = event.data;
            obj.callback(arr);
        })
        return arr;
    },
    // getItems(obj) {
    //     let arr = {};
    //     for(var i = 0; i < arguments.length; i++){
    //         arr[arguments[i]] = storage.getItem(arguments[i], event => {
    //             arr[arguments[i]] = event.data;
    //             console.log(arr)
    //         })
    //     }
    //     return arr;
    // },
    // 移除
    removeItem(name) {
        storage.removeItem(name, event => {
            console.log('delete value:', event.data)
            this.state = 'deleted'
        })
    },
    // 全部移除
    getAll() {
        storage.getAllKeys(event => {
            // modal.toast({ message: event.result })
            if (event.result === 'success') {
                modal.toast({
                    message: 'props: ' + event.data.join(', ')
                })
            }
        })
    }
}
export default AIstorage;