import chatgptKeysApi from "api/chatgptKeysApi";
import ButtonRound from "components/Button/ButtonRound";
import Container from "components/Container/Container";
import { showToastError, showToastSuccess } from "components/CustomToast/CustomToast";
import Input from "components/Input/Input";
import { Controller, useForm } from "react-hook-form";

const AddChatGptKeysPage = () => {
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
      await chatgptKeysApi.add(data);
      showToastSuccess('', 'Successfully');
    } catch (e) {
      console.error(e);
      showToastError('', 'Something went wrong');
    }
  };

  return (
    <Container className="max-w-3xl py-4">
      <div className="pt-16 mx-auto bg-white shadow-2xl mb-14 break leading rounded-xl">
        <h1 className="pb-6 text-3xl font-bold text-center uppercase">
          Add new keys
        </h1>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div className="flex flex-col 4xl:flex-row">
            <div className="relative flex-1 px-4 py-4 sm:px-12 animate-fade-in 4xl:border-r border-black-2 z-2">
              <Controller
                control={control}
                rules={{ required: true }}
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
                    type="textarea"
                    rows={4}
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
          <div className="flex px-4 border-t sm:px-12 py-9">
            <div className="flex space-x-4">
              <ButtonRound
                className="font-bold uppercase min-w-40"
                type="button"
                onClick={() => {
                  history.push('/admin/lands');
                }}
              >
                Quay lại
              </ButtonRound>
              <ButtonRound
                className="font-bold text-white uppercase border-0 min-w-40 bg-slate-900"
                disabled={Object.keys(errors).length > 0 || isSubmitting || watchData?.length === 0}
                isLoading={isSubmitting}
                type="submit"
              >
                Xác nhận
              </ButtonRound>
            </div>
          </div>
        </form >
      </div >
    </Container >
  );
};

export default AddChatGptKeysPage;