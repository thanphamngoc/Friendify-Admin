import { Switch } from '@headlessui/react';
import settingApi from 'api/settingApi';
import ButtonRound from 'components/Button/ButtonRound';
import { showToastError, showToastSuccess } from 'components/CustomToast/CustomToast';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const TYPE_INPUT = {
  'desc': 'textarea',
  'change-color': 'switch',
};

const SettingForm = ({ keyApi }) => {
  const [state, setState] = useState();
  const [isUnit, setIsUnit] = useState(false);
  const methods = useForm({});
  const { control, reset, formState: { errors, isDirty } } = methods;

  const formInput = useMemo(() => {
    if (!state) return null;
    const result = [];
    Object.keys(state).forEach((key) => {
      if (typeof state[key] === 'object') {
        result.push({ group: key.replace('-', ' ').replace('_', ' ') });
        Object.keys(state[key]).forEach((k) => {
          result.push({
            id: `${key}.${k}`,
            name: `${key}.${k}`,
            label: k.replace('-', ' ').replace('_', ' '),
            rules: { required: 'Required', },
            className: 'mt-2',
            classNameLabel: 'font-semibold mt-4 pl-4 text-sm',
            classNameInput: `p-2 px-4 bg-transparent rounded-xl w-full border focus:outline-none 
              ${errors?.[`${key}.${k}`]?.message ? 'border-red-400' : ''}`,
            placeholder: '',
            type: TYPE_INPUT?.[key]?.[k] || 'text',
            defaultValue: '',
          });
        });
      } else {
        result.push({
          id: key,
          name: key,
          label: key.replace('-', ' ').replace('_', ' '),
          rules: { required: 'Required', },
          className: 'mt-6',
          classNameLabel: 'font-bold mt-8',
          classNameInput: `p-2 px-4 bg-transparent rounded-xl w-full border focus:outline-none 
            ${errors?.[key]?.message ? 'border-red-400' : ''}`,
          placeholder: '',
          type: TYPE_INPUT?.[key] || 'text',
          defaultValue: '',
        });
      }
    });
    return result;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const onSubmit = async (data) => {
    try {
      await settingApi.update({
        key: keyApi,
        data: isUnit ? data[keyApi] : data
      });
      showToastSuccess('Updated successfully');
    } catch (error) {
      showToastError('Something went wrong');
    } finally {
      reset(data);
    }
  };

  useEffect(() => {
    let isRending = true;
    if (isRending)
      (async () => {
        try {
          const res = await settingApi.get(keyApi);
          if (typeof res === 'boolean') {
            setIsUnit(true);
            setState({ [keyApi]: res });
            reset({ [keyApi]: res });
          } else {
            setState(res);
            reset(res);
          }
        } catch (error) {
          console.log(error);
          showToastError('Something went wrong');
        }
      })();
    return () => {
      isRending = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!keyApi) return <p>Missing key</p>;

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      {formInput && formInput.map((item, index) => item?.group ? (
        <div key={`${keyApi}-group-${index}`} className="mt-4 font-bold capitalize">{item.group}</div>
      ) : (
        <div key={`${keyApi}-input-${index}`} className="flex">
          <label htmlFor={item.name} className={` lg:w-2/12 capitalize ${item.classNameLabel}`}>{item.label}</label>
          <div name={item.name} className={`${item.className} relative flex-auto`}>
            {item.type === 'text' && (
              <Controller
                control={control}
                rules={item.rules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <input
                    id={item.id}
                    onBlur={onBlur}
                    value={value}
                    onChange={onChange}
                    className={item.classNameInput}
                    placeholder={item.placeholder}
                    type={item.type}
                    disabled={item?.disabled}
                  />
                )}
                name={item.name}
                defaultValue={item.defaultValue}
              />
            )}
            {item.type === 'textarea' && (
              <Controller
                control={control}
                rules={item.rules}
                render={({ field: { onChange, onBlur, value } }) => (
                  <textarea
                    id={item.id}
                    onBlur={onBlur}
                    value={value}
                    rows={10}
                    onChange={onChange}
                    className={item.classNameInput}
                    placeholder={item.placeholder}
                    disabled={item?.disabled}
                  />
                )}
                name={item.name}
                defaultValue={item.defaultValue}
              />
            )}
            {item.type === 'switch' && (
              <Controller
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Switch
                    id={item.id}
                    checked={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`${value ? 'bg-teal-900' : 'bg-teal-700'}
                    relative inline-flex h-[28px] w-[54px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span className="sr-only">Use setting</span>
                    <span
                      aria-hidden="true"
                      className={`${value ? 'translate-x-6' : 'translate-x-0'}
                      pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                )}
                name={item.name}
                defaultValue={item.defaultValue}
              />
            )}
            {errors?.[item.name]?.message && (
              <span className="text-xs text-red-400 ">* {errors?.[item.name]?.message || 'Invalid'} </span>
            )}
          </div>
        </div>
      ))}
      {isDirty && (
        <div className="flex mt-4 space-x-2">
          <ButtonRound type="button" onClick={() => { reset(state); }}>
            Reset
          </ButtonRound>
          <ButtonRound color="primary" type="submit">
            Submit
          </ButtonRound>
        </div>
      )}
    </form>
  );
};

export default SettingForm;