<template>
	<div>
		<h2>User Profile</h2>
		<button @click="login">Log in</button>
		{{ user }}
	</div>
</template>

<script>
import { useAuth0 } from "@auth0/auth0-vue";

export default {
	setup() {
		const { loginWithRedirect, user } = useAuth0();

		return {
			login: () => {
				loginWithRedirect();
			},
			user,
		};
	},
};
</script>