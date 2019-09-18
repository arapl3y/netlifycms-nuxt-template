import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  projects: [],
  about: []
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getProjects')
    await dispatch('getAbout')
  },
  async getProjects({ state, commit }) {
    const files = await require.context('~/content/projects/', false, /\.json$/)

    const projects = files.keys().map((key) => ({
      ...files(key),
      _path: `/projects/${key.replace('.json', '').replace('./', '')}`
    }))

    commit('SET_PROJECTS', projects)
  },
  async getAbout({ state, commit }) {
    const files = await require.context('~/content/about/', false, /\.json$/)

    const about = files.keys().map((key) => ({
      ...files(key),
      _path: `/projects/${key.replace('.json', '').replace('./', '')}`
    }))

    commit('SET_ABOUT', about.reverse())
  }
}

export const mutations = {
  SET_PROJECTS(state, posts) {
    state.projects = posts
  },
  SET_ABOUT(state, data) {
    state.about = data
  }
}

export const getters = {
  getProjects(state) {
    return state.projects
  },
  getOtherRandomProject: (state) => (slug) => {
    if (state.projects.length === 1) {
      return state.projectPosts[0]
    }

    let random = Math.floor(Math.random() * state.projects.length)

    // Keep finding a new random number until slugs don't match
    while (state.projects[random]._path.split('/')[2] === slug) {
      random = Math.floor(Math.random() * state.projects.length)
    }

    return state.projects[random]
  }
}
