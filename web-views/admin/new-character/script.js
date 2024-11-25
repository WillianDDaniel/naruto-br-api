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
    logout() {
      alert('Você foi deslogado!');
      console.log('Logout executado.');
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