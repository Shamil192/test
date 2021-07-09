import React, { useEffect, useState } from "react";
import ReactDadataBox from "react-dadata-box";

const useValidation = (value, validations) => {
  const [isEmpty, setEmpty] = useState(true);
  const [isTel, setTel] = useState(false);
  const [inputValid, setInputValid] = useState(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isTel":
          const reg = /^7{1}\d{10}$/;
          reg.test(value) ? setTel(false) : setTel(true);
          break;
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;

        default:
          break;
      }
    }
  }, [validations, value]);

  useEffect(() => {
    if (isTel || !isEmpty) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty, isTel]);
  return {
    isTel,
    isEmpty,
    inputValid,
  };
};

const useInput = (initialValue, validations) => {
  const [value, setValue] = useState(initialValue);
  const [isDirty, setDirty] = useState(false);
  const valid = useValidation(value, validations);
  const onChange = (e) => {
    setValue(e?.target?.value);
  };
  const onBlur = () => {
    setDirty(true);
  };
  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};
function Form() {
  const [success, setSuccess] = useState(false);

  const tel = useInput("", { isEmpty: true, isTel: false });
  const gender = useInput("", { isEmpty: true });
  const doctor = useInput("", { isEmpty: true });
  const group = useInput("", { isEmpty: true });
  const date = useInput("", { isEmpty: true });

  const submitHandler = (e) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <>
      <div className="container py-3">
        {success && (
          <div class="alert alert-success" role="alert">
            Регистрация прошла успешно!
          </div>
        )}
        <h4>Заполните форму для регистрации</h4>
        <hr />
        <form action='/'>
          <div className="container px-5" style={{ width: "700px" }}>
            <div className="form-group mx-5">
              <label htmlFor="fio">ФИО</label>
              <ReactDadataBox
                id="fio"
                token="4e3296be2227ec2b05154ba29cb5f0565deb9c2f"
                type="fio"
                name="fio"
                showNote={false}
                placeholder="Иванов Иван Иванович..."
              />
            </div>
            <div className="form-group mx-5  my-5">
              <label htmlFor="tel">Номер телефона</label>
              <input
                id="tel"
                className="form-control mt-1"
                type="text"
                placeholder="В формате 79999999999"
                value={tel.value}
                onChange={(e) => tel.onChange(e)}
                onBlur={(e) => tel.onBlur(e)}
              />
              {tel.isDirty && tel.isEmpty && (
                <div style={{ color: "red" }}> Поле не может быть пустым</div>
              )}
              {tel.isDirty && tel.isTel && (
                <div style={{ color: "red" }}>
                  Номер телефона должен начинаться с 7, и содержать 11 символов
                </div>
              )}
            </div>
            <div className="form-group mx-5">
              <label htmlFor="date">Дата рождения</label>
              <input
                id="date"
                className="form-control mt-1"
                type="date"
                required
                value={date.value}
                onChange={(e) => date.onChange(e)}
                onBlur={(e) => date.onBlur(e)}
              />
              {date.isDirty && date.isEmpty && (
                <div style={{ color: "red" }}> Поле не может быть пустым</div>
              )}
            </div>
            <div className="form-group my-5 mx-5 ">
              <label>Выберите пол</label>
              <select
                id="gender"
                className="form-select mt-1"
                aria-label="Default select example"
                value={gender.value}
                onChange={(e) => gender.onChange(e)}
                onBlur={(e) => gender.onBlur(e)}
              >
                <option de="0" selected disabled hidden></option>
                <option value="1">Мужской</option>
                <option value="2">Женский</option>
              </select>
              {gender.isDirty && gender.isEmpty && (
                <div style={{ color: "red" }}> Поле не может быть пустым</div>
              )}
            </div>
            <div className="form-group my-5 mx-5 ">
              <label>Выберите лечащего врача</label>
              <select
                className="form-select mt-1"
                aria-label="Default select example"
                value={doctor.value}
                onChange={(e) => doctor.onChange(e)}
                onBlur={(e) => doctor.onBlur(e)}
              >
                <option defaultValue="0" selected disabled hidden></option>
                <option value="1">Петров</option>
                <option value="2">Черниговская</option>
                <option value="3">Захаров</option>
              </select>
              {doctor.isDirty && doctor.isEmpty && (
                <div style={{ color: "red" }}> Поле не может быть пустым</div>
              )}
            </div>
            <label>Выберите группу клиентов</label>
            <select
              className="form-select mt-1"
              aria-label="Default select example"
              multiple={true}
              onChange={(e) => group.onChange(e)}
              onBlur={(e) => group.onBlur(e)}
            >
              <option defaultValue="0" selected disabled hidden></option>
              <option value="1">VIP</option>
              <option value="2">Проблемные</option>
              <option value="3">ОМС</option>
              <option value="3">ДМС</option>
            </select>{" "}
            {group.isDirty && group.isEmpty && (
              <div style={{ color: "red" }}> Поле не может быть пустым</div>
            )}
            <div className="form-check form-check-inline my-3">
              <input
                className="form-check-input"
                type="checkbox"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Не отправлять СМС
              </label>
            </div>
          </div>
          <button
            onClick={(e) => submitHandler(e)}
            disabled={
              tel.inputValid ||
              group.inputValid ||
              gender.inputValid ||
              date.inputValid ||
              doctor.inputValid
            }
            className="btn btn-success"
          >
            Зарегистрироваться
          </button>
          {tel.inputValid ||
          group.inputValid ||
          gender.inputValid ||
          date.inputValid ||
          doctor.inputValid ? (
            <div style={{ color: "red" }}>Заполните все поля</div>
          ) : null}
        </form>
      </div>
    </>
  );
}

export default Form;
