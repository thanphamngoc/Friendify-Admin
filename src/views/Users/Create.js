import { locations } from "Routes";
import usersApi from "api/usersApi";
import { CardBox } from "components/Card/CardBox";
import Container from "components/Container/Container";
import { showToastError, showToastSuccess } from "components/CustomToast/CustomToast";
import FormFooter from "components/Form/FormFooter";
import Input from "components/Input/Input";
import ModalConfirm from "components/Modal/ModalConfirm";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { STATUS_USER } from "utils/constant";

const MODAL_INIT = {
  isOpen: false,
  children: '',
  title: '',
  data: {},
  onConfirm: () => { },
};

const CreateUserPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // ----------------------------------------------------------------
  // Handle Modal Events
  const [modal, setModal] = useState(MODAL_INIT);
  const resetModal = () => { setModal(MODAL_INIT); };

  const handleDelete = async () => {
    try {
      await usersApi.edit(id, { status: STATUS_USER.DELETED });
      showToastSuccess('Message', 'Delete successful');
    } catch (e) {
      console.log(e);
      showToastError('Error', 'Something went wrong');
    } finally {
      resetModal();
    }
  };

  const onClickDelete = () => {
    setModal({
      isOpen: true,
      title: 'Delete User',
      children: (
        <>
          <p>Do you still want to delete user </p>
          <p className="mt-4 text-xl font-bold text-center text-primary">{id}</p>
        </>
      ),
      onConfirm: () => {
        handleDelete();
      },
    });
  };
  
  // const user = useMemo(() => {
  //   if (id) {
  //     return usersApi.getById(id);
  //   }
  // }, [id]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      password: '',
      inviterReferralId: '',
    }
  });


  const onHandleSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // formData.append('body', JSON.stringify(data));
      if (id) {
        await usersApi.edit(id, data);
      } else {
        await usersApi.create(data);
      }
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
    <Container>
      <ModalConfirm
        open={modal?.isOpen}
        onClose={resetModal}
        onConfirm={modal?.onConfirm}
        onCancel={resetModal}
        title={modal?.title}
      >
        {modal.children}
      </ModalConfirm>
      <CardBox title={'Add new user'}>
        <form autoComplete="off" onSubmit={handleSubmit(onHandleSubmit)}>
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
                        autoComplete="off"
                      />
                    )}
                    name={input.name}
                    defaultValue={""}
                    autoComplete="off"
                  />
                  <Input.errorText message={errors?.[input.name]?.message} />
                </div>
              );
            })}
          </div>
          <FormFooter
            disabled={Object.keys(errors).length > 0 || isSubmitting}
            isLoading={isSubmitting}
            acceptText={id ? 'Edit' : 'Create'}
            onClickBack={() => { navigate(locations.users); }}
            onClickDelete={onClickDelete}
          />
        </form>
      </CardBox>
    </Container >
  );
};

export default CreateUserPage;