<template>
	<div>
		<b-container>
			<b-row>
				<b-col></b-col>
				<b-container align-v="center" class="w-75 container">
					<div class="mt-5">
						<b-card-group deck class="mb-1">
							<b-card
								class="standard-subscription-module"
								border-variant="primary"
								header="Standard"
								header-bg-variant="primary"
								header-text-variant="white"
								align="center"
								title="$20/month"
								tag="article"
								style="max-width: auto"
							>
								<b-card-text>
									Get access to new courses, labs, and guides as soon
									as they launch!
								</b-card-text>
								<b-list-group flush>
									<b-list-group-item>
										<b-icon-check-circle
											class="h5 mr-2 mb-0 mt-0"
											variant="success"
										></b-icon-check-circle>
										Expert-made software development courses
									</b-list-group-item>
									<b-list-group-item>
										<b-icon-check-circle
											class="h5 mr-2 mb-0 mt-0"
											variant="success"
										></b-icon-check-circle>
										Access to live software engineering workshops
									</b-list-group-item>
									<b-list-group-item>
										<b-icon-check-circle
											class="h5 mr-2 mb-0 mt-0"
											variant="success"
										></b-icon-check-circle>
										Real-world development environments
									</b-list-group-item>
									<b-list-group-item>
										<b-icon-check-circle
											class="h5 mr-2 mb-0 mt-0"
											variant="success"
										></b-icon-check-circle>
										Moonrise Labs Discord community member areas
									</b-list-group-item>
									<b-list-group-item>
										<b-icon-check-circle
											class="h5 mr-2 mb-0 mt-0"
											variant="success"
										></b-icon-check-circle>
										First access to new releases and features
									</b-list-group-item>
								</b-list-group>
								<br />
								<b-button
									v-if="!userIsSubscriber"
									variant="primary"
									class="checkout-btn"
									href="javascript:void(0)"
									@click="openCheckout"
								>
									Checkout
								</b-button>
								<router-link to="/profile" v-if="userIsSubscriber">
									<b-button v-if="userIsSubscriber" variant="primary">
										Update your subscription
									</b-button>
								</router-link>
								<br />
							</b-card>
						</b-card-group>
					</div>
				</b-container>
				<b-col></b-col>
			</b-row>
		</b-container>
		<b-modal id="checkout-error" ok-only title="Error with Checkout">
			<p class="my-4">
				There's been an error with checkout. Please contact support to help
				get it resolved.
			</p>
		</b-modal>
	</div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

const chargebeeSite = "moonriselabs-test";
const moonriseApiBaseUrl = "https://dev-api.moonriselabs.com/v1";
const axiosClient = axios.create({ baseURL: moonriseApiBaseUrl });

export default {
	components: {},
	data() {
		return {
			userIsSubscriber: false,
		};
	},
	async mounted() {
		const token = await this.getToken();
		console.log("token is set");
		console.log(token);
		this.setUserAsSubscriberIfTokenHasCorrectPermissions(token);
		console.log("user might be set");

		this.cbInstance = window.Chargebee.init({
			site: chargebeeSite,
		});
	},
	methods: {
		setUserAsSubscriberIfTokenHasCorrectPermissions(token) {
			console.log("token");
			var decoded = jwt_decode(token);
			console.log("decoded");
			var permissions = decoded["permissions"];
			console.log("permissions");
			if (permissions.includes("access:standard")) {
				this.userIsSubscriber = true;
			}
		},
		raiseCheckoutErrorNotification() {
			this.$bvModal.show("checkout-error");
		},
		async getToken() {
			const token = await this.$auth0.getAccessTokenSilently();
			return token;
		},
		async openCheckout() {
			const token = await this.getToken();
			this.cbInstance.openCheckout({
				hostedPage: () => {
					// Hit your end point that returns hosted page object as response
					// This sample end point will call the below api
					// You can pass hosted page object created as a result of checkout_new, checkout_existing, manage_payment_sources
					// https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_new_subscription
					// https://apidocs.chargebee.com/docs/api/hosted_pages#checkout_existing_subscription
					// https://apidocs.chargebee.com/docs/api/hosted_pages#manage_payment_sources
					// If you want to use paypal, go cardless and plaid, pass embed parameter as false
					return axiosClient
						.get("/chargebee-checkout-new", {
							headers: {
								Authorization: `Bearer ${token}`,
							},
						})
						.then((response) => response.data)
						.catch((error) => {
							/* eslint-disable no-console */
							console.log(error);
							/* eslint-enable no-console */
							this.raiseCheckoutErrorNotification();
						});
				},
				loaded: function () {
					// Checkout opened here
				},
				close: function () {
					// Checkout closed here
				},
				success: function (hostedPageId) {
					/* eslint-disable no-console */
					console.log(hostedPageId);
					/* eslint-enable no-console */
					// Hosted page id will be unique token for the checkout that happened
					// You can pass this hosted page id to your backend
					// and then call our retrieve hosted page api to get subscription details
					// https://apidocs.chargebee.com/docs/api/hosted_pages#retrieve_a_hosted_page
				},
				step: function (value) {
					// value -> which step in checkout
					/* eslint-disable no-console */
					console.log(value);
					/* eslint-enable no-console */
				},
			});
		},

		openPortal() {
			this.cbInstance.createChargebeePortal().open({
				loaded: () => {},
				close: () => {},
				paymentSourceAdd: (status) => {
					/* eslint-disable no-console */
					console.log("payment source add" + status);
					/* eslint-enable no-console */
				},
				paymentSourceUpdate: (status) => {
					/* eslint-disable no-console */
					console.log("payment source update" + status);
					/* eslint-enable no-console */
				},
				paymentSourceRemove: (status) => {
					/* eslint-disable no-console */
					console.log("payment source removed" + status);
					/* eslint-enable no-console */
				},
			});
		},
		submit() {
			// You will be redirected to Stripe's secure checkout page
			this.$refs.checkoutRef.redirectToCheckout();
		},
		selectSession() {},
	},
};
</script>

<style>
.card {
	border: 1px solid #8d87ff !important;
}

.list-group-item {
	border: 0px !important;
}
</style>