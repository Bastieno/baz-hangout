module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Connection has been established')
    socket.on('meetup/postSave', (post) => {
      io.emit('meetup/postPublished', post)
    })
  })
}
