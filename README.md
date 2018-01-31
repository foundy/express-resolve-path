# express-resolve-path
[![Build Status](https://travis-ci.org/foundy/express-resolve-path.svg?branch=master)](https://travis-ci.org/foundy/express-resolve-path)

`Recommended Node.js version`: **>= 8.9.0 (LTS)**

Express middleware that rewrites paths with multiple slashes to the correct path.

For example, when a request comes in the path of multiple slashes, it is rewritten to the converted path as shown below to match the routing rule.

`Request path`: ///foo///bar//?val=hello

`Rewrite path`: /foo/bar?val=hello

# Install

`$ npm install express-resolve-path`

# API

```javascript
const resolvePath = require('express-resolve-path');

const app = express();

app.use(resolvePath());

app.get('/foo', (req, res) => res.send('Hello'));
```

## resolvePath([options])

### Options

#### methods
Specifies the requested method to apply. (not case-sensitive)

```javascript
// methods <string> specifying a single method
app.use(resolvePath({ methods: 'GET' }));

// methods <string> specify multiple methods
app.use(resolvePath({ methods: 'GET POST' }));

// methods <array>
app.use(resolvePath({ methods: ['GET', 'POST'] }));
```

# License
[MIT](https://github.com/foundy/express-resolve-path/blob/master/LICENSE)
