import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
const { VITE_BASEURL } = import.meta.env;

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });
  const login = async (data) => {
    try {
        const res =  await axios.post(`${VITE_BASEURL}/users/sign_in`, data);
        const {token, exp} = res.data
        document.cookie = `token=${token};expires=${new Date(exp * 1000)}`;
        navigate('/todo');
      } catch (err) {
        alert(err.response.data.message);
      }
  };

  return (
    <div id='loginPage' className='bg-yellow'>
      <div className='conatiner loginPage vhContainer'>
        <div className='side'>
          <img
            className='d-m-n'
            src='https://github.com/panduola666/2023_React/blob/master/src/assets/img/left.png?raw=true'
            alt='workImg'
          />
        </div>
        <div>
          <form
            className='formControls'
            action=''
            onSubmit={handleSubmit(login)}
          >
            <h2 className='formControls_txt'>最實用的線上代辦事項服務</h2>
            <label className='formControls_label' htmlFor='email'>
              Email
            </label>
            <input
              className='formControls_input'
              type='text'
              id='email'
              {...register('email', {
                required: { value: true, message: '信箱必填' },
                pattern: { value: /^\S+@\S+$/i, message: '信箱格式錯誤' },
              })}
              placeholder='請輸入 email'
            />
            <span>{errors.email && errors.email.message}</span>
            <label className='formControls_label' htmlFor='pwd'>
              密碼
            </label>
            <input
              className='formControls_input'
              type='password'
              {...register('password',{required: {value: true, message: '密碼必填'}, minLength: {value: 6, message: '密碼不可低於 6 個字元'}})}
              id='pwd'
              placeholder='請輸入密碼'
              autoComplete='on'
            />
            <span>{errors.password && errors.password.message}</span>
            <input
              className='formControls_btnSubmit'
              type='submit'
              value='登入'
            />
            <NavLink to='/signUp' className='formControls_btnLink'>
              <p>註冊帳號</p>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
