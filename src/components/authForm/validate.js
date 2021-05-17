import * as Yup from 'yup';
const authSchema = type => {
  const validate =
    type === 'signUp'
      ? Yup.object().shape({
          password: Yup.string()
            .required('* Обязательное поле')
            .min(6, 'Введите больше 6 символов')
            .max(50, 'Слишком длинный пароль!')
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])/,
              'Введите 1 большую букву и 1 цифру',
            ),
          confirmPassword: Yup.string()
            .required('* Обязательное поле')
            .min(6, 'Введите больше 6 символов')
            .max(50, 'Слишком длинный пароль!')
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])/,
              'Введите 1 большую букву и 1 цифру',
            ),

          email: Yup.string()
            .email('Неправильный эмейл')
            .required('* Обязательное поле'),
        })
      : Yup.object().shape({
          password: Yup.string()
            .required('* Обязательное поле')
            .min(6, 'Введите больше 6 символов')
            .max(50, 'Слишком длинный пароль!')
            .matches(
              /^(?=.*[A-Z])(?=.*[0-9])/,
              'Введите 1 большую букву и 1 цифру',
            ),

          email: Yup.string()
            .email('Неправильный эмейл')
            .required('* Обязательное поле'),
        });

  return validate;
};
export default authSchema;
