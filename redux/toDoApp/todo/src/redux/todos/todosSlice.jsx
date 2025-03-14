import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// API'den todo'ları getir
export const getTodosAsync = createAsyncThunk('todos/getTodosAsync', async () => {
    const res = await axios.get('http://localhost:7000/todos');
    return res.data;
});

// Yeni todo ekle
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
    const res = await axios.post('http://localhost:7000/todos', data);
    return res.data;
});

// toggleTodoAsync işlemi
export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => {
    const res = await axios.patch(`http://localhost:7000/todos/${id}`, data);
    return res.data;
});

// removeTodoAsync işlemi
export const removeTodoAsync = createAsyncThunk('todos/removeTodoAsync', async (id) => {
    await axios.delete(`http://localhost:7000/todos/${id}`);
    return { id }; 
});

const todosSlice = createSlice({
    name: 'todos',
    initialState: {
        items: [], 
        isLoading: false,
        error: null,
        activeFilter: 'all',
        addNewTodo:{
            isLoading:false,
            error:false
        }
    },
    
    reducers: {
        changeActiveFilter: (state, action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(item => !item.completed);
        },
    },
    extraReducers: (builder) => {
        builder
            // getTodosAsync durumları
            .addCase(getTodosAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodosAsync.fulfilled, (state, action) => {
                state.items = action.payload;
                state.isLoading = false;
            })
            .addCase(getTodosAsync.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            // addTodoAsync durumu
            .addCase(addTodoAsync.pending, (state) => {
                state.addNewTodo.isLoading = true;
            })
            .addCase(addTodoAsync.fulfilled, (state, action) => {
                state.items.push(action.payload);
                state.addNewTodo.isLoading = false;
            })
            .addCase(addTodoAsync.rejected, (state, action) => {
                state.addNewTodo.isLoading = false;
                state.error = action.error.message;
            })
            // toggleTodoAsync durumları
            .addCase(toggleTodoAsync.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(toggleTodoAsync.fulfilled, (state, action) => {
                const { id, completed } = action.payload;
                const index = state.items.findIndex(item => item.id === id);
                if (index !== -1) {
                    state.items[index].completed = completed;
                }
                state.isLoading = false;
            })
            // removeTodoAsync durumu
            .addCase(removeTodoAsync.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload.id);
            });
    }
});

export const selectTodos = state => state.todos.items;

export const selectFilteredTodos = (state) => {
    if (state.todos.activeFilter === 'all') {
        return state.todos.items;
    }
    return state.todos.items.filter(todo =>
        state.todos.activeFilter === 'active' ? !todo.completed : todo.completed
    );
};

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
