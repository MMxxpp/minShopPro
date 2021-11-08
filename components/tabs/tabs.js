// components/tabs/tabs.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs:{
            type:Array,
            value:[]
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        selectIndex(e){
            // console.log(e);
            let {index} =e.currentTarget.dataset;

            //触发父组件（自定义）
            this.triggerEvent('tabsTurn',{index})
            // let {tabs}=this.tabs;
            // tabs.forEach((item,i) => {
            //     i===index?item.isActive=true:item.isActive=false;
            // });

            // this.setData({
            //     tabs
            // })
        }
    }
})
