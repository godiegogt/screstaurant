import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IParam } from './interfaces/IParam'

export const configurationSlide = createSlice({
  name: 'configuration',
  initialState: {
    isAuth: false,
    token: {
      data: '',
      expiration_date: 0
    },
    userData: { name: "", roomDefaultId: 0, userId: 0 },
    products: [],
    POSBT: '',
    canChangePrice: "Si",
    calcIDP: 0,
    havePrinter: {
      name: "Si",
      index: 0
    },
    printerConfig: {
      id: 0,
      name: "60 mm",
      spaces: 32,
      amountSize: 5,
      detailSize: 14,
      priceSize: 10
    },
    errormessage: "",
    BTPermission: "",
    allowSellStock: "Si",
    POS_TC: "0",
    LogoQRImpresion: 0,
    AutoImpresion: 'No',
    ModoTouch: 'No',
    BodegaDefault: 0,
    CambiarBodega: '',
    PreciosEspeciales: '',
    stores: [],
    pricesNames: [],
    params: [] as IParam[],
    URL:'https://apprest.solutioncenter.com.gt/Api'
  },
  reducers: {
    login: (state, action: PayloadAction<{ name: string, roomDefaultId: number, userId: number }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = true,
        state.userData = action.payload
    },
    logOut: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = false,
        state.token.data = ''
    },
    updateHavePrinter: (state, action: PayloadAction<{ name: string, index: number }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.havePrinter = action.payload

    },
    updatePrinterConfig: (state, acition: PayloadAction<{ id: number, name: string, spaces: number, amountSize: number, detailSize: number, priceSize: number }>) => {
      state.printerConfig = acition.payload
    },
    updateBluetoothPermission: (state, acition: PayloadAction<string>) => {
      state.BTPermission = acition.payload
    },
    updatePOSID: (state, acition: PayloadAction<string>) => {
      state.POSBT = acition.payload
    },
    updateToken: (state, acition: PayloadAction<{ data: string, expiration_date: number }>) => {
      state.token = acition.payload
    },
    updateParams: (state, acition: PayloadAction<IParam[]>) => {
      state.params = acition.payload;
    },
    updateURL:(state,action:PayloadAction<string>)=>{
state.URL=action.payload
    }


  },
})

export const { login, logOut, updateHavePrinter, updatePrinterConfig, updateBluetoothPermission, updatePOSID, updateToken,updateParams,updateURL } = configurationSlide.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectConfig = (state: any) => state.configuration.isAuth

export default configurationSlide.reducer
