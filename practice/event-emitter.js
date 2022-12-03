const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('chanwoo', (args) => {
    console.log('first callback -', args);
});

emitter.on('chanwoo', (args) => {
    console.log('second callback -', args);
});

emitter.emit('chanwoo', {message: 1});
emitter.emit('chanwoo', {message: 2});
emitter.emit('chanwoo', {message: 3});
