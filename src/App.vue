<script setup lang="ts">
	import Navigation from "./components/Navigation.vue";
	import Footer from "./components/Footer.vue";
	import { RouterView } from "vue-router";

</script>

<template>
	<Navigation></Navigation>
	<RouterView></RouterView>
	<Footer></Footer>
</template>