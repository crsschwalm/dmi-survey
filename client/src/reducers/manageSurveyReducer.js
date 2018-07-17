import formatDate from '../services/formatDate';

const manageSurveyReducer = (state = emptySurvey(), action) => {
    const { type, payload } = action;
    switch (type) {
        case 'ADD_FIELD': {
            const oldFields = state.fields;
            oldFields.push(generateField(payload.fieldType));
            return { ...state, fields: oldFields };
        }
        case 'REMOVE_FIELD': {
            const fields = state.fields.filter((field, index) => payload.fieldIndex !== index);
            return { ...state, fields: fields };
        }
        case 'ADD_OPTION': {
            const { index, label } = payload;
            state.fields[index].options[label] = false;
            return { ...state }
        }
        case 'REMOVE_OPTION': {
            const { index, label } = payload;
            delete state.fields[index].options[label];
            return { ...state };
        }
        case 'CLEAR_SURVEY': {
            return { ...state, ...emptySurvey() }
        }
        case 'CHANGE_QUESTION': {
            const { index, question } = payload;
            state.fields[index].question = question;
            return { ...state };
        }
        case 'CHANGE_TEXT_RESPONSE': {
            const { index, response } = payload;
            state.fields[index].expectedResponse = response;
            return { ...state };
        }
        case 'CHANGE_OPTION_RESPONSE': {
            const { index, key } = payload;
            const isExpected = state.fields[index].options[key];
            state.fields[index].options[key] = !isExpected;
            return { ...state };
        }
        case 'CHANGE_NAME': {
            const { input } = payload;
            return { ...state, name: input };
        }
        case 'CHANGE_DESCRIPTION': {
            const { input } = payload;
            return { ...state, description: input };
        }
        case 'CHANGE_START_DATE': {
            const { input } = payload;
            return { ...state, startDate: input };
        }
        case 'CHANGE_END_DATE': {
            const { input } = payload;
            return { ...state, endDate: input };
        }
        case 'FETCH_STARTED': {
            return { ...state, loading: true };
        }
        case 'FETCH_SUCCESS': {
            const { response } = payload;
            const startDate = formatDate.forInput(response.startDate)
            const endDate = formatDate.forInput(response.endDate)
            return { ...state, ...response, loading: false, startDate, endDate };
        }
        case 'FETCH_ERROR': {
            const { error } = payload;
            return { ...emptySurvey(), error: error, loading: false };
        }
        case 'CREATE_STARTED': {
            return { ...state, loading: true };
        }
        case 'CREATE_SUCCESS': {
            return { ...emptySurvey(), loading: false };
        }
        case 'CREATE_ERROR': {
            const { error } = payload;
            return { ...state, error: error, loading: false, };
        }
        case 'UPDATE_STARTED': {
            return { ...state, loading: true };
        }
        case 'UPDATE_SUCCESS': {
            return { ...emptySurvey(), loading: false };
        }
        case 'UPDATE_ERROR': {
            const { error } = payload;
            return { ...state, error: error, loading: false, };
        }
        case 'DELETE_STARTED': {
            return { ...state, loading: true };
        }
        case 'DELETE_SUCCESS': {
            return { ...emptySurvey(), loading: false };
        }
        case 'DELETE_ERROR': {
            const { error } = payload;
            return { ...state, error: error, loading: false, };
        }
        default: {
            return state;
        }
    }
}

const generateField = (fieldType) => ({
    fieldType: fieldType,
    question: '',
    options: {},
    expectedResponse: ''
})
const emptySurvey = () => ({
    _id: undefined,
    name: '',
    description: '',
    author: 'cschwalm',
    startDate: formatDate.forInput(),
    endDate: '',
    fields: [],
    loading: false,
    error: null
});


export default manageSurveyReducer;