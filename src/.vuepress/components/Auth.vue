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
				<p>{{ user }}</p>
			</div>
		</div>
	</div>
</template>


<script>
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