<template>
  <div class="wrapper">
  	<div class="map">
  		<div class="maps"></div>
  	</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  }
}
</script>

<style lang="stylus" scoped>
.map{
	width: 100px;
	height: 100px;
	background: blue;
	.maps{
		width: 50px;
		height: 50px;
		background: red;
	}
}
</style>
