import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
const { VITE_BASEURL } = import.meta.env;

function SignUp() {
  const [account, setAccount] = useState({
    email: '',
    password: '',
    nickname: '',
    checkPwd: '',
  });
  const navigate = useNavigate();

  const changeInfo = (e) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };
  const onSubmit = async () => {
    if(Object.values(account).filter(item => !item).length){
      alert('表單尚未填寫完畢')
      return
    }
    if(account.password !== account.checkPwd) {
      alert('兩次密碼不一樣')
      return
    }
    if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/g.test(account.email)) {
      alert('信箱格式不正確')
      return
    }

    if(account.password < 6) {
      alert('密碼至少 6 個字元')
      return
    }

    try {
      await axios.post(`${VITE_BASEURL}/users/sign_up`, account);
      alert('註冊成功');
      navigate('/login');
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  return (
    <div id='signUpPage' className='bg-yellow'>
      <div className='conatiner signUpPage vhContainer'>
        <div className='side'>
          <img
            className='d-m-n'
            src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true'
            alt='workImg'
          />
        </div>
        <div>
          <form className='formControls' action='index.html'>
            <h2 className='formControls_txt'>註冊帳號</h2>
            <label className='formControls_label' htmlFor='email'>
              Email
            </label>
            <input
              className='formControls_input'
              type='text'
              id='email'
              name='email'
              placeholder='請輸入 email'
              required
              onChange={changeInfo}
            />
            <label className='formControls_label' htmlFor='name'>
              您的暱稱
            </label>
            <input
              className='formControls_input'
              type='text'
              name='nickname'
              id='name'
              placeholder='請輸入您的暱稱'
              onChange={changeInfo}
            />
            <label className='formControls_label' htmlFor='pwd'>
              密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              name='password'
              id='pwd'
              placeholder='請輸入密碼'
              required
              onChange={changeInfo}
            />
            <label className='formControls_label' htmlFor='checkPwd'>
              再次輸入密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              name='checkPwd'
              id='checkPwd'
              placeholder='請再次輸入密碼'
              required
              onChange={changeInfo}
            />
            <input
              className='formControls_btnSubmit'
              type='button'
              value='註冊帳號'
              onClick={onSubmit}
            />
            <NavLink to='/login' className='formControls_btnLink'>
              <p>登入</p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}
export default SignUp;
