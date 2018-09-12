const ServerConfig = {
    protocol: 'https',
    host: 'todolist.qjm253.cn',
    port: '97480',
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

// ServerConfig.BASE_URL = `${IntranetServerConfig.protocol}://${IntranetServerConfig.host}${IntranetServerConfig.sub_domain}`;
// ServerConfig.STATIC_URL = `${IntranetServerConfig.protocol}://${IntranetServerConfig.host}${IntranetServerConfig.static_domain}`;

// test
ServerConfig.BASE_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}:${TestServerConfig.port}${TestServerConfig.sub_domain}`;
ServerConfig.STATIC_URL = `${TestServerConfig.protocol}://${TestServerConfig.host}${TestServerConfig.static_domain}/`;


export {
    ServerConfig
}