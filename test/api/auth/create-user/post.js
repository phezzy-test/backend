/* eslint-disable no-undef */
const { expect } = require('chai');
const request = require('supertest');
const fs = require('fs');
const path = require('path');
const app = require('../../../../app');

describe('POST /auth/create-user', () => {
  after((done) => {
    done();
  });

  it('Should create new employee account', (done) => {
    request(app).post('/auth/create-user')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDY1IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE1NzMwNTQ4MTl9.2EieT2jgSDnCyr-yfw67slT4eva0rJBE_4PtwGo1tDQ')
      .field('gender', 'male')
      .field('firstName', 'test')
      .field('lastName', 'fisayo')
      .field('jobRole', 'j1003')
      .field('department', 'd1002')
      .field('password', '12345678')
      .field('address', 'noo 30 street')
      .field('email', 'test1@gmail.com')
      .attach('passport', fs.readFileSync(path.resolve(__dirname, '../../../../samples/image.jpg')), 'image.jpg')
      .then((res) => {
        const { body } = res;
        expect(body).to.contain.property('status').to.equal('success');
        expect(body).to.contain.property('data');
        expect(body.data).to.contain.property('message');
        expect(body.data).to.contain.property('token');
        expect(body.data).to.contain.property('userId');
        done();
      })
      .catch((error) => done(error));
  }).timeout(6000);

  it('Should fail when user is not an admin', (done) => {
    request(app).post('/auth/create-user')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMDY3IiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImlhdCI6MTU3MzA1NTI3Nn0.sULoduLHtSnIVA_NP5YZ5_3UyvRCOIzcsPrd5ATeQQs')
      .field('gender', 'male')
      .field('firstName', 'test2 which shouldnt be here')
      .field('lastName', 'fisayo')
      .field('jobRole', 'j1003')
      .field('department', 'd1002')
      .field('password', '12345678')
      .field('address', 'noo 30 street')
      .field('email', 'test2@gmail.com')
      .attach('passport', fs.readFileSync(path.resolve(__dirname, '../../../../samples/image.jpg')), 'image.jpg')
      .then((res) => {
        const { body } = res;
        expect(body).to.contain.property('status').to.equal('error');
        expect(body).to.contain.property('error');
        done();
      })
      .catch((error) => done(error));
  }).timeout(6000);
});
