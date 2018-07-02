const egg = require('egg');
egg.startCluster({
    port: 8084, 
    baseDir: __dirname,
});