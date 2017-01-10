// @flow
import {
  LINK_DEVICE,
  SENT_PI_REQUEST,
  RECEIVED_PI_REQUEST
} from '../actions/status';

const INITIAL_STATE = {
  device: {
    id: '',
    address: '',
    name: ''
  },
  pins: [],
  isLoading: true
};

export default function status(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LINK_DEVICE:
      return Object.assign({}, state, {
        device: action.device
      });
    case SENT_PI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });
    case RECEIVED_PI_REQUEST:
      return Object.assign({}, state, {
        pins: action.pins,
        isLoading: false
      });
    default:
      return state;
  }
}
