const CronJob = require('cron').CronJob
const sgMail = require('@sendgrid/mail')
const Question = require('../models/question.model')

module.exports = {
    sendmail:function(email) {
      new CronJob('59 23 31 12 5 *', function() {
        sgMail.setApiKey('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')
        const msg = {
            to: email,
            from: 'randhania93@gmail.com',
            subject: 'Halooo',
            text: 'I hope you write back',
            html: '<p>Please read or wrire in your account Question Overflow for help people in this world</p>',
        }
        sgMail.send(msg)
      }, null, true, 'Asia/Jakarta');
    }
,
    sendarticle:function(val){
        new CronJob('1 5 10 * * *',function(){
          Question.find().populate('owner').
          then((data)=>{
            for(var i=0;i<data.length;i++){
              console.log(data[i].vote.length)
              if(data[i].vote.length==3)
              {
                console.log(data[i].owner.email)
                sgMail.setApiKey('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')
                const msg = {
                    to: data[i].owner.email,
                    from: 'randhania93@gmail.com',
                    subject: 'Halooo',
                    text: 'I hope you write back',
                    html: '<p>Your Question is Quietly Popular in Question Overflow , Keep Spirit , Keep Posting</p>',
                }
                sgMail.send(msg)
              }
              else if(data[i].unvote.length>10){
                sgMail.setApiKey('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')
                const msg = {
                    to: data[i].owner.email,
                    from: 'randhania93@gmail.com',
                    subject: 'Halooo',
                    text: 'I hope you write back',
                    html: '<p>You Feel Clueless to Write Question that have quality , learn more quickly</p>',
                }
                sgMail.send(msg)
              }
            }
          })
          .then((err)=>{
            console.log(err)
          })
        }, null, true, 'Asia/Jakarta')
    }
}
