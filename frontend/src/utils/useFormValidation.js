import { useCallback, useState } from "react";

function useFormValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  // console.log(isValid)
  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validationMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });

    setErrors((oldErrors) => {
      return { ...oldErrors, [name]: validationMessage };
    });

    setIsInputValid((oldIsUnputValid) => {
      return { ...oldIsUnputValid, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }
  // возвращение всех значений
  function reset(data = {}) {
    setValues(data);
    setErrors({});
    setIsInputValid(false);
    setIsValid({});
  }

  const setValue = useCallback((name, value) => {
    setValues((oldValues) => {
      return { ...oldValues, [name]: value };
    });
  }, []);

  return {
    values,
    errors,
    isValid,
    isInputValid,
    setValue,
    reset,
    handleChange,
  };
}

export default useFormValidation;
