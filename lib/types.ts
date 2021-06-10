// import Global =  Nodejs.Global;
import Global = NodeJS.Global;

export interface myGlobal extends Global {
  mongo: any;
}
