<template>
   <div class="main-content" v-if="user">
      <div>
         <h3>Name: {{ user.name }}</h3>
         <h3>Email: {{ user.email }}</h3>
         <h3>Photo:</h3>
         <img :src="user.picture" style="max-width: 100px" />
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
};
</script>