const config = {
    port: process.env.PORT || 3003,
    databaseUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/server_name',
    JwtSecret: process.env.JWT_SECRET || 'secret_token'
  };
  
  export default config;
  
  