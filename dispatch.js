const egg = require('egg');
egg.startCluster({
    port: 80, 
    baseDir: __dirname,
});