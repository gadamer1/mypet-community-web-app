import produce from 'immer'
import { CHECK_EMAIL_DUPLICATE_REQUEST, CHECK_EMAIL_DUPLICATE_SUCCESS, CHECK_EMAIL_DUPLICATE_FAILURE, CHECK_NICKNAME_DUPLICATE_REQUEST, CHECK_NICKNAME_DUPLICATE_SUCCESS, CHECK_NICKNAME_DUPLICATE_FAILURE } from './actions';

export const initialState = {
    checkEmail : null,
    checkNickname : null,
}



export default (state = initialState, action) => {
    return produce(state, draft => {
        switch (action.type) {
            case CHECK_EMAIL_DUPLICATE_REQUEST: {
                break;
            }
            case CHECK_EMAIL_DUPLICATE_SUCCESS: {
                if (action.data) {
                    draft.checkEmail = 'canUse'; //사용할 수 있는 이메일
                } else {
                    draft.checkEmail = 'cannotUse' //이메일 중복 상태
                }
                break;
            }
            case CHECK_EMAIL_DUPLICATE_FAILURE: {
                break;
            }
                
            case CHECK_NICKNAME_DUPLICATE_REQUEST: {
                break;
            }
            case CHECK_NICKNAME_DUPLICATE_SUCCESS: {
                if (action.data) {
                    draft.checkNickname = 'canUse'; //사용할 수 있는 닉네임
                } else {
                    draft.checkNickname = 'cannotUse'; //닉네임 중복 상태
                }
                break;
            }
            case CHECK_NICKNAME_DUPLICATE_FAILURE: {
                break;
            }
                
            default: {
                break;
            }
        }
    })
}