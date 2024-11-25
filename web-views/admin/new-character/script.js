const app = Vue.createApp({
  data() {
    return {
      name: '',
      father: '',
      mother: '',
      village: '',
      rank: '',
      power: '',
      profile_image: '',
      summary: '',
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
        body: JSON.stringify({
          name: this.name,
          father: this.father,
          mother: this.mother,
          village: this.village,
          rank: this.rank,
          power: this.power,
          profile_image: this.profile_image,
          summary: this.summary,
        })
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
  },
});
app.mount('#app');