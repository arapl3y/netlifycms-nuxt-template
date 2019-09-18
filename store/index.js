import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => ({
  projects: [],
  pages: []
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getProjects')
    await dispatch('getPages')
  },
  async getProjects({ state, commit }) {
    const files = await require.context('~/content/projects/', false, /\.json$/)

    const projects = files.keys().map((key) => ({
      ...files(key),
      _path: `/projects/${key.replace('.json', '').replace('./', '')}`
    }))

    commit('SET_PROJECTS', projects)
  },
  async getPages({ state, commit }) {
    const files = await require.context('~/content/pages/', false, /\.json$/)

    const pages = await files.keys().map((key) => ({
      ...files(key),
      _path: `/page/${key.replace('.json', '').replace('./', '')}`
    }))

    commit('SET_PAGES', pages)
  }
}

export const mutations = {
  SET_PROJECTS(state, posts) {
    state.projects = posts
  },
  SET_PAGES(state, pages) {
    state.pages = pages
  }
}

export const getters = {
  getPages(state) {
    return state.pages
  },
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
