import { GET_PROJECT_LIST_REQUEST, GET_PROJECT_LIST_FAILURE, GET_PROJECT_LIST_SUCCESS } from './type'
import {get} from '../utilities/servive';
import { KICK_STARTER_URL } from '../utilities/constants';

export const getProjectList = ()=>{
      return( dispatch) =>{
          dispatch({type:GET_PROJECT_LIST_REQUEST});
          const promise = get(KICK_STARTER_URL);

          promise.then((response)=>{
              if(response.ok){
                  return response.json();
              }else{
                  dispatch({type:GET_PROJECT_LIST_FAILURE})
              }
          }).then((response)=>{
              dispatch({type:GET_PROJECT_LIST_SUCCESS,payload:response});
          })
      }
}