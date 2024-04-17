import { axiosClient } from "./axiosClient";

export const productApi = {
  listLimit() {
    const url = `/products?_page=1&_limit=12`;
    return axiosClient.get(url);
  },
  list() {
    const url = `/products`;
    return axiosClient.get(url);
  },
  productByCategory(id) {
    const url = `/products/categories/${id}`;
    return axiosClient.get(url);
  },
  read(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },
  relateProduct(id) {
    const url = `/products/related/${id}`;
    return axiosClient.get(url);
  },
  add(product) {
    const url = `/products`;
    return axiosClient.post(url, product);
  },
  update(id, data) {
    const url = `/products/${id}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/products/${id}`;
    return axiosClient.delete(url);
  },
  search(textSearch) {
    const url = `/products/search?name_like=${textSearch}`;
    return axiosClient.get(url);
  },
  filterPrice(price1, price2) {
    const url = `/products/filterPrice?price1=${price1}&price2=${price2}`;
    return axiosClient.get(url);
  },
  sortPrice(level) {
    const url = `/products/sortPrice?level=${level}`;
    return axiosClient.get(url);
  },
};
export default productApi;
