<template>
	<div v-for="(type, index) in messageTypes" :key="index" :class="['inform', type.class, theme]">
		<div :class="theme === 'dark' ? 'dark-text' : 'light-text'">
			<div class="icon">ⓘ</div>
			{{ type.message }}
		</div>
	</div>
</template>

<script setup lang="ts">
const props = defineProps({});
</script>

<style lang="scss" scoped>
.inform {
	position: relative;
	display: flex;
	align-items: center;
	padding: 10px 30px 10px 40px;
	border-radius: 8px;
	font-family: Arial, sans-serif;
	max-width: fit-content;
	word-wrap: break-word;
	font-size: 23px;
	font-family: sans-serif;
	height: 40px;

	.icon {
		display: flex;
		position: absolute;
		transform: rotate(180deg);
		left: 10px;
		height: 30px;
	}

	&.inform--success {
		background-color: #e0fde7;
		color: #2a9b44;
	}

	&.dark {
		background-color: #7de17d;
		color: #1c6e1c;
	}

	&.inform--warning {
		background-color: #f9ebd8;
		color: #d77417;

		&.dark {
			background-color: #fcbe91;
			color: #9b5a17;
		}
	}

	&.inform--error {
		background-color: #f2dee0;
		color: #db1428;

		&.dark {
			background-color: #e58d8d;
			color: #db1428;
		}
	}

	&.inform--info {
		background-color: #e3e3ff;
		color: #1052ec;

		&.dark {
			background-color: #c3c8f2;
			color: #1a1fa1;
		}
	}

	&.inform--default {
		background-color: #cecece;
		color: #000;

		&.dark {
			background-color: #a6a6a6;
			color: #ffffff;
		}
	}
}
</style>
