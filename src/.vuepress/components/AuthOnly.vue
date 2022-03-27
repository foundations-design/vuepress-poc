<template>
	<div class="main-content" v-if="user">
		<slot></slot>
	</div>
</template>



<script>
export default {
	data: function () {
		return {
			user: this.$auth0.user,
		};
	},
};
</script>