const app = Vue.createApp({
  data() {
    return {
      characters: [],
      filteredCharacters: [],
      search: null
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
    filterCharacters() {
      this.filteredCharacters = this.characters.filter((character) => {
        if (!this.search || this.search === '') return this.characters;
        return character.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    }
  },
  async created() {
    await this.getAllCharacters();
    this.filterCharacters();
  },
  watch: {
    search() {
      this.filterCharacters();
    }
  }
});
app.mount('#app');