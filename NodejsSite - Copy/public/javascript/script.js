
const BASE_URL = 'http://localhost:8080';

const HTTP_REQ_HEADERS = new Headers({
"Accept": "application/json",
"Content-Type": "application/json"
});

const GET_INIT = {
method: 'GET',
credentials: 'include',
headers: HTTP_REQ_HEADERS,
mode: 'cors',
cache: 'default'
};


let getDataAsync = async (url, init = GET_INIT) => {
  
    try {    
 
    const response = await fetch(url, init);    
   
    const json = await response.json();    
     
    console.log(json);    

    return json;    
 
    } catch (err) {    
    console.log(err);    
    return err;    
    }    
    }
   
    let displayMessages = (messages) => {    
   
    const rows = messages.map(message => {  
 
    let row = `<tr>    
    <td>${message.firstName}</td>    
    <td>${message.lastName}</td>    
    <td>${message.email}</td>   
    <td>${message.message_text}</td>      
    </tr>`;    
    return row;   
    });

    document.getElementById.innerHTML = rows.join('');    
    }   
    
    let getMessageForm = () => {

        return new Message(

            // document.getElementById('_id').value, 
            
            document.getElementById('firstName').value,    
            
            document.getElementById('lastName').value,
            
            document.getElementById('email').value,
            
            document.getElementById('message_text').value,
        );
    }


    // let addOrUpdateMessage = () => {

    //     const newMessage = getMessageForm();

    //     console.log('%cNew Message: ', 'color: green', newMessage);
    // }

    let addOrUpdateMessage = async() => {

        const url = `${BASE_URL}/message`

        let httpMethod = 'POST';

        const formMessage = getMessageForm();

        console.log('%cNew Message: ', 'color: green', formMessage);

        if (formMessage._id > 0) {
            httpMethod = 'PUT';
          }
        
          const request = {
            method: httpMethod,
            headers: HTTP_REQ_HEADERS,
            credentials: 'include',
            mode: 'cors',
            body: JSON.stringify(formMessage)
          };
        
          try {

            const response = await fetch(url, request);
            const json = await response.json();
            console.log(json);

          } catch (err) {
            console.log(err);
            return err;
          }

          loadMessages();
        }
    

    let loadMessages = async () => {    
    try {    
     
    const messages = await getDataAsync(`${BASE_URL}/message`);    
    
    displayMessages(messages);    
    } 
       
    catch (err) {    
    console.log(err);    
    }    
    }    
  
    loadMessages();

    