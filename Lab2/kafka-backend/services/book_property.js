// exports.handle_request = handle_request;
var booking = require('../../Backend/models/booking');
require('../../Backend/mongoose.js');
var jwt = require('jsonwebtoken');

function handle_request(msg, callback){
    var res = {};
    console.log("In handle request for Book_Property:"+ JSON.stringify(msg));
   

    /*if(msg.username == "bhavan@b.com" && msg.password =="a"){
        res.code = "200";
        res.value = "Success Login";

    }
    else{
        res.code = "401";
        res.value = "Failed Login";
    }
    callback(null, res);*/
   

    var booking_start=new Date(msg.start);
    var booking_end=new Date(msg.end);
    var prop_start=new Date(msg.prop_start);
    var prop_end=new Date(msg.prop_end);

    console.log(booking_start);
    if((booking_start < msg.prop_start )|| (booking_end > msg.prop_end)){
      res.writeHead(202, {
          'Content-Type': 'text/plain'
      })
      res.end("Booking Collision");
    }else{
        console.log("else");
        var id=msg.property_id;
        booking.find({property_id:id}).then((docs)=>{
            let temp=JSON.stringify(docs);
            temp=JSON.parse(temp);
            console.log("temp",temp);
            if(temp.length!=0){
            for(var i=0;i<temp.length;i++){
              let tempStartDate = new Date(temp[i].start);
              let tempEndDate=new Date(temp[i].end);
              console.log(typeof(tempStartDate));
              if((booking_start >= tempStartDate && booking_end <= tempEndDate)||(booking_start <= tempStartDate && booking_end <= tempEndDate && booking_end>=tempStartDate)||(booking_start >= tempStartDate && booking_end >= tempEndDate && booking_start<=tempEndDate)){
                  callback(null,[]);//201
                  break;
              }
              else{
                  var book=new booking({
                      property_id:msg.property_id,
                      start:booking_start,
                      end:booking_end,
                      owner:msg.username,
                      traveler:msg.traveler,
                      

                  })

                  book.save().then((doc)=>{
                      console.log("df",doc);
                      callback(null,doc);

                  })
              }}
            }else{
              var bo=new booking({
                  property_id:msg.property_id,
                  start:booking_start,
                  end:booking_end,
                  owner:msg.username,
                  traveler:msg.traveler

              })

              bo.save().then((doc)=>{
                callback(null,doc);

              })
            }

        })
    }


}

exports.handle_request = handle_request;

