export function loginStart (state) {
  state.loggingIn = true
}
export function loginStop (state, errorMessage) {
  state.loggingIn = false
  state.loginError = errorMessage
}

export function updateAccessToken (state, SLIM_SESSION_INFO) {
  if (SLIM_SESSION_INFO) {
    state.SLIM_SESSION_INFO = SLIM_SESSION_INFO
    // state.userFullName = SLIM_SESSION_INFO.name + ' ' + SLIM_SESSION_INFO.lastName
  } else {
    state.SLIM_SESSION_INFO = {}
  }
}
export function setCurrentModule (state, payload) {
  state.currentModel = payload.currentModel
  state.currentModule = payload.currentModule
}
export function googleBtnShow (state) {
  state.isContacts = true
}

export function googleBtnHide (state) {
  state.isContacts = false
}

export function tabInfoSales (state) {
  state.listCustomerInfo = true
}

export function tabInfoDependents (state) {
  state.listCustomerInfo = false
}

export function showAll (state) {
  state.customShowListable = 'Todos'
}

export function showNextMonth (state) {
  state.customShowListable = 'Mes Siguiente'
}

export function showCurrentMonth (state) {
  state.customShowListable = 'Mes Actual'
}
export function login (state, data) {
  localStorage.setItem('SLIM_SESSION_INFO', JSON.stringify(data.SLIM_SESSION_INFO))
  state.SLIM_SESSION_INFO = data.SLIM_SESSION_INFO
  state.user = data.user
}
export function dataUser (state, data) {
  console.log(data)
  state.user = data
}
export function logout (state) {
  localStorage.removeItem('SLIM_SESSION_INFO')
  state.SLIM_SESSION_INFO = ''
  state.user = ''
}

export function saveDataEvent (state, data) {
  localStorage.setItem('HEV_DATA_EVENT', JSON.stringify(data))
  state.HEV_DATA_EVENT = data.HEV_DATA_EVENT
  state.data_event = data.data_event
}
