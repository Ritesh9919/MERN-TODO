

import { todoReducer } from "./reducer/todoReducer";
import {configureStore} from '@reduxjs/toolkit';


export const store = configureStore({
    reducer:{
        todoReducer
    }
})