var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var userList = [];
var userData = [];
var userId = [];
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket) => {
    console.log('一个新的连接')
    changeUserList();
    var userName = '';

    


    socket.on('login', (data, callback) => {
        if(data.name.trim().length === 0) {
            io.emit('checkoutName', {id: data.id, str: '名称不能为空'});
            return;
        }
        if(userList.indexOf(data.name) != -1) {
            io.emit('checkoutName', {id: data.id, str: '名称已存在'});
            return;
        }
        if(userId.indexOf)
        userName = data.name;
        userList.push(userName);
        userData.push({name: userName, id: data.id})
        
        changeUserList();
        callback();
    })

    socket.on('sendMsg', message => {

        io.emit('onput', {name: userName, mgs: message})
    })




    socket.on('disconnect', () => {
        console.log('连接断开')
        var userIndex = userList.indexOf(userName)
        userList.splice(userIndex, 1);
        userData.splice(userIndex, 1);
        changeUserList();
    })
})

function changeUserList() {
    io.emit('changeUserList', userData)
}

http.listen(80, () => {
    console.log('监听5000端口')
})


