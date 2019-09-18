<template>
  <nuxt-link
    :to="{ name: 'projects-slug', params: { slug: slug } }"
    tag="div"
    class="cell card column v-center"
  >
    <img :src="project.image" />

    <p>{{ project.title }}</p>
    <p>{{ tags }}</p>
  </nuxt-link>
</template>

<script>
export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    slug() {
      return this.project._path.split('/')[2]
    },
    tags() {
      return this.project.tags.join(' / ')
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  max-width: 40rem;

  img {
    max-width: 30rem;
  }
}
</style>
