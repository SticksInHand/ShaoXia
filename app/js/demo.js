const $ = require('jquery');
const {ipcRenderer} = require('electron');

$('#test-send').click(function(){
    ipcRenderer.send('sendMessageToIndex',$('#test').text());
});
