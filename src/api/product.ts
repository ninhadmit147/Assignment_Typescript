import instance from "./config"

export const List = () => {
    return instance.get('/products')
}

export const Read = (id: number) => {
    return instance.get(`/products/${id}`)
}
export const Remove = (id: number) => {
    return instance.delete(`/products/${id}`)
}
export const Update = (product: Product[]) => {
    return instance.put(`/products/${product.id}`, product)
}
export const AddProduct = (product: Product[]) => {
    return instance.post('/products', product)
}
export const Listbycate = (category: number) => {
    return instance.get(`/products?category=${category}`)
}
export const statusProd = (product: Product) => {
    return instance.patch(`/products/${product.id}`, product)
}
export const Filter = (name: any) => {
    return instance.get(`/products?q=${name}`)
}