const app = Vue.createApp({
  methods: {
    async logout() {
      const response = await fetch('/auth/logout', { method: 'DELETE' })
      if (response.ok) window.location.href = '/login';
    }
  },
});
app.mount('#app');