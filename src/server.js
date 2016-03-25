import Server from 'socket.io';

export function startServer (store) {
  // Create a Socket.io server and regular HTTP server bound to port 8090
  const io = new Server().attach(8090);

  /*
   * Subscribe a listener to the store.
   * Our listener emits the serialized current state as a `state` event on the Socket.io server
   * i.e. sends a JSON-serialized snapshot of the state to all active Socket.io connections
   *
   * TODO: optimize this by sending only relevant subsets
   */
  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  // Listen for incoming socket connections
  io.on('connection', (socket) => {
    // Send current state whenever a client connects
    socket.emit('state', store.getState().toJS());

    // Clients emit 'action' events that we can feed into the Redux store
    socket.on('action', store.dispatch.bind(store));

    // There should be a firewall or auth mechanism here 
  });
}