import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import noteServie from './noteService'

 const initialState = {
    notes:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}


export const getNotes = createAsyncThunk('notes/getAll', async (ticketId, thunkAPI) => {
 try {
    const token = thunkAPI.getState().auth.user.token
    return await noteServie.getNotes(ticketId, token)
 }catch(error) {
    const message = (error && error.response && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
 }
})

export const createNote = createAsyncThunk('notes/create', async ({noteText,ticketId}, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token
    try {
        return await noteServie.createNote(noteText, ticketId, token)
    } catch (error) {
        
    }
} )

export const noteSlice = createSlice({
name:'note',
initialState,
reducers:{
    reset : (state) => initialState
},
extraReducers:(builder) => {
    builder
    .addCase(getNotes.pending, (state)=> {
        state.isLoading = true
    })
    .addCase(getNotes.fulfilled, (state,action)=> {
        state.isSuccess = true
        state.isLoading = false
        state.notes = action.payload
        console.log(state.notes);
    })
    .addCase(getNotes.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
    .addCase(createNote.pending, (state)=> {
        state.isLoading = true
    })
    .addCase(createNote.fulfilled, (state,action)=> {
        state.isSuccess = true
        state.isLoading = false
        state.notes.push(action.payload)
    })
    .addCase(createNote.rejected, (state, action)=> {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
    })
}
})
export const {  reset } = noteSlice.actions
export default noteSlice.reducer