<template>
  <section class="container h-padded column v-center">
    <h2 v-html="project.title" />
    <p>{{ tags }}</p>
    <p v-html="project.description" />

    <img v-if="project.image" :src="project.image" />

    <template v-if="project.additionalDescription">
      <div v-for="(value, index) in project.additionalDescription" :key="index">
        <img v-if="value.descriptionImage" :src="value.descriptionImage" />
        <p
          v-if="value.description"
          class="description-text"
          v-html="value.description"
        />
      </div>
    </template>

    <div>
      <p>Something else to check out</p>

      <project-card :project="randomProject" />
    </div>
  </section>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue'

export default {
  name: 'ProjectProfile',
  components: {
    ProjectCard
  },
  computed: {
    tags() {
      return this.project.tags.join(' / ')
    },
    randomProjectSlug() {
      return this.randomProject._path.split('/')[2]
    },
    randomProject() {
      return this.$store.getters.getOtherRandomProject(this.$route.params.slug)
    }
  },
  async asyncData({ params, payload }) {
    if (payload) {
      return { project: payload }
    } else {
      return {
        project: await require(`~/content/projects/${params.slug}.json`)
      }
    }
  }
}
</script>

<style></style>
