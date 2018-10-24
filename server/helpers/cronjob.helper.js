const CronJob = require('cron').CronJob
const sgMail = require('@sendgrid/mail')

module.exports = function sendEmail(email) {
  new CronJob('59 23 31 12 5 *', function() {
    sgMail.setApiKey('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')
    const msg = {
        to: email,
        from: 'amisalsabila18@gmail.com',
        subject: 'Halooo',
        text: 'I hope you write back',
        html: '<p>Please read or wrire in your account Question Overflow for help people in this world</p>',
    }
    sgMail.send(msg)
  }, null, true, 'Asia/Jakarta');
}
