# Update things from server
 - web sockets (socket) (bidirectional)
 - long pulling
 - Server-Sent Events (SSE) (unidirectional)

```js
// server.js (Node.js + Express)
const express = require('express');
const app = express();

app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();

  // Send initial data
  res.write(`data: ${JSON.stringify({ message: 'Welcome!', time: new Date() })}\n\n`);

  // Optionally send periodic updates
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: new Date() })}\n\n`);
  }, 5000);

  req.on('close', () => clearInterval(interval));
});

app.listen(3000, () => console.log('SSE server running on port 3000'));
```


browser 
```js
const evtSource = new EventSource('/events');
evtSource.onmessage = (e) => {
  console.log('Server says:', JSON.parse(e.data));
};
```


# How to super fast return some results
- Add get query to CDN caching. Like 30s caching 


# Choke point
Virtual waiting queue. Serve by chunks


# Do Math for calculation, calculate TPS/QPS