const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { expect } = chai;

chai.use(chaiHttp);
chai.should();

describe('Email case', () => {
    beforeEach(() => {
        process.env.SENDGRID_API_KEY = 'SG.asasasa'
        process.env.FROMEMAIL = 'noreply@example.com'
    })

    it('should send email', done => {
        chai.request(app)
            .post('/api/v1/sendemail')
            .set('content-type', 'application/json')
            .send({ to: 'user@example.com' })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.text).to.equals('{"message":"email sent"}')
                done();
            })
    })

    it('should not send email if receiver email address is not present', done => {
        chai.request(app)
            .post('/api/v1/sendemail')
            .set('content-type', 'application/json')
            .end((err, res) => {
                res.should.have.status(400);
                expect(res.text).to.equals('{"error":"error occurred"}')
                done();
            })
    })

})