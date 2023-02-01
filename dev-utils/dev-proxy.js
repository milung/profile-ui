const http = require('http');
const httpProxy = require('http-proxy');
const { runInNewContext } = require('vm');

const clusterHost="localhost"

const proxyStencil = new httpProxy.createProxyServer({
    target: {
        host: '127.0.0.1',
        port: 3333
    }
});

const proxyAvatar = new httpProxy.createProxyServer({
    target: {
        protocol: 'https:',
        host: 'seccdn.libravatar.org',
        port: 443,
        secure: false
    },
    changeOrigin: true,
});

proxyStencil.on('error', function(err, req, res) {
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
   
    res.end('Dev Server is disconnected');
  });

const proxyServer = http.createServer(function (req, res) {
    console.log(req.url);
    if ( req.url.match(/\/avatar/) || req.url.match(/\/gravatar/)) {
        console.log('avatar');
        proxyAvatar.web(req,res)
    } else {
        console.log('stencil 3');
        proxyStencil.web(req, res);
    }
});

//
// Listen to the `upgrade` event and proxy the
// WebSocket requests as well.
//
proxyServer.on('upgrade', function (req, socket, head) {
    proxyStencil.ws(req, socket, head);
});

console.log('Listen: http://127.0.0.1:5000');
proxyServer.listen(5000);