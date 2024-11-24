const { createApp } = Vue

createApp({
  data() {
    return {
      message: ''
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