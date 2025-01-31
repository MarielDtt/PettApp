import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email", // Usando Ethereal para pruebas
    port: 587,
    secure: false,  // true si usas el puerto 465, false si usas otros puertos
    auth: {
     user: 'grady.fritsch@ethereal.email',
     pass: 'FSQTkrFqYqtAwnZhzG'
    },
    tls: {
        rejectUnauthorized: false,  // Ignora los errores de certificado
      },
  });

  export const sendEmail = async (to: string, subject: string, text: string, html: string) => {
    const mailOptions = await transporter.sendMail({
      from: '"PetAPP" <grady.fritsch@ethereal.email>',
      to,
      subject,  // Asunto
      text: "Este es un correo de prueba.",  // Cuerpo del correo en texto plano
      html: "<b>Este es un correo de prueba.</b>",  // Cuerpo del correo en HTML
    });
   
    {
      // Enviar el correo
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);
    } 
}


  