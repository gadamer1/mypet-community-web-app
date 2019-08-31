import React, { useCallback, useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../../reducers/user/actions";
import { CHECK_EMAIL_DUPLICATE_REQUEST, CHECK_NICKNAME_DUPLICATE_REQUEST } from "../../reducers/check/actions";

const SignUpForm = () => {
  //email
  const [email, setEmail] = useState("");
  const [emailValidate, setEmailValidate] = useState(null);
  const [canUseEmail, setCanUseEmail] = useState(null);
  //password
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState(null);
  //nickname
  const [nickname, setNickname] = useState("");
  const [nicknameValidate, setNicknameValidate] = useState(null);
  const [canUseNickname, setCanUseNickname] = useState(null);
  //submitForm
  const [formError, setFormError] = useState('');

  const dispatch = useDispatch();


  const { checkEmail, checkNickname } = useSelector(state => state.checks);

  //이메일 유효성 검사 함수
  const chkEmail = function (str) {
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(str) ? true : false;
  };

  //닉네임 유효성 검사 함수
  const chkNickname = function (str) {
    var regExp = /^[a-z0-9_-]{3,15}$/;
    return regExp.test(str) ? true : false;
  };

  //onClick
  const onClickEmail = useCallback((e) => {
    e.preventDefault();
    if (email && !emailValidate) {
      dispatch({
        type: CHECK_EMAIL_DUPLICATE_REQUEST,
        data: email
      });
    } else {
      setEmailValidate('유효한 이메일 형식이 아닙니다');
    }
    if (checkEmail == 'canUse') {
      setCanUseEmail('can');
    } else {
      setCanUseEmail('cannot');
    }
    setFormError(null);
  }, [emailValidate, email, checkEmail,formError]);
    
  const onClickNickname = useCallback((e) => {
    e.preventDefault();
      
    if (nickname && !nicknameValidate) {
      dispatch({
        type: CHECK_NICKNAME_DUPLICATE_REQUEST,
        data: nickname
      })
    } else {
      setNicknameValidate('닉네임은 3글자 이상, 15글자 이하여야 합니다')
    }
    if (checkNickname == 'canUse') {
      setCanUseNickname('can');
    } else {
      setCanUseNickname('cannot');
    }
    setFormError(null);
  }, [nickname, nicknameValidate, checkNickname,formError]);

  //onChange
  const onChangePassword = useCallback(
    e => {
      setPassword(e.target.value);
      if (e.target.value == checkPassword) {
        setCheckPasswordError(null);
      } else {
        setCheckPasswordError("패스워드가 같지 않습니다");
      }
      setFormError(null);
    },
    [password, checkPassword,formError,checkPasswordError]
  );
  const onChangeCheckPassword = useCallback(
    e => {
      setCheckPassword(e.target.value);
      if (e.target.value != password) {
        setCheckPasswordError("패스워드가 같지 않습니다");
      } else {
        setCheckPasswordError(null);
      }
      setFormError(null);
    },
    [checkPassword, password,formError,checkPasswordError]
  );

  const onChangeEmail = useCallback(
    e => {
      setEmail(e.target.value);
      setCanUseEmail(false);
      if (chkEmail(e.target.value)) {
        //이메일 형식 유효 검사
        setEmailValidate(null);
      } else {
        setEmailValidate("유효한 이메일 형식이 아닙니다");
      }
      setFormError(null);
    },
    [email, emailValidate,formError]
  );

  const onChangeNickname = useCallback(
    e => {
      setNickname(e.target.value);
      setCanUseNickname(false);
      if (e.target.value && chkNickname(e.target.value)) {
        setNicknameValidate(null);
      } else {
        setNicknameValidate('닉네임은 3글자 이상, 15글자 이하여야 합니다')
      }
      setFormError(null);
    },
    [nickname, nicknameValidate,formError]
  );


  //회원가입 
  const onSubmitForm = useCallback(
    e => {
      e.preventDefault();
      if (checkPasswordError) {
        setFormError('패스워드를 확인해주세요');
      } else if (emailValidate) {
        setFormError('이메일 형식을 확인해주세요');
      } else if (nicknameValidate) {
        setFormError('닉네임 형식을 확인해주세요');
      } else if (canUseEmail!='can') {
        setFormError('이메일 중복확인을 해주세요');
      } else if (canUseNickname !='can') {
        setFormError('닉네임 중복확인을 해주세요');
      } else {
        dispatch({
          type: SIGN_UP_REQUEST,
          data: {
            email,
            password,
            nickname
          }
        });
      }
    },
    [formError,checkPasswordError,emailValidate,nicknameValidate,canUseNickname,canUseEmail,email,password]
  );

  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <label for="email">이메일</label>
        <input
          type="email"
          placeholder="example@email.com"
          id="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        {emailValidate && <div>{emailValidate}</div>}
        <button onClick={onClickEmail}>중복확인</button>
              {canUseEmail ? checkEmail=='canUse' ? <div>이메일을 사용할 수 있어요!</div> :<div>이미 존재하는 이메일이에요...</div> : null}
      </div>
      <div>
        <label for="nickname">닉네임</label>
        <input
          type="text"
          placeholder="nickname"
          id="nickname"
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        {nicknameValidate && <div>{nicknameValidate}</div>}
              <button onClick={onClickNickname}>중복확인</button>
        {canUseNickname ? checkNickname=='canUse' ? <div>닉네임을 사용할 수 있어요!</div> : <div>이미 존재하는 닉네임이에요...</div> : null}
      </div>
      <div>
        <label for="password">패스워드</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          value={password}
          onChange={onChangePassword}
          required
        />
      </div>
      <div>
        <label for="passwordCheck">패스워드 확인</label>
        <input
          type="password"
          placeholder="passwordCheck"
          id="passwordCheck"
          value={checkPassword}
          onChange={onChangeCheckPassword}
          required
        />
      </div>
      {checkPasswordError && <div className="error">{checkPasswordError}</div>}
      <button type="submit">회원가입</button>
      {formError && <div>{formError}</div>}
    </form>
  );
};

export default SignUpForm;
