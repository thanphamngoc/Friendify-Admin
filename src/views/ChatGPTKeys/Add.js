import { locations } from "Routes";
import chatgptKeysApi from "api/chatgptKeysApi";
import { CardBox } from "components/Card/CardBox";
import Container from "components/Container/Container";
import { showToastError, showToastSuccess } from "components/CustomToast/CustomToast";
import FormFooter from "components/Form/FormFooter";
import Input from "components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AddChatGptKeysPage = () => {
  const {
    control,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const watchData = watch('data');

  const onHandleSubmit = async (data) => {
    try {
      // const formData = new FormData();
      // formData.append('body', JSON.stringify(data));
      await chatgptKeysApi.add(data);
      showToastSuccess('', 'Successfully');
    } catch (e) {
      console.error(e);
      showToastError('', 'Something went wrong');
    }
  };

  return (
    <Container>
      <CardBox title={'Add new keys'}>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col 4xl:flex-row">
            <div className="relative flex-1 px-4 py-4 sm:px-12 animate-fade-in 4xl:border-r border-black-2 z-2">
              <Controller
                control={control}
                rules={{ required: 'Required' }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onBlur={onBlur}
                    value={value}
                    placeholder={'add keys'}
                    onChange={(e) => {
                      if (e.target.value) {
                        const newValue = `${e.target.value}`.split(' ');
                        onChange(newValue);
                      } else {
                        onChange(null);
                      }
                    }}
                    type="text"
                    isValid={!!errors?.['data']?.message}
                  />
                )}
                name={'data'}
                defaultValue=""
                autoComplete="off"
              />
              <Input.errorText message={errors?.['data']?.message} />
              {watchData?.length > 0 && (
                <div className="overflow-auto">
                  <h2 className="my-4 text-xl font-bold ">Preview</h2>
                  <ol className="pl-8 list-decimal">
                    {watchData.map((key) => (
                      <li key={key}>
                        <p
                          style={{ lineBreak: 'anywhere' }}
                          className="mb-2">
                          {key}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
          <FormFooter
            disabled={Object.keys(errors).length > 0 || isSubmitting || watchData?.length === 0}
            isLoading={isSubmitting}
            onClickBack={() => { navigate(locations.chatgptKeys); }}
          />
        </form>
      </CardBox>
    </Container >
  );
};

export default AddChatGptKeysPage;