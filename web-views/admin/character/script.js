const app = Vue.createApp({
  data() {
    return {
      character: {},
      image: {},
    }
  },
  methods: {
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
    async deleteCharacter() {
      const response = await fetch(`/characters/${this.character.id}`, { method: 'DELETE' });
      const data = await response.json();
      try {
        if (response.ok) {
          console.log('Personagem excluido com sucesso:', data);
          window.location.href = '/admin/characters';
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async createImage() {
      this.image.character_id = this.character.id

      const response = await fetch('/character-images', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.image)
      })

      const data = await response.json();
      try {
        if (response.ok) {
          console.log('Imagem criada com sucesso:', data);
          window.location.href = `/admin/character/?id=${this.character.id}`;
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
    async deleteImage(image) {
      const response = await fetch(`/character-images/${image.id}`, { method: 'DELETE' });
      const data = await response.json();
      try {
        if (response.ok) {
          console.log('Imagem excluida com sucesso:', data);
          window.location.href = `/admin/character/?id=${this.character.id}`;
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  async mounted() {
    await this.getCharacter()
    document.title = `${this.character.name} - Naruto BR API`
  }
}).mount('#app');