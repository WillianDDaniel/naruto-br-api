const { createApp } = Vue

createApp({
  data() {
    return {
      message: '',
      currentYear: new Date().getFullYear()
    }
  },
  methods: {
    scrollToDoc() {
      document.getElementById('docs').scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
}).mount('#app')