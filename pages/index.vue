<template>
  <section class="container h-padded horizontal v-center">
    <template v-for="project in projects">
      <project-card :key="project.title" :project="project" />
    </template>
  </section>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'Index',
  components: {
    ProjectCard
  },
  computed: {
    projects() {
      return this.$store.getters.getProjects
    }
  }
}
</script>

<style></style>
