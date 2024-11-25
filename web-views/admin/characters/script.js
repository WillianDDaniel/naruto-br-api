const app = Vue.createApp({
  data() {
    return {
      characters: [],
    }
  },
  methods: {
    async logout() {
      const response = await fetch('/auth/logout', { method: 'DELETE' })
      if (response.ok) window.location.href = '/login';
    },
    async getAllCharacters() {
      const response = await fetch('/characters');
      try {
        if (response.ok) this.characters = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.getAllCharacters();
  }
});
app.mount('#app');