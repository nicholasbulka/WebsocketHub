import { Base64 } from 'js-base64';
import * as dotenv from "dotenv";

dotenv.config();

export const validateHeader = (needle : string) : boolean => {

  const decoded = Base64.decode(needle.replace('Basic ', ''));

  if(process.env.VALIDATION === decoded){
    return true;
  }
  else {
    return false;
  }
}
