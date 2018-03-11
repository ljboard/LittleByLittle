import { combineReducers } from 'redux';
 
import {
    CHECKING_IN,
    CHECKED_IN,
    SKIPPED_CHECKIN,
    UPDATE_CHECKINS,
    COMPLETING_GOAL,
    CREATING_GOAL,
    DELETE_GOAL,
    OPEN_GOAL_POPOVER,
    HIDE_GOAL_POPOVER,
    OPEN_CATEGORY,
    OPEN_MENU_POPOVER,
    HIDE_MENU_POPOVER,
    CREATE_CATEGORY,
    UPDATE_NEW_COLOR,
    OPEN_EDIT_CATEGORY,
    HIDE_EDIT_CATEGORY,
    EDIT_CATEGORY_COLOR,
    EDIT_CATEGORY_TITLE,
    DELETE_CATEGORY
} from '../constants';

const deepCopy = x => JSON.parse(JSON.stringify(x));

const initialGoals = [
    { action: COMPLETING_GOAL, title: "Met my first goal"},
];

const formatDate = date => {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "November", "December"];

    return formattedDate = days[date.getDay()] + " " 
        + months[date.getMonth()] + " " 
        + date.getDate() + ", " + date.getFullYear();
}
const initialHistory = [
    { action: DELETE_GOAL, date: formatDate(new Date()), title: "Set up this category"},
];

const initialState = { 
    page: -1,
    categoryOptions: {
        showGoalPopover: false,
        editPopover: {
            show: false,
            colorIndex: 0,
            colorString: "",
        },
    },
    menuOptions: {
        showMenuPopover: false,
        selectedMenuColor: 0,
    },
    categories: [
        { 
            title: "Move", 
            color: "#6aed3b",
            goals: initialGoals,
            history: initialHistory
        },
        { 
            title: "Stretch", 
            color: "#3bed94", 
            goals: initialGoals,
            history: initialHistory
        },
        { 
            title: "Eat", 
            color: "#3bedc3",
            goals: initialGoals,
            history: initialHistory
        },
        { 
            title: "Explore", 
            color: "#00d8ff",
            goals: initialGoals,
            history: initialHistory
        },
    ],
};
 
const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHECKINS: 
            let date = new Date();
            date.setDate(date.getDate() - 1);

            let i = 0;
            let missedDays = [];
            while (formatDate(date) !== state.categories[state.page].history[0].date && i < 50) {
                i ++;
                missedDays.push({ 
                    action: SKIPPED_CHECKIN, 
                    date: formatDate(date), 
                });
                date.setDate(date.getDate() - 1);
            }
            if (i < 50) {
                state.categories[state.page].history = missedDays.concat(state.categories[state.page].history);
            }
            return deepCopy(state);
        case CHECKING_IN:
            const newCheckin = { 
                action: CHECKED_IN, 
                date: formatDate(new Date()), 
            };
            let hasCheckedIn = false;
            for (let i = 0; i < state.categories[state.page].history.length; i++) {
                if (state.categories[state.page].history[i].action === CHECKED_IN) {
                    if (state.categories[state.page].history[i].date !== formatDate(new Date())) {
                        state.categories[state.page].history.unshift(newCheckin);
                    }
                    hasCheckedIn = true;
                    break;
                }
            }
            if (! hasCheckedIn) state.categories[state.page].history.unshift(newCheckin);
            return deepCopy(state);
        case CREATING_GOAL: 
            const newGoal = {
                action: COMPLETING_GOAL,
                title: action.info.title
            }; 
            state.categories[state.page].goals.unshift(newGoal);
            return deepCopy(state);
        case COMPLETING_GOAL:
            const newCompletedGoal = { 
                action: DELETE_GOAL, 
                date: formatDate(new Date()), 
                title: action.info.title
            };
            state.categories[state.page].history.unshift(newCompletedGoal);

            let completedI = -1;
            for (let i = 0; i < state.categories[state.page].goals.length; i++) {
                if (state.categories[state.page].goals[i].title === action.info.title) {
                    completedI = i;
                }
            }
            if (completedI !== -1) {
                state.categories[state.page].goals.splice(completedI, 1);
            }
            return deepCopy(state);
        case DELETE_GOAL: 
            let goalI = -1;
            for (let i = 0; i < state.categories[state.page].history.length; i++) {
                if (state.categories[state.page].history[i].title === action.info.title) {
                    goalI = i;
                }
            }
            if (goalI !== -1) {
                state.categories[state.page].history.splice(goalI, 1);
            }
            return deepCopy(state);
        case OPEN_GOAL_POPOVER: 
            state.categoryOptions.showGoalPopover = true;
            return deepCopy(state);
        case HIDE_GOAL_POPOVER: 
            state.categoryOptions.showGoalPopover = false;
            return deepCopy(state);
        case OPEN_CATEGORY: 
            state.page = action.i;
            return deepCopy(state);
        case OPEN_MENU_POPOVER: 
            state.menuOptions.showMenuPopover = true;
            return deepCopy(state);
        case HIDE_MENU_POPOVER: 
            state.menuOptions.showMenuPopover = false;
            return deepCopy(state);
        case CREATE_CATEGORY: 
            const newCategory = {
                title: action.title,
                color: action.color,
                history: initialHistory,
                goals: initialGoals
            }; 
            state.categories.push(newCategory);
            return deepCopy(state);
        case UPDATE_NEW_COLOR: 
            state.menuOptions.selectedMenuColor = action.i;
            return deepCopy(state);
        case OPEN_EDIT_CATEGORY:
            state.categoryOptions.editPopover.show = true;
            return deepCopy(state);
        case HIDE_EDIT_CATEGORY:
            state.categoryOptions.editPopover.show = false;
            return deepCopy(state);
        case EDIT_CATEGORY_COLOR:
            state.categories[state.page].color = action.newColor;
            state.categoryOptions.editPopover.colorIndex = action.newColorIndex;
            return deepCopy(state);
        case EDIT_CATEGORY_TITLE:
            state.categories[state.page].title = action.title;
            return deepCopy(state);
        case DELETE_CATEGORY: 
            state.categories.splice(state.page, 1);
            state.page = -1;
            return deepCopy(state);
        default:
            return deepCopy(state);
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;