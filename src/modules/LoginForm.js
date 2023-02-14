import { useState } from 'react';
import ButtonRound from 'components/Button/ButtonRound';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUnlock } from 'react-icons/fi';
import { Controller, useForm } from 'react-hook-form';
import { validateEmail } from 'utils';
import usersApi from 'api/usersApi';
import { USER_TOKEN } from 'utils/storage';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import { useNavigate } from 'react-router-dom';
import { useSetUserLogin } from 'store/userLogin/hook';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const setUserLogin = useSetUserLogin();

  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const FORM_INPUT = [
    {
      id: 'email',
      name: 'email',
      label: 'Email',
      rules: {
        required: 'Nhập thông tin',
        validate: {
          checkValie: (v) => validateEmail(v) || 'Thông tin này có thể không phải là địa chỉ email',
        },
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['email']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Địa chỉ email',
      type: 'text',
      defaultValue: '',
      prependIcon: <FiMail />,
    },
    {
      id: 'password',
      name: 'password',
      label: 'Mật khẩu',
      rules: {
        required: 'Nhập thông tin',
      },
      className: 'mb-4',
      classNameInput: `py-4 pl-16 bg-transparent rounded-xl w-full border focus:outline-none ${
        errors?.['password']?.message ? 'border-red-400' : ''
      }`,
      placeholder: 'Mật khẩu',
      type: showPassword ? 'text' : 'password',
      defaultValue: '',
      prependIcon: showPassword ? <FiUnlock /> : <FiLock />,
      appendIcon: (
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          {showPassword ? <FiEyeOff /> : <FiEye />}
        </div>
      ),
    },
  ];

  const onHandleSubmit = async (data) => {
    try {
      const res = await usersApi.login(data);
      setUserLogin(res);
      USER_TOKEN.set(res?.token);
      showToastSuccess(
        'Login successful',
        <>
          Welcome <span className="capitalize">{res.fullName}</span>
        </>,
      );
      navigate('/');
    } catch (error) {
      console.error(error);
      showToastError(
        'Error while login',
        error?.response?.status === 422 || error?.response?.status === 403
          ? 'Check your email or password again'
          : 'Login failed',
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onHandleSubmit)}>
      <div className="px-4 sm:px-12 py-9 animate-fade-in">
        {FORM_INPUT.map((item, index) => (
          <div key={`register-input-${index}`} className={`${item.className} relative `}>
            <div className="absolute top-0 py-4 text-2xl left-6">{item?.prependIcon}</div>
            <div className="absolute top-0 py-4 text-2xl right-6">{item?.appendIcon}</div>
            <div className={item.className}>
              <Controller
                control={control}
                rules={item.rules}
                render={({ field: { onChange, onBlur, value } }) =>
                  item.id === 'password' || item.id === 're-password' || item.id === 'phone' ? (
                    <input
                      id={item.id}
                      onBlur={onBlur}
                      value={value}
                      onChange={(e) => {
                        onChange(e.target.value.trim());
                      }}
                      className={item.classNameInput}
                      placeholder={item.placeholder}
                      type={item.type}
                      disabled={item?.disabled}
                    />
                  ) : (
                    <input
                      id={item.id}
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      className={item.classNameInput}
                      placeholder={item.placeholder}
                      type={item.type || 'text'}
                      min={0}
                      disabled={item?.disabled}
                    />
                  )
                }
                name={item.name}
                defaultValue={item.defaultValue}
              />
              {errors?.[item.name]?.message && (
                <span className="text-xs text-red-400 ">* {errors?.[item.name]?.message || 'Invalid'} </span>
              )}
            </div>
          </div>
        ))}
        <ButtonRound
          className="w-full py-3 font-bold uppercase border-2 border-slate-800"
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          Login
        </ButtonRound>
      </div>
    </form>
  );
};

LoginForm.propTypes = {};

export default LoginForm;
