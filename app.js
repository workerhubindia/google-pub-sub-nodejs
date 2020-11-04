require('dotenv').config();
	
const {PubSub} = require(`@google-cloud/pubsub`);
  

  
const pubsub = new PubSub();


function PublishMessages(){

    // In this example, the message is current time
	
  const data = new Date().toString();
	
  const dataBuffer = Buffer.from(data);
	
  const topicName = 'topic1';
	
  

  pubsub.topic(topicName).publish(dataBuffer).then(messageId => {
	
      console.log(`Message ${messageId} published.`);
	
    })
	
    .catch(err => {
	
      console.error('ERROR:', err);
	
    });

}


  
  

function PullMessages(){
    const subscriptionName = 'topic1Subs';
	
    const timeout = 60;
      
    
      
    const subscription = pubsub.subscription(subscriptionName);
      
    
      
    let messageCount = 0;
      
    
      
    /**
      
     * Handler for received message.
      
     * @param {Object} message
      
     */
      
    const messageHandler = message => {
      
      console.log(`Received message ${message.id}:`);
      
      console.log(`Data: ${message.data}`);
      
      console.log(`tAttributes: ${message.attributes}`);
      
      messageCount += 1;
      
    
      
      // Ack the messae
      
      message.ack();
      
    };
      
    
      
    // Listen for new messages until timeout is hit
      
    subscription.on(`message`, messageHandler);
      
    setTimeout(() => {
      
      subscription.removeListener('message', messageHandler);
      
      console.log(`${messageCount} message(s) received.`);
      
    }, timeout * 1000);
}



function PushMessage(){
    router.post('/google-cloud-pubsub-subscriber', (req, res) => {
	
        const message = req.body ? req.body.message : null;
        
      
        
        if (message) {
        
          const buffer = Buffer.from(message.data, 'base64');
        
          const data = buffer ? buffer.toString() : null;
        
     
        
          console.log(`Received message ${message.messageId}:`);
        
          console.log(`Data: ${data}`);
        
        }
        
      
        
        return res.send(204);
        
      });
}

for(var i=0;i<100;i++){
    PublishMessages();
    setTimeout(() => {   }, 2000);
}

setTimeout(() => {  console.log("Waiting"); }, 20000);

PullMessages();

  