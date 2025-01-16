const app = Vue.createApp({
  data() {
    return {
      id: '',
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
      const response = await fetch('/auth/logout', { method: 'DELETE' });
      if (response.ok) window.location.href = '/login';
    },
    async getJutsu() {
      this.id = new URLSearchParams(window.location.search).get('id');
      const response = await fetch('/jutsus/' + this.id);
      try {
        if (response.ok) {
          const jutsu = await response.json();
          this.name = jutsu.name;
          this.type = jutsu.type;
          this.power = jutsu.power;
          this.description = jutsu.description;
          this.character_id = jutsu.character_id;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async updateJutsu() {
      const response = await fetch('/jutsus/' + this.id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          type: this.type,
          power: this.power,
          description: this.description,
        }),
      });
      try {
        const data = await response.json();
        if (response.ok) {
          console.log('Jutsu atualizado com sucesso:', data);
          window.location.href = '/admin/characters';
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async getCharacter() {
      if (!this.character_id) return;
      const response = await fetch('/characters/' + this.character_id);
      try {
        if (response.ok) {
          this.character = await response.json();
        } else {
          console.error("Erro ao buscar personagem:", response.statusText);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async created() {
    await this.getJutsu();
    await this.getCharacter();
  }
});
app.mount('#app');
