import React, { HTMLAttributes, useEffect, useState, useRef, useMemo } from 'react';
import { classnames, omit } from '@util/index';

export interface FormProps extends HTMLAttributes<any> {
  id: string; // required for forms
  onSubmit?: (e: object) => void;
  onChange?: (e: object) => void;
  initialValues?: object;
  values?: { [key: string]: any };
  validations?: {
    [key: string]: IFormValidation;
  };
}

export interface IFormValidation {
  regex?: RegExp;
  message?: string;
  validate?: (value: any) => boolean | string;
}

const omitValues = ['onSubmit', 'onChange', 'initialValues', 'values', 'validations'];

/**
 * Form component for displaying content in a form container with validations.
 * Note: every input in the form must have a unique id or name attribute.
 * @param props FormProps
 */
export function Form(props: FormProps) {
  const [values, setValues] = useState(props.initialValues || props.values || {});
  const formRef = useRef();

  useEffect(() => {
    // listen for custom change events from components in the form
    document.addEventListener('change', customChange);
    // listen for custom submit events from components in the form
    document.addEventListener('submit', customSubmit);

    return () => {
      document.removeEventListener('change', customChange);
      document.removeEventListener('submit', customSubmit);
    };
  }, [values]);

  useEffect(() => {
    if (props.values !== values) {
      if (props.values == null && props.initialValues != null) {
        setValues(props.initialValues);
      } else {
        setValues(props.values);
      }
    }
  }, [props.values]);

  const customChange = (e) => {
    const name = e?.detail?.name;
    const id = e?.detail?.id;
    const value = e?.detail?.value;

    const isChild = isChildOfForm(id, name);

    if (isChild) {
      const valueKey = name || id;

      if (valueKey) {
        const newValues = { ...values, [valueKey]: value };
        const validations = validateForm(props.validations, newValues);

        setValues(newValues);
        props.onChange?.({
          values: newValues,
          validations
        });
      }
    }
  };

  const customSubmit = (e) => {
    const name = e?.detail?.name;
    const id = e?.detail?.id;
    const isChild = isChildOfForm(id, name);

    if (isChild) {
      const validations = validateForm(props.validations, values);
      props.onSubmit?.({
        values,
        validations
      });
    }
  };

  // check if element is a child of this form by recursively checking parents
  function isChildOfForm(id = null, name = null, element = null) {
    if (!id && !name && !element) {
      return false;
    }

    const thisElement = element || document.getElementById(id) || document.getElementsByName(name)[0];
    const parentElement = thisElement?.parentElement;

    if (parentElement?.id === props.id) {
      return true;
    }

    if (!parentElement) {
      return false;
    }

    return isChildOfForm(parentElement?.id, parentElement?.name, parentElement);
  }

  function onChange(e) {
    const name = e?.target?.attributes?.name?.value;
    const id = e?.target?.attributes?.id?.value;
    const value = e?.target?.value;

    const valueKey = name || id;

    if (valueKey) {
      const newValues = { ...values, [valueKey]: value };
      const validations = validateForm(props.validations, newValues);

      setValues(newValues);
      props.onChange?.({
        values: newValues,
        validations
      });
    }
  }

  function onSubmit(e) {
    e.preventDefault();

    const validations = validateForm(props.validations, values);
    props.onSubmit?.({
      values,
      validations
    });
  }

  // If validations are provided, run them against the values object
  // Return an object of validation messages
  function validateForm(
    validations: { [key: string]: IFormValidation },
    values: { [key: string]: any }
  ): { [key: string]: string } {
    const validationMessages: { [key: string]: string } = {};

    if (!validations) {
      return validationMessages;
    }
    // check if validations object is {}
    if (Object.keys(validations).length === 0) {
      return validationMessages;
    }

    for (const key in validations) {
      const validation = validations?.[key];
      const value = values?.[key];

      if (validation.regex && !validation.regex.test(value)) {
        validationMessages[key] = validation.message || 'invalid';
      }

      if (validation.validate) {
        const result = validation.validate(value);

        // if typeof result is string, it's a custom validation message message
        if (typeof result === 'string') {
          validationMessages[key] = result;
        } else {
          // if typeof result is boolean, it's a boolean indicating if the value is valid
          if (!result) {
            validationMessages[key] = validation.message || 'Invalid field value';
          }
        }
      }
    }
    return validationMessages;
  }

  return (
    <form
      {...omit(props, omitValues)}
      className={classnames('finallyreact-form', props.className)}
      ref={formRef}
      onChange={onChange}
      onSubmit={onSubmit}
      role={props.role ?? 'form'}
    >
      {props.children}
    </form>
  );
}

export default Form;
