const app = Vue.createApp({
  data() {
    return {
      character: {}
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
    }
  },
  mounted() {
    this.getCharacter()
  }
}).mount('#app');