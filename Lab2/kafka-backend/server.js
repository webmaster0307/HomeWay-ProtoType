var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Traveler_Sign_Up=require('./services/traveler_sign_up.js')
var Owner_Sign_Up=require('./services/owner_sign_up.js')
var Traveler = require('./services/traveler.js');
var Owner = require('./services/owner.js');
var Get_Traveler_Profile=require('./services/get_traveler_profile.js')
var Get_Owner_Profile=require('./services/get_owner_profile.js')
var Add_Traveler_Profile=require('./services/add_traveler_profile.js')
var Add_Owner_Profile=require('./services/add_owner_profile.js')
var Search_Properties=require('./services/search_properties.js')
var Details_View=require('./services/details_view.js')
var Book_property=require('./services/book_property.js')
var My_Trips=require('./services/my_trips.js')
var My_Properties=require('./services/my_properties')
var Property_Travelers=require('./services/property_travelers')
var Post_Property=require('./services/post_property')
var Post_Question=require('./services/postquestion')
var Get_Owner_Messages=require('./services/getownermessages')
var Get_Traveler_Messages=require('./services/gettravelermessages')
var Reply_To_Message=require('./services/replytomessage')
function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(message);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("traveler_login",Traveler)
handleTopicRequest("owner_login",Owner)
handleTopicRequest("get_traveler_profile",Get_Traveler_Profile)
handleTopicRequest("get_owner_profile",Get_Owner_Profile)
handleTopicRequest("add_traveler_profile",Add_Traveler_Profile)
handleTopicRequest("add_owner_profile",Add_Owner_Profile)
handleTopicRequest("search_properties",Search_Properties)
handleTopicRequest("details_view",Details_View)
handleTopicRequest("book_property",Book_property)
handleTopicRequest("my_trips",My_Trips)
handleTopicRequest("my_properties",My_Properties)
handleTopicRequest("property_travelers",Property_Travelers)
handleTopicRequest("post_property",Post_Property)
handleTopicRequest("traveler_sign_up",Traveler_Sign_Up)
handleTopicRequest("owner_sign_up",Owner_Sign_Up)
handleTopicRequest("post_question",Post_Question)
handleTopicRequest("get_owner_messages",Get_Owner_Messages)
handleTopicRequest("get_traveler_messages",Get_Traveler_Messages)
handleTopicRequest("reply_to_message",Reply_To_Message)
