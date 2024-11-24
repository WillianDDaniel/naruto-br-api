const app = Vue.createApp({
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async login() {
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      if (response.ok) {
        window.location.href = '/admin';
      }
    }
  },
  async created() {
    try {
      const response = await fetch('/auth');
      if (response.ok) {
        window.location.href = '/admin';
      }
    } catch (error) {
      console.error(error);
    }
  }
}).mount('#app');