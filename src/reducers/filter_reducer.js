import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "../context/products_context";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);

      return {
        ...state,
        filtered_products: [...action.payload],
        all_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return {
        ...state,
        grid_view: true,
      };
    case SET_LISTVIEW:
      return {
        ...state,
        grid_view: false,
      };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          //  a.price - b.price
          //如果a.price小于b的情况，所以我们要返回-1，这个代表a需要放在b的前面
          if (a.price < b.price) {
            return -1;
          }
          //如果a.price大于b的情况，所以我们要返回1，这个代表a需要放在b的后面
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => b.price - a.price);
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.title && b.title) {
            return a.title.localeCompare(b.title);
          }
          console.error("Missing name:", a, b);
          return 0; // Handle the case where a.name or b.name is undefined
        });
      }

      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          if (a.title && b.title) {
            return b.title.localeCompare(a.title); // Reverse order here
          }
          console.error("Missing name:", a, b);
          return 0; // Handle the case where a.name or b.name is undefined
        });
      }

      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      //解构数值，每次改变filer的时候，里面的数值也会改变
      const { text, category, company, color, price, shipping } = state.filters;
      let temp_Products = [...all_products];

      //filtering
      //text
      if (text) {
        const searchText = text.toLowerCase(); // Convert search text to lowercase
        temp_Products = temp_Products.filter((product) => {
          // Check if product.title is defined before using toLowerCase
          if (product.title) {
            const productTitle = product.title.toLowerCase(); // Convert product title to lowercase
            return productTitle.startsWith(searchText);
          }
          return false; // Handle the case where product.title is undefined
        });
      }

      //category
      if (category !== "all") {
        temp_Products = temp_Products.filter(
          (product) => product.category === category
        );
      }
      //company
      if (company !== "all") {
        temp_Products = temp_Products.filter(
          (product) => product.brand === company
        );
      }
      //color
      if (color !== "all") {
        temp_Products = temp_Products.filter((product) => {
          //color返回的是数组，所以不能直接比较
          return product.colors.find((c) => c === color);
        });
      }
      //price
      temp_Products = temp_Products.filter((product) => product.price <= price);
      //shipping
      if (shipping) {
        temp_Products = temp_Products.filter(
          (product) => product.shipping === true
        );
      }
      return { ...state, filtered_products: temp_Products };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
