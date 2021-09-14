const { expect } = require('chai');
const request = require('supertest');

let chai = require('chai');
let chaiHttp = require('chai-http');

let server = require("../app");
var app = request.agent(server);
const Post = require('../models/post');

// Assertion style
chai.should();

chai.use(chaiHttp);

let postId = "";

describe("Post API", function () {
      /**
      * Test POST
      */
    describe("POST /feed/post", function () {
        it("Post a post", function () {
            app.post("/feed/post").send({
                title: "Post for testing!",
                content: "Content of post for testing!",
                creator: {name: 'Testing'},
            }).end((error, response) => {
                response.should.have.status(200);
                expect(response.body.message).to.equal("Post created successfully!");
            })
        });
    });

     /**
      * Test DELETE
      */
    //   describe("DELETE request", function() {
    //     before("Finding a post", async function() {
    //         let post = await Post.findOne({title: 'Post for testing!'});
    //         postId = post._id.toString();
    //     })
    //     describe("Deleting a post", async function() {
    //         let result = null;
    //         before(async function() {
    //             result = await app.delete(`/feed/post/${postId}`);
    //             console.log("result: ", result.body);
    //         });
    //         it("Should delete the post successfully", function(done) {
    //             expect(result.body.message).to.equal('Post is successfully deleted.');
    //             done();
    //         })
    //     })
    // })

    describe('DELETE /feed/post/:postId', () => {
        it('it should DELETE a post given the id', (done) => {
            let post = new Post({title: "Testing delete API", content: "Testing delete API content", creator: {name: 'Testing'}})
            post.save((err, post) => {
                  chai.request(server)
                  .delete('/feed/post/' + post._id)
                  .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('Post is successfully deleted.');
                    done();
                  });
            });
        });
    });

      /**
      * Test GET
      */
    describe("GET /feed/posts", function () {
        it("Get all posts", function () {
            app.get("/feed/posts").end((error, response) => {
                response.should.have.status(200);
                expect(response.body.message).to.equal("Fetched posts successfully.");
            })
        });
    });

    /**
      * Test PUT
      */

    describe("PUT /feed/post/:postId", function() {
        before("Finding a post", async function() {
            let post = await Post.findOne({title: 'Post for testing!'});
            postId = post._id.toString();
        })
        describe("Edit a post", async function() {
            let result = null;
            before(async function() {
                result = await app.put(`/feed/post/${postId}`)
                .send({
                    title: "Edit post for testing",
                    content: "Edit content for testing"
                })
            });
            it("Should edit the post successfully", function(done) {
                expect(result.body.message).to.equal('Post updated!');
                done();
            })
        })
    })
})

