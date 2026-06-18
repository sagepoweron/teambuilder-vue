<script setup lang="ts">
	import Navigation from "./components/Navigation.vue";
	import Footer from "./components/Footer.vue";
	import { RouterView } from "vue-router";
	import CompareListPanel from "./components/CompareListPanel.vue";

</script>

<template>
	<div>
		<Navigation></Navigation>
		<CompareListPanel></CompareListPanel>
	</div>
	<RouterView></RouterView>
	<Footer></Footer>
</template>