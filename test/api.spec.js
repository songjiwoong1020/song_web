const should = require('should');
const request = require('supertest');
const app = require('../app.js');

describe('POST /api/main', () => {
    it('게시글 상위 5개 짤라서 보여줌', (done) => {
        request(app)
            .post('/api/main')
            .expect(200)
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });
});

describe('POST /api/board/write', () => {
    it('POST /api/board/write 게시글 작성', (done) => {
        request(app)
            .post('/api/board/write')
            .send({title: 'test_title'})
            .send({content: 'test_content'})
            .send({user_nick: 'test_nick'})
            .expect(201)
            .end((err, res) => {
                if(err) throw err;
                done();
            });
    });
});