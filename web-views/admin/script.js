const app = Vue.createApp({
  data() {
    return {
      authenticated: false,
      loginForm: {
        username: '',
        password: ''
      },
      loginError: '',
      characterForm: {
        name: '',
        village: '',
        rank: '',
        jutsus: '',
        description: ''
      },
      characterError: ''
    }
  },
  methods: {
    async login() {
      try {
        const response = await fetch('/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        });

        if (response.ok) {
          this.authenticated = true;
          this.loginError = '';
        } else {
          this.loginError = 'Email ou senha inválidos';
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        this.loginError = 'Erro ao conectar com o servidor';
      }
    },
    logout() {
      this.authenticated = false;
      this.loginForm = {
        username: '',
        password: ''
      };
    },
    async addCharacter() {
      try {
        const jutsusArray = this.characterForm.jutsus
          .split(',')
          .map(jutsu => jutsu.trim())
          .filter(jutsu => jutsu);

        const characterData = {
          ...this.characterForm,
          jutsus: jutsusArray
        };

        const response = await fetch('/characters', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(characterData)
        });

        if (response.ok) {
          // Limpar o formulário após sucesso
          this.characterForm = {
            name: '',
            village: '',
            rank: '',
            jutsus: '',
            description: ''
          };
          this.characterError = '';
          alert('Personagem adicionado com sucesso!');
        } else {
          this.characterError = 'Erro ao adicionar personagem';
        }
      } catch (error) {
        console.error('Erro ao adicionar personagem:', error);
        this.characterError = 'Erro ao conectar com o servidor';
      }
    }
  },
  async created() {
    try {
      const response = await fetch('/auth');
      if (response.ok) {
        this.authenticated = true;
      }
    } catch (error) {
      console.error(error);
    }
  }
}).mount('#app')