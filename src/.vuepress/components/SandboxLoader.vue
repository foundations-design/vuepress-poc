<template>
   <div class="get-environment-container">
      <b-button
         block
         variant="primary"
         @click="createEnvironment()"
         v-if="!sandboxDetails.loaded"
         :disabled="isCurrentlyCreatingSandbox"
         class="get-environment-btn btn-primary"
      >
         <b-spinner small v-if="isCurrentlyCreatingSandbox"></b-spinner>
         {{ button.text }}
      </b-button>
      <b-card
         v-if="sandboxDetails.loaded"
         class="sandbox-details"
         header="Your Environment Details:"
         header-tag="header"
         :footer="sandboxDetails.title"
         footer-tag="footer"
         :title="sandboxDetails.title"
      >
         <b-card-text
            >Environment Resource Names:
            {{ sandboxDetails.username }}</b-card-text
         >
         <b-card-text>{{ sandboxDetails.azure_container_url }}</b-card-text>
         <b-card-text
            >Note: This environment will only last for <strong>2 hours</strong>.
            Your time starts... NOW!</b-card-text
         >
         <b-card-text>{{ timeRemaining }}</b-card-text>
         <b-button
            class="open-environment-btn"
            @click="openUrlInNewTab(sandboxDetails.azure_container_url)"
            variant="primary"
            >OPEN ENVIRONMENT</b-button
         >
      </b-card>
   </div>
</template>

<script>
import moment from "moment";
import axios from "axios";
import axiosRetry from "axios-retry";

const moonriseApiBaseUrl = envVar.VUE_APP_API_BASE_ENDPOINT;
const axiosRetryClient = axios.create({ baseURL: moonriseApiBaseUrl });
const axiosNoRetryClient = axios.create({ baseURL: moonriseApiBaseUrl });

axiosRetry(axiosRetryClient, {
   retries: 7,
   retryDelay: (retryCount) => {
      if (retryCount == 1) {
         // Initial wait time 3 seconds (sometimes it's ready real fast)
         return 1000 * 3;
      } else {
         // Otherwise, just wait 1 minute at a time
         return 1000 * 60;
      }
   },
   retryCondition: (error) => {
      // Retry 404 when the sandbox isn't ready yet
      return error.response.status === 404;
      // Otherwise, the API will return 500 when some
      // race condition in the Sandbox maker messed it up
   },
});

export default {
   name: "SandboxLoader",
   props: {
      sandboxType: String,
   },
   data() {
      return {
         sandboxDetails: {
            assignment_time: "",
            sandbox_status: "",
            loaded: false,
            azure_container_url: "",
            sandbox_type: "",
            username: "REPLACE_ME",
         },
         isCurrentlyCreatingSandbox: false,
         button: {
            text: "GET ENVIRONMENT DETAILS",
         },
         info: null,
         timeRemaining: "",
      };
   },
   mounted: function () {
      setInterval(() => {
         this.timeRemaining = this.calculateTimeRemaing();
      }, 1000);
   },
   methods: {
      updateUsername(username) {
         this.$emit("update-username", username);
      },
      getLocalExpiryTime() {
         var localExpiryTime = moment
            .utc(
               this.sandboxDetails.assignment_time,
               "YYYY-MM-DD HH:mm:ss.SSSSSS"
            )
            .add(2, "hours")
            .local()
            .format("MMMM Do YYYY, h:mm:ss a");
         return localExpiryTime;
      },
      calculateTimeRemaing() {
         if (this.sandboxDetails.assignment_time != "") {
            var expiryTime = moment
               .utc(this.sandboxDetails.assignment_time)
               .add(2, "hours");
            var timeRemaining = expiryTime.subtract(moment());
            var timeRemainingExplaination =
               "You have " +
               timeRemaining.get("hours") +
               " hours, " +
               timeRemaining.get("minutes") +
               " minutes, and " +
               timeRemaining.get("seconds") +
               " seconds remaining.";
            if (timeRemaining <= 0) {
               return "The sandbox has expired. In a few minutes you can refresh the page and create a new one.";
            } else {
               return timeRemainingExplaination;
            }
         } else {
            return "The countdown will begin shortly...";
         }
      },
      openUrlInNewTab(url) {
         window.open(url, "_blank");
      },
      async createEnvironment() {
         // Update UI to show we're working in it
         this.isCurrentlyCreatingSandbox = true;
         this.button.text = "Creating Environment...";
         // Initial request to create the environment (or get one if it's available)
         const token = await this.$auth0.getAccessTokenSilently();

         // Use Axios to make a call to the API
         const createSandboxData = await axiosNoRetryClient.get(
            "/sandbox?sandbox_type=" + this.sandboxType,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         this.sandboxDetails.sandbox_status =
            createSandboxData.data.sandbox_status;
         if (this.sandboxDetails.sandbox_status == "assigned") {
            this.sandboxDetails.azure_container_url =
               createSandboxData.data.azure_container_url;
            this.sandboxDetails.sandbox_type =
               createSandboxData.data.sandbox_type;
            this.sandboxDetails.username = createSandboxData.data.username;
            this.updateUsername(this.sandboxDetails.username);
            this.sandboxDetails.assignment_time =
               createSandboxData.data.assignment_time;
            this.sandboxDetails.loaded = true;
            this.isCurrentlyCreatingSandbox = false;
         }

         if (this.sandboxDetails.sandbox_status == "warming_assigned") {
            // Checkback loop... Use /check-sandbox
            const checkSandboxData = await axiosRetryClient.get(
               "/check-sandbox",
               {
                  headers: {
                     Authorization: `Bearer ${token}`,
                  },
               }
            );
            this.sandboxDetails.azure_container_url =
               checkSandboxData.data.azure_container_url;
            this.sandboxDetails.sandbox_type =
               checkSandboxData.data.sandbox_type;
            this.sandboxDetails.username = checkSandboxData.data.username;
            this.updateUsername(this.sandboxDetails.username);
            this.sandboxDetails.assignment_time =
               createSandboxData.data.assignment_time;
            this.sandboxDetails.loaded = true;
            this.isCurrentlyCreatingSandbox = false;
         }
      },
   },
};
</script> 
