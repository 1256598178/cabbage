<template>
	<div class="class">
		<sHeader></sHeader>
		<div class="class-box">
			<div class="left-box">
				<list class="nav-list" show-scrollbar="false">
				    <cell class="cell" v-for="(num,index) in list" @click="select(index)" :key="index">
				      	<div :class="[navIndex === index ? 'panel-crt' : 'panel']">
				        	<text :class="[navIndex === index ? 'text-crt' : 'text']">{{num.title}}</text>
				      	</div>
				    </cell>
				</list>
			</div>
			<div class="right-box">
				<div class="sec-nav">
					<list class="sec-nav-list" show-scrollbar="false" scroll-direction="horizontal">
					    <cell class="cell" v-for="(nums,indexs) in pList.sNav" @click="selects(indexs)" :key="indexs">
					      	<div>
					        	<text class="">{{nums.title}}</text>
					      	</div>
					    </cell>
					</list>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    //1.先使用import导入你要在该组件中使用的子组件
    import sHeader from '../header/searchHeader.vue'
    export default {
    	data () {
    		return{
				list:[
					{
						title:'速食',
						id:1,
						urls:"../src/json/sushi.json"
					},{
						title:'冲调类',
						id:2,
						urls:"../src/json/chongtiao.json"
					},{                      
						title:'熟食',
						id:3,
						urls:"../src/json/shushi.json"
					}
				],
				pList:{},
				navIndex: 0
			}
		},
        //2.然后,在components中写入子组件
        components: {sHeader},
        methods: {
        	select(index){
        		var stream = weex.requireModule('stream');
        		var urls = this.list[index].urls;
        		var self = this;
        		this.navIndex = index;
        		//为了在内部函数能使用外部函数的this对象，要给它赋值了一个名叫self的变量。
	            stream.fetch({
	                url: urls,
	                method: 'get',
	                dataType: 'json'
	            },(res) =>{
	            	self.pList = JSON.parse(res.data);
	            	console.log(self.pList);
	            },() => {})
        	},
        },
    }
</script>

<style lang="stylus" scoped>
	.left-nav{
		width: 150px;
		height: 1px;
	}
	.nav-list{
		width: 150px;
		position: fixed;
		top: 90px;
		left: 0;
		bottom: 110px;
		background-color: rgba(246,246,246,1);
	}
	.panel {
	    height: 88px;
	    padding-top: 16px;
	    padding-bottom: 16px;
	}
	.panel-crt {
	    height: 88px;
	    padding-top: 16px;
	    padding-bottom: 16px;
	    background-color: #fff;
	}
  	.text {
    	font-size: 24px;
    	line-height: 56px;
    	text-align: center;
    	color: #333;
    	border-left-width: 8px;
	    border-left-style: solid;
	    border-left-color: rgba(115,204,0,0);
  	}
  	.text-crt {
    	font-size: 24px;
    	line-height: 56px;
    	text-align: center;
    	color: #41B883;
    	border-left-width: 8px;
	    border-left-style: solid;
	    border-left-color: rgba(115,204,0,1);
  	}
</style>