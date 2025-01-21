const { Resend } = require('resend');
require('dotenv').config();

async function sendTwoFactorEmail(destination, code) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (process.env.NODE_ENV === 'test') {
      console.log(`Enviando e-mail para: ${destination}`);
      console.log(`Código de autenticação: ${code}`);
      return;
    }

    await resend.emails.send({
      from: 'Naruto BR API <nao-responda@naruto-br-api.site>',
      to: destination,
      subject: 'Código de Autenticação 2FA - Naruto BR API',
      html: `<p>Seu codigo de autenticação é: <strong>${code}</strong></p>`,
    });

    console.log('E-mail enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
  }
}

module.exports = sendTwoFactorEmail;
