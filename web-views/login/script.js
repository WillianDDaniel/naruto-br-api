const app = Vue.createApp({
  data() {
    return {
      username: '',
      password: '',
      code: '',
      insertCodeInput: false,
      timeRemaining: 0,
      timerInterval: null,
      notifications: [],
      notificationId: 0
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
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        });

        if (response.ok) {
          this.insertCodeInput = true;
          this.startTimer();
          this.showNotification('Código enviado para seu email!', 'success');
        } else {
          this.showNotification('Usuário ou senha inválidos', 'error');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        this.showNotification('Erro ao conectar com o servidor', 'error');
      }
    },

    async insertCode() {
      try {
        const response = await fetch('/auth/verify2fa', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: this.username,
            code: this.code
          })
        });

        if (response.ok) {
          this.showNotification('Código verificado com sucesso!', 'success');
          setTimeout(() => {
            window.location.href = '/admin';
          }, 1000);
        } else {
          this.showNotification('Código inválido', 'error');
        }
      } catch (error) {
        console.error('Erro ao verificar código:', error);
        this.showNotification('Erro ao verificar código', 'error');
      }
    },

    async resendCode() {
      try {
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
          this.startTimer();
          this.showNotification('Novo código enviado!', 'success');
        } else {
          this.showNotification('Erro ao reenviar código', 'error');
        }
      } catch (error) {
        console.error('Erro ao reenviar código:', error);
        this.showNotification('Erro ao conectar com o servidor', 'error');
      }
    },

    goToCodeInput() {
      if (this.username) {
        this.insertCodeInput = true;
      } else {
        this.showNotification('Por favor, insira seu usuário primeiro', 'warning');
      }
    },

    startTimer() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }

      this.timeRemaining = 10 * 60;

      this.timerInterval = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
        } else {
          clearInterval(this.timerInterval);
          this.showNotification('O código expirou. Por favor, solicite um novo.', 'warning');
        }
      }, 1000);
    },

    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    },

    showNotification(message, type = 'info') {
      const notification = {
        id: this.notificationId++,
        message,
        type
      };

      this.notifications.push(notification);

      setTimeout(() => {
        this.notifications = this.notifications.filter(n => n.id !== notification.id);
      }, 5000);
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
      this.showNotification('Erro ao verificar autenticação', 'error');
    }
  },

  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}).mount('#app');