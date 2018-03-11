import {
    CHECKING_IN,
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

export const updateCheckins = () => {
    return {
        type: UPDATE_CHECKINS
    }
}

export const checkIn = info => {
    return {
        type: CHECKING_IN, 
        info: info
    }
}

export const createGoal = info => {
    return {
        type: CREATING_GOAL, 
        info: info
    }
}

export const completeGoal = info => {
    return {
        type: COMPLETING_GOAL, 
        info: info
    }
}

export const deleteGoal = info => {
    return {
        type: DELETE_GOAL,
        info: info
    }
}

export const openGoalPopover = () => {
    return {
        type: OPEN_GOAL_POPOVER, 
    }
}

export const hideGoalPopover = () => {
    return {
        type: HIDE_GOAL_POPOVER, 
    }
}

export const openCategory = i => {
    return {
        type: OPEN_CATEGORY, 
        i: i
    }
}

export const openMenuPopover = () => {
    return {
        type: OPEN_MENU_POPOVER
    }
}

export const hideMenuPopover = () => {
    return {
        type: HIDE_MENU_POPOVER
    }
}

export const createCategory = (title, color) => {
    return {
        type: CREATE_CATEGORY,
        title: title,
        color: color
    }
}

export const updateNewColor = i => {
    return {
        type: UPDATE_NEW_COLOR,
        i: i
    }
}

export const openEditCategory = () => {
    return {
        type: OPEN_EDIT_CATEGORY,
    }
}

export const hideEditCategory = () => {
    return {
        type: HIDE_EDIT_CATEGORY,
    }
}

export const editCategoryColor = (newColor, newColorIndex) => {
    return {
        type: EDIT_CATEGORY_COLOR,
        newColor: newColor,
        newColorIndex: newColorIndex
    }
}

export const editCategoryTitle = title => {
    return {
        type: EDIT_CATEGORY_TITLE,
        title: title,
    }
}

export const deleteCategory = () => {
    return {
        type: DELETE_CATEGORY
    }
}