<script setup lang="ts">
	import Navigation from "./components/Navigation.vue";
	import Footer from "./components/Footer.vue";
	import { RouterView } from "vue-router";

</script>

<template>
	<div>
		<Navigation></Navigation>
	</div>
	<RouterView></RouterView>
	<Footer></Footer>
</template>