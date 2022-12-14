import { cate } from "../../api/cate"
import { AddProduct } from "../../api/product"
import { UploadFile } from "../../api/upload"
import Header from "../../component/header/admin"
import SidebarAdmin from "../../component/sidebar/admin"

const AddProd = {
  render: async () => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (!user) {
      location.href = "/signin"
    }
    if (user.role != 1) {
      alert("Bạn không phải Admin")
      location.href = "/"
    }
    const listcate: Category = await cate()
    return /*html*/`
        ${Header.render()}
        <div class="flex mt-3">
            <div class="w-[250px] flex-none">
            ${SidebarAdmin.render()}
            </div>
            <div class="bg-gray-100 w-full ">
            <div class="mx-auto w-[87%]  pb-10">
            <div class="bg-gray-100 w-full">
                <div class="mx-10">
                    <div class="flex justify-between my-5">
                        <h1 class="text-xl font-bold">
                            Thêm mới sản phẩm
                        </h1>
                    </div>
                    <div id="formAdd" action="">
                      <div class="grid grid-cols-3 gap-8 ">
                          
                          <div class="bg-white text-center mb-3 w-full text-gray-700 h-[310px] drop-shadow-md">
                          <div class="text-red-500" id="error-img"></div>
                            <div class="relative w-full h-64 mb-6 flex justify-center items-center text-center ">
                                <input accept=".jpg, .jpeg .png, .svg, .webp" class="relative z-10 opacity-0 h-full w-full cursor-pointer  drop-shadow-md" type="file" name="bgfile" id="image">
                                <div class="absolute  right-0 left-0 w-full h-full m-auo flex justify-center drop-shadow-md">
                                    <div class="text-center ">
                                      <svg xmlns="http://www.w3.org/2000/svg" id="plus" class="w-20 h-20 translate-y-28 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd" />
                                      </svg>
                                      <img class="w-72 max-h-[200px] my-auto"  id="preview" />
                                    </div>
                                </div>
                            </div>
                            
                          <br>
                          <div class="mt-5  drop-shadow-md">
                            <textarea id="shortDesc" class="w-full rounded-b-lg p-3"  placeholder="Mô tả ngắn:"  name="" id="" cols="30" rows="10"></textarea>
                            <div class="text-red-500" id="erShort"></div>
                          </div>
                        </div>
                        <div class="col-span-2 text-gray-700">
                          <h1 class="text-[16px] text-lg">Thông tin sản phẩm</h1>
                          <hr>
                          <div class="mt-5">
                            <label for="">Tên sản phẩm</label>
                            <br>
                            <input id="name" class="w-full mr-10 rounded-md h-8 my-4  p-3" type="text">
                            <div class="text-red-500" id="erName"></div>
                          </div>
                          <div class="flex">
                            <div class="mt-5 w-1/2 mr-1">
                              <label for="">Giá gốc</label>
                              <br>
                              <input id="price" class="w-full mr-10 rounded-md h-8 my-4 p-3" type="number">
                            <div class="text-red-500" id="erPrice"></div>
                            </div>
                            <div class="mt-5 w-1/2 ml-1">
                              <label for="">Giá khuyến mãi</label>
                              <br>
                              <input id="sale" class="w-full mr-10 rounded-md h-8 my-4 p-3" type="number">
                            <div class="text-red-500" id="erSale"></div>
                            </div>
                          </div>
                          <div class="mt-5 w-1/2">
                            <label for="">Danh mục</label>
                            <br>
                            <select class="w-full mr-10 rounded-md h-8 my-4" name="" id="cate">
                              ${listcate.data.map((item) => `
                              <option value="${item.id}">${item.name}</option>
                              `)}
                            </select>
                          </div>
                          <div class="">
                            <label for="">Đặc điểm nổi bật</label>
                            <br>
                            <textarea class="w-full rounded-md my-4  p-3" name="" id="salientfeatures" cols="30" rows="10"></textarea>
                            <div class="text-red-500" id="erVip"></div>
                            </div>
                          <div class="">
                            <label for="">Mô tả dài</label>
                            <br>
                            <textarea  class="w-full rounded-md my-4  p-3" name="" id="longDesc" cols="30" rows="10"></textarea>
                            <div class="text-red-500 my-1" id="erLong"></div>
                            <br>
                            </div>
                        <button class="w-[96px] h-[34px] bg-blue-400 hover:bg-blue-500 text-white rounded-md" type="submit" id="btn-add">Thêm mới</button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
          </div>
            </div>
        `
  },
  afterRender: async () => {
    const formAdd = document.querySelector("#btn-add")

    const vldImg: any = document.querySelector("#error-img")
    const image = document.querySelector("#image")
    const erName = document.querySelector("#erName")
    const erShort = document.querySelector("#erShort")
    const erPrice = document.querySelector("#erPrice")
    const erVip = document.querySelector("#erVip")
    const erLong = document.querySelector("#erLong")
    const preview = document.querySelector("#preview")
    const plus = document.querySelector("#plus")

    formAdd?.addEventListener('click', async function (e) {
      e.preventDefault
      const name = document.querySelector('#name')?.value
      const price = document.querySelector('#price')?.value
      const sale = document.querySelector('#sale')?.value
      const longDesc = document.querySelector('#longDesc')?.value
      const shortDesc = document.querySelector('#shortDesc')?.value
      const salientfeatures = document.querySelector('#salientfeatures')?.value
      const category = document.querySelector('#cate')?.value

      if (name == "") {
        erName.innerHTML = "Chưa nhập tên cho sản phẩm"
        console.log("ez");
      } else {
        erName.innerHTML = ""

      }
      if (price == "") {
        erPrice.innerHTML = "Chưa nhập giá cho sản phẩm"
      }
      else {
        erPrice.innerHTML = ""

      }
      if (longDesc == "") {
        erLong.innerHTML = "Chưa nhập mô tả dài"
      }
      else {
        erLong.innerHTML = ""

      }
      if (shortDesc == "") {
        erShort.innerHTML = "Chưa nhập mô tả ngắn cho sản phẩm"
      } else {
        erShort.innerHTML = ""

      }
      if (salientfeatures == "") {
        erVip.innerHTML = "Chưa nhập đặc điểm cho sản phẩm"
      }
      else {
        erVip.innerHTML = ""

      }
      if (salientfeatures == "") {
        erVip.innerHTML = "Chưa nhập đặc điểm cho sản phẩm"
      }
      else {
        erVip.innerHTML = ""

      }
      if (preview.src == "") {
        vldImg.innerHTML = "Chưa chọn ảnh cho sản phẩm"
      } else {
        vldImg.innerHTML = ""

      }
      if (name != "" && price != "" && sale != "" && longDesc != "" && shortDesc != "" && salientfeatures != "") {
        const product: Product = {
          image: preview?.src,
          name: name,
          price: price,
          sale: sale,
          longDesc: longDesc,
          shortDesc: shortDesc,
          salientfeatures: salientfeatures,
          category: category,
          isDelete: false
        }
        const data = await AddProduct(product)
        if (data) {
          alert("Thêm thành công")
          location.href = "/admin/products"
        }
        console.log("Lỗi cmnr");
      }
    })
    image?.addEventListener('change', async (e) => {
      // console.log(e.target.files)
      const file = e.target.files[0]
      if (file.size > 250000) {
        vldImg.innerHTML = "File quá lớn"

      } if (file === "") {
        vldImg.innerHTML = "Chưa thêm ảnh"
      }
      else {
        vldImg.innerHTML = ""
        plus.classList = "hidden"
        const res = await UploadFile(file)
        const data = res.data
        preview.src = data.url
      }

    })
  }

}
export default AddProd