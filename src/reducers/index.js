import { LIST_FOOD } from "../Action/constant"

const initialValue = {
    foods : []
}

const foodRedcer = (state=initialValue,action) => {
    switch(action.type){
        case LIST_FOOD:
            return {
                ...state,
                foods:action.payload
            }
        default:
            return state
    }
}

export default foodRedcer