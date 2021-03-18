<template>
  <svg
    :class="className"
    xmlns="http://www.w3.org/2000/svg"
    v-if="iconPath != ''"
  >
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script>
export default {
  name: "svg-icon",

  props: {
    name: {
      type: String,
      required: true
    },

    title: {
      type: String,
      default: null
    }
  },

  data() {
    return {
      iconPath: ""
    };
  },

  async created() {
    const icon = await import(`@/assets/icons/svg/${this.name}.svg`);
    this.iconPath = icon.default;
  },
  computed: {
    className() {
      return "svg-icon svg-icon--" + this.name;
    }
  }
};
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
