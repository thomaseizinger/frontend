import {getNobt} from 'api/api';

import {actionHandlers as globalNobtActionHandlers, actionFactory as globalNobtActionFactory} from '../../../modules/NobtModule'

const actionNames = {
  CHANGE_TAB: 'Nobt.CHANGE_TAB',
  CHANGE_EXPENSES_VIEW_INFO: 'Nobt.CHANGE_EXPENSES_VIEW_INFO',
};


export const nobtActionFactory = {...globalNobtActionFactory,
  changeTab: (tabName) => ({type: actionNames.CHANGE_TAB, payload: {tabName: tabName}}),
  changeExpenseViewInfo: (filter, sort) => ({type: actionNames.CHANGE_EXPENSES_VIEW_INFO, payload: {filter, sort}}),
};

const actionHandlers = {...globalNobtActionHandlers,
  [actionNames.CHANGE_TAB]: (state, action) => {

    var tabNameIndexMapping = {
      'transactions': 0,
      'expenses': 1
    };

    var tabIndex = tabNameIndexMapping[action.payload.tabName] || 0;

    // TODO this is called often, maybe avoid somehow
    // debug(actionNames.CHANGE_TAB)(`Calculated selected tab index ${tabIndex} from name '${action.payload.tabName}'.`);

    return {...state, tabIndex : tabIndex};
  },
  [actionNames.CHANGE_EXPENSES_VIEW_INFO]: (state, action) => {

    const filter = action.payload.filter;
    const sort = action.payload.sort;

    var expensesFiltered = state.expenses;

    var filterIsNotAll = filter != '';
    if(filterIsNotAll){
      expensesFiltered = expensesFiltered.filter(e =>
        e.debtee.name ==filter ||
        e.debtors.filter(d => d.name ==filter).length > 0
      );
    }

    const sortFunction = {
      "Date": (a,b) => (a.debtee.raw < b.debtee.raw) ? 1 : ((b.debtee.raw < a.debtee.raw) ? -1 : 0),
      "Amount": (a,b) => (a.debtee.raw > b.debtee.raw) ? 1 : ((b.debtee.raw > a.debtee.raw) ? -1 : 0),
    }[sort];

    expensesFiltered = expensesFiltered.sort(sortFunction);

    return {...state, expensesFiltered,  expensesViewInfo: {...state.expensesViewInfo, filter, sort}};
  }
};

export const initialState = {
  total: 0,
  name: '',
  member: [],
  tabIndex: 0,
  expensesViewInfo: {filter: "", sort: "Date"}
};

export default function nobtReducer (state = initialState, action) {
  const handler = actionHandlers[action.type]
  return handler ? handler(state, action) : state
}