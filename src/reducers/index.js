import { LIST_FOOD,ADD_TO_CART } from "../Action/constant"

const initialValue = {
    foods : [],
    carts : [],
}

const foodRedcer = (state=initialValue,action) => {
    switch(action.type){
        case LIST_FOOD:
            return {
                ...state,
                foods:action.payload
            }
        case ADD_TO_CART:
            return {
                ...state,
                carts:action.payload
            }
        default:
            return state
    }
}

export default foodRedcer