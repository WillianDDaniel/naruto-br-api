const app = Vue.createApp({
  data() {
    return {
      character: {
        village: { id: null, name: '' },
      },
      characters: [],
      villages: [],
    }
  },
  methods: {
    async logout() {
      console.log('Logout');
      const response = await fetch('/auth/logout', { method: 'DELETE' })
      if (response.ok) window.location.href = '/login';
    },
    async getCharacter() {
      const id = new URLSearchParams(window.location.search).get('id');
      if (!id) window.location.href = '/admin/characters';
      const response = await fetch(`/characters/${id}`);
      try {
        if (response.ok) {
          this.character = await response.json();
        } else {
          window.location.href = '/admin/characters';
        }
      } catch (error) {
        console.error(error);
        window.location.href = '/admin/characters';
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
    async updateCharacter() {
      const response = await fetch(`/characters/${this.character.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.character)
      });
      const data = await response.json();
      try {
        if (response.ok) {
          console.log('Personagem atualizado com sucesso:', data);
          window.location.href = `/admin/character/?id=${this.character.id}`;
        } else {
          console.error(data.error);
        }
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
    this.getAllVillages();
    this.getAllCharacters();
    this.getCharacter();
  },
});
app.mount('#app');