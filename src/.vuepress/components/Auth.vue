<template>
	<div class="home">
		<div>
			<!-- show login when not authenticated -->
			<div v-if="!user">
				<button @click="login">Log in</button>
			</div>
			<!-- show logout when authenticated -->
			<div v-else>
				<button @click="logout">Log out</button>
			</div>
		</div>
	</div>
</template>


<script>
console.log(env.VUE_APP_CHARGEBEE_SITE);
console.log(env.VUE_APP_API_BASE_ENDPOINT);
console.log(env.VUE_APP_MUX_DATA_ENV_KEY);

export default {
	data: function () {
		return {
			user: this.$auth0.user,
		};
	},
	methods: {
		login() {
			this.$auth0.loginWithRedirect();
		},
		logout() {
			this.$auth0.logout({ returnTo: window.location.origin });
		},
	},
};
</script>