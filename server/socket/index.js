module.exports = function(io) {
  io.on('connection', (socket) => {
    console.log('Connection has been established');

    socket.on('meetup/subscribe', (meetupId) => {
      console.log('joining meetup', `meetup-${meetupId}`);
      socket.join(`meetup-${meetupId}`);
    })

    socket.on('meetup/unsubscribe', (meetupId) => {
      console.log('leaving meetup', `meetup-${meetupId}`);
    })

    socket.on('meetup/postSaved', (post) => {
      console.log('emitting to meetup', `meetup-${post.meetup}`);
      socket.to(`meetup-${post.meetup}`).emit('meetup/postPublished', post)
    })

  })
}
