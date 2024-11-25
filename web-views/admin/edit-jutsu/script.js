const app = Vue.createApp({
  methods: {
    logout() {
      alert('Você foi deslogado!');
      console.log('Logout executado.');
    }
  },
});
app.mount('#app');