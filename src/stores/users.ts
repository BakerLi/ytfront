// src/stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '訪客',
    isLoggedIn: false,
  }),
  actions: {
    login(name: string) {
      this.name = name
      this.isLoggedIn = true
    },
    logout() {
      this.name = '訪客'
      this.isLoggedIn = false
    },
  },
})
