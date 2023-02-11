import chatgptKeysApi from "api/chatgptKeysApi";
import usersApi from "api/usersApi";
import ButtonRound from "components/Button/ButtonRound";
import Container from "components/Container/Container";
import { showToastError, showToastSuccess } from "components/CustomToast/CustomToast";
import Input from "components/Input/Input";
import { Controller, useForm } from "react-hook-form";

const CreateUserPage = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const watchData = watch('data');

  const onHandleSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // formData.append('body', JSON.stringify(data));
      await usersApi.create(data);
      showToastSuccess('', 'Successfully');
    } catch (e) {
      console.error(e);
      showToastError('', 'Something went wrong');
    }
  };

  const arrayInput = [
    {
      name: 'fullName',
      label: 'Name',
      type: 'text',
      placeholder: 'Your full name...',
      rules: { required: 'Required', }
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Your email...',
      rules: { required: 'Required', }
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'text',
      placeholder: 'Your phone number...',
      rules: { required: 'Required', }
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Your password...',
      rules: { required: 'Required', }
    },
    {
      name: 'inviterReferralId',
      label: 'Inviter referral',
      type: 'text',
      placeholder: 'Inviter referral code...',
      // rules: { required: true, }
    },
  ];

  return (
    <Container className="max-w-3xl py-4">
      <div className="pt-16 mx-auto bg-white shadow-2xl mb-14 break leading rounded-xl">
        <h1 className="pb-6 text-3xl font-bold text-center uppercase">
          Add new user
        </h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col 4xl:flex-row">
            {arrayInput.map((input) => {
              return (
                <div
                  key={input.name}
                  className="relative flex-1 px-4 py-4 sm:px-12 animate-fade-in 4xl:border-r border-black-2 z-2"
                >
                  <Input.label htmlFor={input.name}>{input.label}</Input.label>
                  <Controller
                    control={control}
                    rules={input.rules}
                    render={({ field: { name, onChange, onBlur, value } }) => (
                      <Input
                        onBlur={onBlur}
                        id={name}
                        name={name}
                        value={value}
                        placeholder={input.placeholder}
                        onChange={onChange}
                        type={input.type}
                        isValid={!!errors?.[input.name]?.message}
                      />
                    )}
                    name={input.name}
                    defaultValue={""}
                    autoComplete="off"
                  />
                  <Input.errorText message={errors?.[input.name]?.message} />
                </div>
              )
            })}
          </div>
          <div className="flex px-4 border-t sm:px-12 py-9">
            <div className="flex space-x-4">
              <ButtonRound
                className="font-bold uppercase min-w-40"
                type="button"
                onClick={() => {
                  history.push('/admin/lands');
                }}
              >
                Back
              </ButtonRound>
              <ButtonRound
                className="font-bold text-white uppercase border-0 min-w-40 bg-slate-900"
                disabled={Object.keys(errors).length > 0 || isSubmitting || watchData?.length === 0}
                isLoading={isSubmitting}
                type="submit"
              >
                Accept
              </ButtonRound>
            </div>
          </div>
        </form >
      </div >
    </Container >
  );
};

export default CreateUserPage;