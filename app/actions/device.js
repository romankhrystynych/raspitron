// @flow
import { getPins, postPin } from '../api/endpoints/pins';

export const LINK_DEVICE = 'LINK_DEVICE';
export const ORDER_PIN_RULES = 'ORDER_PIN_RULES';
export const ADD_PIN_RULE = 'ADD_PIN_RULE';
export const UPDATE_PIN_RULE = 'UPDATE_PIN_RULE';
export const DELETE_PIN_RULE = 'DELETE_PIN_RULE';
export const SENT_PI_REQUEST = 'SENT_PI_REQUEST';
export const RECEIVED_PI_REQUEST = 'RECEIVED_PI_REQUEST';

function requestStatus() {
  return {
    type: SENT_PI_REQUEST
  };
}

function recieveStatus(json) {
  return {
    type: RECEIVED_PI_REQUEST,
    pins: json.pins
  };
}

function linkDevice(device) {
  return {
    type: LINK_DEVICE,
    device
  };
}

function addPinRule(number, rule) {
  return {
    type: ADD_PIN_RULE,
    number,
    rule
  };
}

function updatePinRule(number, rule) {
  return {
    type: UPDATE_PIN_RULE,
    number,
    rule
  };
}

function deletePinRule(number, rule) {
  return {
    type: DELETE_PIN_RULE,
    number,
    rule
  };
}

function orderPinRules(number) {
  return {
    type: ORDER_PIN_RULES,
    number
  };
}

export function connectToDevice(device) {
  return (dispatch) => {
    dispatch(linkDevice(device));
    dispatch(fetchPins(device.address));
  };
}

export function fetchPins(address) {
  return (dispatch) => {
    dispatch(requestStatus());
    return getPins(address)
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function setPin(address, number, action) {
  return (dispatch) => {
    dispatch(requestStatus());
    return postPin(address, number, action)
      .then(json => dispatch(recieveStatus(json)));
  };
}

export function addPinRuleAndOrder(number, rule) {
  return (dispatch) => {
    dispatch(addPinRule(number, rule));
    dispatch(orderPinRules(number, rule));
  };
}

export function updatePinRuleAndOrder(number, rule) {
  return (dispatch) => {
    dispatch(updatePinRule(number, rule));
    dispatch(orderPinRules(number, rule));
  };
}

export function deletePinRuleAndOrder(number, rule) {
  return (dispatch) => {
    dispatch(deletePinRule(number, rule));
    dispatch(orderPinRules(number, rule));
  };
}
