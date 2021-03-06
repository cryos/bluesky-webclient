import { ActionCreator, AnyAction, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { getOverview as getOverviewAPI,
    getQueuedPlans as getQueuedPlansAPI } from "./queueserver"
import { IPlanGetOverviewAction, IPlanLoadingAction, IPlanObjectsAction,
    IPlanState, IPlanObjectsState, PlanActionTypes} from "./queueserver"

const loading: ActionCreator<IPlanLoadingAction> = () => ({
    type: PlanActionTypes.LOADING
});

export const getOverview: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanState, null, IPlanGetOverviewAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plan = await getOverviewAPI();
        return dispatch({
          plan,
          type: PlanActionTypes.GETOVERVIEW
        });
    };
};

export const getQueuedPlans: ActionCreator<ThunkAction<Promise<AnyAction>, IPlanObjectsState, null, IPlanObjectsAction>> = () => {
    return async (dispatch: Dispatch) => {
        dispatch(loading());
        const plans = await getQueuedPlansAPI();
        return dispatch({
          plans,
          type: PlanActionTypes.GETPLANLIST
        });
    };
};
