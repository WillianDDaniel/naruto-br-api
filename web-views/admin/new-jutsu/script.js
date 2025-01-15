const app = Vue.createApp({
  data() {
    return {
      name: '',
      type: '',
      power: '',
      description: '',
      character: {},
      character_id: '',
    }
  },
  methods: {
    async logout() {
      const response = await fetch('/auth/logout', { method: 'DELETE' })
      if (response.ok) window.location.href = '/login';
    },
    async getCharacter() {
      this.character_id = new URLSearchParams(window.location.search).get('id');
      const response = await fetch('/characters/' + this.character_id);
      try {
        if (response.ok) this.character = await response.json();
      } catch (error) {
        console.error(error);
      }
    },
    async createJutsu() {
      const response = await fetch('/jutsus', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          character_id: this.character_id,
          type: this.type,
          power: this.power,
          description: this.description
        })
      });
      const data = await response.json();
      try {
        if (response.ok) {
          console.log('Jutsu criado com sucesso:', data);
          window.location.href = '/admin/characters';
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    }
  },
  created() {
    this.getCharacter();
  }
});
app.mount('#app');