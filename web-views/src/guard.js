(async function() {
  try {
    const response = await fetch('/auth');
    if (!response.ok) {
      window.location.href = '/login';
    } else  {
      console.log('Usuário autenticado');
    }
  } catch (error) {
    console.error(error);
  }
})()