<template>
	<div class="slwct">
		<SandboxLoader
			@update-username="onUpdateUsername"
			sandboxType="python_basic"
		/>
		<div class="custom-text" ref="inputText" v-if="!updatedText">
			<slot></slot>
		</div>
		<div v-else v-html="updatedText"></div>
	</div>
</template>

<script>
import SandboxLoader from "./SandboxLoader.vue";
export default {
	data() {
		return {
			text: null,
			updatedText: null,
		};
	},
	mounted() {
		this.text = this.$refs.inputText.innerHTML;
	},
	methods: {
		onUpdateUsername(username) {
			this.updatedText = this.text.replace("TABLE_NAME_VARIABLE", username);
			console.log(this.updatedText);
		},
	},
	components: {
		SandboxLoader,
	},
};
</script>

<style lang="sass" scoped>
.slwct
   margin: 2rem
</style>