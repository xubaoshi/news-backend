const egg = require('egg');
egg.startCluster({
    port: 8989, 
    baseDir: __dirname,
});