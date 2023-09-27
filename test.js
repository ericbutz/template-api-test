process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
const {expect} = require('chai')

const host = 'https://l956n06prb.execute-api.us-east-1.amazonaws.com/dev' // process.env.DEV_HOST;

chai.use(chaiHttp);

function randStr(len) {
  var charset = "abcdefghijklmnopqrstuvwxyz";
  result="";
  for( var i=0; i < len; i++ )
      result += charset[Math.floor(Math.random() * charset.length)];
  return result
}

describe('Users', () => {
  let user;

  it('Generate user', () => {
    user = {
      username: `username${randStr(5)}`,
      name: `f${randStr(5)} l${randStr(6)}`,
      company: `Acme${randStr(6)}`
    }
  });

  it('Create new user with POST', (done) => {
    chai.request(host)
      .post('/users')
      .send(user)
      .then((res) => {
        //console.log('post res: ', res);
        //console.log('post res body: ', res.body);
        expect(res).to.have.status(200);
        expect(res.body.user.username).to.equal(user.username);
        expect(res.body.user.name).to.equal(user.name);
        done();
      })
      .catch((err) => {
        console.log('error: ', err)
      });
  });

  it('Confirm user was added with GET', (done) => {
    chai.request(host)
      .get(`/users/${user.username}`)
      .end((err, res) => {
        //console.log('res: ', res.body)
        expect(res).to.have.status(200);
        expect(res.body.user.username).to.equal(user.username);
        expect(res.body.user.name).to.equal(user.name);
        done();
      });
  });

  });