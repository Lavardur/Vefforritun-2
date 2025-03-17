declare module 'supertest' {
  import { Server } from 'node:http';
  
  function request(app: any): any;
  namespace request {
    function agent(app: any): any;
  }
  export = request;
}