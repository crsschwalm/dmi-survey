export const addField = fieldType => ({
  type: "ADD_FIELD",
  payload: { fieldType }
});
export const removeField = fieldIndex => ({
  type: "REMOVE_FIELD",
  payload: { fieldIndex }
});
export const addOption = (fieldIndex, label) => ({
  type: "ADD_OPTION",
  payload: { fieldIndex, label }
});
export const removeOption = (fieldIndex, label) => ({
  type: "REMOVE_OPTION",
  payload: { fieldIndex, label }
});
export const setQuestion = (fieldIndex, question) => ({
  type: "SET_QUESTION",
  payload: { fieldIndex, question }
});
export const setExpectedText = (fieldIndex, response) => ({
  type: "SET_EXPECTED_TEXT",
  payload: { fieldIndex, response }
});
export const setExpectedOptions = (fieldIndex, label) => ({
  type: "SET_EXPECTED_OPTION",
  payload: { fieldIndex, label }
});
