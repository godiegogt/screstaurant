import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export const configurationSlide = createSlice({
  name: 'configuration',
  initialState: {
    isAuth: false,
    token: {
      data: '',
      expiration_date: ''
    },
    userData: {},
    products: [],
    POSBT: '',
    canChangePrice: "Si",
    calcIDP: 0,
    exporttypes: {
      name: "Ticket",
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
    pricesNames: []
  },
  reducers: {
    login: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = true,
        state.token.data = 'asd234ad234'
    },
    logOut: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.isAuth = false,
        state.token.data = ''
    },
    updateExportType: (state, action: PayloadAction<{ name: string, index: number }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.exporttypes = action.payload

    },
    updatePrinterConfig: (state, acition: PayloadAction<{ id: number, name: string, spaces: number, amountSize: number, detailSize: number, priceSize: number }>) => {
      state.printerConfig = acition.payload
    },
    updateBluetoothPermission: (state, acition: PayloadAction<string>) => {
      state.BTPermission = acition.payload
    },
    updatePOSID: (state, acition: PayloadAction<string>) => {
      state.POSBT = acition.payload
    }


  },
})

export const { login, logOut, updateExportType, updatePrinterConfig, updateBluetoothPermission, updatePOSID } = configurationSlide.actions

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched


// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectConfig = (state: any) => state.configuration.isAuth

export default configurationSlide.reducer
