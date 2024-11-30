const app = Vue.createApp({
  data() {
    return {
      character: {},
      characters: [],
      villages: null
    };
  },

  methods: {
    async logout() {
      const response = await fetch('/auth/logout', { method: 'DELETE' })
      if (response.ok) window.location.href = '/login';
    },
    async createCharacter() {
      const response = await fetch('/characters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.character)
      });
      const data = await response.json();
      try {

        if (response.ok) {
          console.log('Personagem criado com sucesso:', data);
          window.location.href = '/admin/characters';
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getAllCharacters() {
      const response = await fetch('/characters');
      try {
        if (response.ok) this.characters = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async getAllVillages() {
      const response = await fetch('/villages')
      try {
        if(response.ok) {
          this.villages = await response.json()
        }
      } catch (error) {
        console.error(error)
      }
    }
  },

  created() {
    this.getAllCharacters();
    this.getAllVillages();
  }
});
app.mount('#app');