const sgMail = require('@sendgrid/mail');

/** email helper class */
class emailHelper {
    /**
     * @param {String} to [receiver email address] 
     */
    constructor(to) {
        this.to = to;
        this.website = 'https://www.hexovo.com'
    }

    /**
     * send email to user
     */
    sendEmail() {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: this.to,
                from: process.env.FROMEMAIL,
                subject: 'Your PDF is ready',
                html: `Please download your PDF. Please visit us at <a href='${this.website}'>hexovo</a>`,
            };
            if (msg.to === undefined) {
                throw 'Receiver email in not defined'
            }
            sgMail.send(msg)
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = emailHelper;