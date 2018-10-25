const hash = require('bycjwt')
const sgMail = require('@sendgrid/mail')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cron = require('../helpers/cronjob.helper').sendmail

const userSchema = new Schema({ 
    name: String,
    email: {
        type: String,
        unique : true,
        required: [true, 'Please input email'],
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'], 
        validate: {
            validator: function(v) {
                if(v.length <= 6) return false
            }
        }
    },
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    role: { type: String, default: 'member' },
    deleteAt: { type: Date, default: null},    
}, { timestamps:true });

userSchema.post('validate', function() {
    this.password = hash.bcencode(this.password)
});

    userSchema.post('save', function() {
        sgMail.setApiKey('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')
        const msg = {
            to: this.email,
            from: 'randhania93@gmail.com',
            subject: 'Success register',
            text: 'Thanks for register',
            html: '<p>Thanks for register in <strong>tulisanKu</strong></p>',
        }
        sgMail.send(msg)
        sendmail(this.email)
    });

const User = mongoose.model('User', userSchema);
module.exports = User

