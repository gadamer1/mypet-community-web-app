import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { LOGIN_REQUEST } from "../../reducers/user/actions";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState(null);
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState(true);
  const dispatch = useDispatch();

  //이메일 유효성 검사 함수
  const chkEmail = function(str) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  //onClick

  //onChange
  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      if (chkEmail(e.target.value)) {
        setEmailValidate(false);
      } else {
        setEmailValidate("유효한 이메일 형식이 아닙니다");
      }
    },
    [email, emailValidate]
  );

  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
    },
    [password]
  );

  const onChangeCheck = useCallback(
    e => {
      setCheck(e.target.checked);
    },
    [check]
  );

  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      dispatch({
        type: LOGIN_REQUEST,
        data: {
          email,
          password,
          check
        }
      });
    },
    [email, password]
  );

  return (
    <>
      <form onSubmit={onSubmitForm}>
        <div>
          <input
            type="email"
            placeholder="example@email.com"
            id="name"
            value={email}
            onChange={onChangeEmail}
          />
          {emailValidate && <div>{emailValidate}</div>}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            id="password"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <button type="submit">로그인</button>
        <Link href="/signup">
          <a>회원가입</a>
        </Link>
        <label>
          <input
            type="checkbox"
            checked={check}
            onChange={onChangeCheck}
            name="remember"
          />
          로그인 상태 유지
        </label>
      </form>
    </>
  );
};

export default LoginForm;
