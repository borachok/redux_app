const initialState = {
  menu: [],
  loading: true,
  items: [],
  totalPrice: 0
}

const reducer =(state = initialState, action) => {
  switch (action.type) {
    case 'MENU_LOADED':
      return {
        ...state,
        menu: action.payload,
        loading: false
      };
    case 'MENU_REQUSTED':
      return {
        ...state,
        menu: state.menu,
        loading: true
      }
    case 'ITEM_ADD_TO_CART':
      const id =action.payload;
      const item = state.menu.find(item => item.id === id);
      const newItem = {
        title: item.title,
        price: item.price,
        url: item.url,
        id: item.id
      };
      const totalPrice = state.totalPrice + item.price

      return {
        ...state,
        items: [
          ...state.items,
          newItem
        ],
        totalPrice: totalPrice
      }
    case 'ITEM_REMOVE_FROM_CART':
      const idx = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === idx);
      const price = state.items[itemIndex]['price']
      return {
        ...state,
        items: [
          ...state.items.slice(0, itemIndex),
          ...state.items.slice(itemIndex + 1)
        ],
        totalPrice: state.totalPrice - price
      }
    default:
      return state
  }
}

export default reducer;