import Store from '../status';

export const initialState = Store;

export default function statusReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUS_UPDATE': {
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || null,
        error: action.error || null,
        success: action.success || null,
      };
    }
    default:
      return state;
  }
}
