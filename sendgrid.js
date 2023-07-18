

import sgMail from '@sendgrid/mail'

sgMail.setApiKey("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")
const msg = {
  to: 'kitsune.akvma@gmail.com', // Change to your recipient
  from: 'mateusz.r.martin@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail.send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })