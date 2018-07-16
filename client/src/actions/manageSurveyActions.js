export const addField = (fieldType) => ({ type: 'ADD_FIELD', payload: { fieldType } })
export const removeField = (fieldIndex) => ({ type: 'REMOVE_FIELD', payload: { fieldIndex } })
export const addOption = (index, label) => ({ type: 'ADD_OPTION', payload: { index, label } })
export const removeOption = (index, label) => ({ type: 'REMOVE_OPTION', payload: { index, label } })
export const setQuestion = (index, question) => ({ type: 'CHANGE_QUESTION', payload: { index, question } })
export const setExpectedText = (index, response) => ({ type: 'CHANGE_TEXT_RESPONSE', payload: { index, response } })
export const setExpectedOptions = (index, key) => ({ type: 'CHANGE_OPTION_RESPONSE', payload: { index, key } })
export const updateName = (input) => ({ type: 'CHANGE_NAME', payload: { input } })
export const updateDescription = (input) => ({ type: 'CHANGE_DESCRIPTION', payload: { input } })
export const updateStartDate = (input) => ({ type: 'CHANGE_START_DATE', payload: { input } })
export const updateEndDate = (input) => ({ type: 'CHANGE_END_DATE', payload: { input } })
export const clear = () => ({ type: 'CLEAR' })
export const fetchSurveySuccess = (response) => ({ type: 'FETCH_SURVEY_SUCCESS', payload: { response } })