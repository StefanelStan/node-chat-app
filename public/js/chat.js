var socket = io();
/**
 * Each time we add a message scroll to bottom IF necessary
 */
function scrollToBottom(){
    //Selectors
    let messages = jQuery('#messages');
    let newMessage  = messages.children('li:last-child');
    //Heights
    let clientHeight = messages.prop('clientHeight');
    let scrollTop = messages.prop('scrollTop');
    let scrollHeight = messages.prop('scrollHeight');
    let newMessageHeight = newMessage.innerHeight();
    let lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        messages.scrollTop(scrollHeight);
    }
}


socket.on('connect', function() {
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(error){
        if(error){
            alert(error);
            window.location.href = '/';
        } else {
            console.log('No error');
        }
    });
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('updateUserList', function(users){
    //console.log('Users List', users);
    var ol = jQuery('<ol></ol>');

    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    
    jQuery('#users').html(ol);
});


socket.on('newMessage', function(newMessage){
    
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: newMessage.text,
        from: newMessage.from,
        createdAt: formatTimestamp(newMessage.createdAt)
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    // console.log('Client browser will render new message', newMessage);
    // var li = jQuery('<li></li>');
    // li.text(`From: ${newMessage.from} -> ${newMessage.text} at ${formatTimestamp(newMessage.createdAt)}`);

    // jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(newLocationMessage){
    let template = jQuery('#location-message-template').html();
    let html = Mustache.render(template, {
        url: newLocationMessage.url,
        from: newLocationMessage.from,
        createdAt: formatTimestamp(newLocationMessage.createdAt)
    });
    jQuery('#messages').append(html);
    scrollToBottom();
    
    // var li = jQuery('<li></li>');
    // var a = jQuery('<a target="_blank">My current location</a>');
    // li.text(`From: ${newLocationMessage.from}: `);
    // a.attr('href', newLocationMessage.url)
    // li.append(a);
    // li.append(` at ${formatTimestamp(newLocationMessage.createdAt)}`);
    // jQuery('#messages').append(li);
});

// socket.emit('createMessage', 
//             {from: 'Frank',text: 'Hi'}, 
//             function(status){
//                 console.log(status);
//             });
         
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    let messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: socket.id,
        text: messageTextBox.val()
    }, function(){
        messageTextBox.val('');
    });
});           

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!"geolocation" in navigator) {
        return alert('Gelocation is NOT supported by your browser!');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('locationMessage', {
            from: socket.id,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function (error) {
        alert('Unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});

function formatTimestamp(timestamp){
    return moment(timestamp).format('h:mm a');
}