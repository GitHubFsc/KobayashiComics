import { get, post, sign} from './http.js';

const Rnd = () => {
  return Math.floor(Math.random() * 100)
}
const GetKBaseList = data => {
  return get('api/KBase/GetKBaseList', data);
}
const UserRegister = data => {
  return get('api/UserBase/UserRegister', data);
}
const PostCustomActive = (data, par) => {
  return post('api/Active/PostCustomActive', data);
}

const PostApplyForRefunds = (data, par) => {
  return post('api/Orders/PostApplyForRefunds', data);
}
export {
  Rnd,  sign,
  UserRegister,
  GetKBaseList,
  PostCustomActive,
  PostApplyForRefunds
}