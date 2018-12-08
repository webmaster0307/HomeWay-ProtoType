var assert = require("assert");
var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://13.56.67.245:3001");


// Test case- 0 - register
// Get Request all trips
it("test should return trip for a particular property_id", function(done) {
    server
      .get("/getlisting")
      .query({property_id:"5bcfddbe48dd87801f518f67"})
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Test case-1 -traveler login
  it("should validate traveler with given credentials", function(done) {
    server
      .post("/travelerlogin")
      .send({"emailaddress": "ug@gmail.com", "password": "4044" })
      
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });


  //Test-Case 3 --owner-signup

  it("should add new owner to backend", function(done) {
    server
      .post("/ownersignup")
      .send({
        emailaddress: "uyh55t@gmail.com",
        password: "4444",
        firstName: "vijay",
        lastName: "durg"
        
      })
      .expect("Content-type", /plain/)
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //Test case-4 --fetchproperties

  it("should fetch properties for given search criteria", function(done) {
    server
      .get("/fetchproperties")
      .query({
        start: "2018-10-05",
        end: "2018-10-15",
        guests: "2",
        location: "Sa"
      })
      .expect("Content-type", /json/)
      .expect(200)
      .end(function(err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });

  //test case-5--Book property

   it("should book property for given search criteria", function(done) {
    server
       .post("/bookproperty")
       .send({
        start: "2018-10-05",
        end: "2018-10-28",
         guests: "1",
  
        owner:"ug@gmail.com",
            traveler:"dr@gmail.com",
        property_id:"5bdf8d5ec353fa6106bffce4"

       })
       .expect("Content-type", /plain/)
      .expect(200)
     .end(function(err, res) {
         console.log("Status: ", res.status);
         res.status.should.equal(200);
         done();
      });
   });
