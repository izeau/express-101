# Step 2: Simple server

## App configuration

```js
app.enable('case sensitive routing');
app.enable('strict routing');
app.disable('x-powered-by');

if (app.get('env') === 'development') {
  app.set('json spaces', 2);
}
```

## Testing with supertest

```js
const request = require('supertest');
const app = require('../app');

request(app)
  .get('/hello')
  .expect(200)
  .expect({ hello: 'world' });
```

## Environment variables

Use `dotenv`!

```sh
NODE_ENV=development
HTTP_HOST=localhost
HTTP_PORT=3000
```

## The server

Tell Express to listen on said host and port.

```
app.listen(HTTP_PORT, HTTP_HOST);
```
