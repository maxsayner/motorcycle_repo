const initialState = {
  selectedModel: {},
  models: [],
  brands: [],
  modelType: [],
  user: {}
};

const UPDATE_SELECTED_MODEL = "UPDATE_SELECTED_MODEL";
const UPDATE_MODELS = "UPDATE_MODELS";
const UPDATE_BRANDS = "UPDATE_BRANDS";
const UPDATE_USER = "UPDATE_USER";

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_SELECTED_MODEL:
      return Object.assign({}, state, { selectedModel: action.payload });

    case UPDATE_MODELS:
      return Object.assign({}, state, { modelType: action.payload });

    case UPDATE_BRANDS:
      return Object.assign({}, state, { brands: action.payload });

    case UPDATE_USER:
      return Object.assign({}, state, { user: action.payload });

    default:
      return state;
  }
}

export function updateSelectedModel(selectedModel) {
  return {
    type: UPDATE_SELECTED_MODEL,
    payload: selectedModel
  };
}

export function updateModels(modelType) {
  return {
    type: UPDATE_MODELS,
    payload: modelType
  };
}

export function updateBrands(brands) {
  return {
    type: UPDATE_BRANDS,
    payload: brands
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    payload: user
  };
}

export default reducer;
