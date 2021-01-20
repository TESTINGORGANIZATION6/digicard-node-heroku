const sgMail = require('@sendgrid/mail');

/** email helper class */
class emailHelper {
    /**
     * @param {String} to [receiver email address] 
     */
    constructor(to) {
        this.to = to;
    }

    /**
     * send email to user
     */
    async sendEmail(subject, html) {
        try {
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            const msg = {
                to: this.to,
                from: process.env.FROMEMAIL,
                subject,
                html,
            };
            if (msg.to === undefined) {
                throw 'Receiver email in not defined'
            }
            await sgMail.send(msg)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

module.exports = emailHelper;