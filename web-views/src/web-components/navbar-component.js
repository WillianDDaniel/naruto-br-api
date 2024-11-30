class NavbarComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <nav class="bg-orange-600 shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between h-16">
            <div class="flex items-center">
              <span id='logo' class="text-white text-xl font-bold cursor-pointer">
                Naruto BR API
              </span>
            </div>
            <div class="flex items-center">
              <!-- O botão mantém o mesmo comportamento -->
              <button class="text-white hover:bg-orange-700 px-3 py-2 rounded-md">
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>
    `;

    const logoutButton = this.querySelector('button');
    logoutButton.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('logout'));
    });

    const logo = this.querySelector('#logo');
    logo.addEventListener('click', () => {
      window.location.href = '/admin';
    });
  }
}
customElements.define('navbar-component', NavbarComponent);
