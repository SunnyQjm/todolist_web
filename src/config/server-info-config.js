const ServerConfig = {
    protocol: 'http',
    host: '39.106.138.103',
    port: '9797',
    sub_domain: '/',
    static_domain: '/statics/'
};

const TestServerConfig = {
    protocol: 'http',
    host: 'localhost',
    port: '8000',
    sub_domain: '/',
    static_domain: '/statics/'
};

ServerConfig.BASE_URL = `${ServerConfig.protocol}://${ServerConfig.host}:${ServerConfig.port}${ServerConfig.sub_domain}`;
ServerConfig.STATIC_URL = `${ServerConfig.protocol}://${ServerConfig.host}:${ServerConfig.port}${ServerConfig.static_domain}`;

// // test
// ServerConfig.BASE_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}:${TestServerConfig.port}${TestServerConfig.sub_domain}`;
// ServerConfig.STATIC_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}${TestServerConfig.static_domain}/`;


export {
    ServerConfig
}