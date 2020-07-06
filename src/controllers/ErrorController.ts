import { reducerStore } from '../store/reducers';
import * as ws from 'ws';

const ErrorController = (socket : ws, error : Error ) : void => {
  const store = reducerStore();

  console.log(error);

}
export default ErrorController;
