import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import pagination from './pagination.js';
import edit_product from  './edit_product.js';

const token = document.cookie.replace(/(?:(?:^|.*;\s*)hextoken\s*\=\s*([^;]*).*$)|^.*$/, "$1"); //取得cookie內的token
axios.defaults.headers.common['Authorization'] = token; // 夾帶到axios的header驗證資訊中

const app = createApp({
    data(){
        return {
            apiUrl : 'https://vue3-course-api.hexschool.io/v2' ,
            apiPath : 'nd5726-hexschool',
            products : [],
            tempProduct :{
                imagesUrl : [],
            },
            isNew : false,
            pagination :[],
            showFormModal : false,
            showDeleteModal : false,
        }
    },
    methods: {
        checkLogin(){
            axios.post(`${this.apiUrl}/api/user/check`)
            .then((res)=>{
                this.getProducts();
            })
            .catch((error)=>{
                window.alert("請先登入 !!");
                location.href="index.html";
            })
        },
        getProducts(page = 1) {
            axios.get(`${this.apiUrl}/api/${this.apiPath}/admin/products/?page=${page}`)
            .then((res)=>{
                this.products = res.data.products ;
                this.pagination =  res.data.pagination ;
            })
            .catch((error)=>{
                console.dir(error);
            })
        },
        openFormModal( option , item ){
            if(option == 'edit'){
                this.tempProduct = { ...item };
                this.showFormModal = true;
                console.log(this.tempProduct);
                this.isNew = false;
            }else if( option == 'new'){
                this.tempProduct = {
                    imagesUrl : []
                };
                this.isNew = true;
                this.showFormModal = true;
            }else{
                this.tempProduct = { ...item };
                this.showDeleteModal = true;
            }
        },
        closeFormModal(){
            this.showFormModal = false;
        },
        closeDeleteModal(){
            this.showDeleteModal = false;
        },
        updateProduct(){
            if(this.isNew == true){
                axios.post( `${this.apiUrl}/api/${this.apiPath}/admin/product` , { data: this.tempProduct }  )
                .then((res)=>{
                    this.showFormModal = false;
                    this.getProducts();
                })
                .catch((error)=>{
                    console.dir(error);
                })
            }else{
                axios.put( `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}` , { data: this.tempProduct } )
                .then((res)=>{
                    this.showFormModal = false;
                    this.getProducts();
                })
                .catch((error)=>{
                    console.dir(error);
                })
            }
        },
        deleteProduct(){
            axios.delete( `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}` , { data: this.tempProduct } )
            .then((res)=>{
                    this.showDeleteModal = false;
                    this.getProducts();
                })
                .catch((error)=>{
                    console.dir(error);
                })
        },
        addImage(){
            if(this.tempProduct.imagesUrl == undefined ){
                this.tempProduct.imagesUrl = []; // 如果原本沒有更多圖片，新增一個空陣列
            }
            this.tempProduct.imagesUrl.push('');
        }
    },
    mounted(){
        this.checkLogin();

    },
    components : {
        pagination , edit_product
    }
});

app.component('delete_product',{
    props:['showDeleteModal','tempProduct'],
    template : '#deleteModal'
})

app.mount('#app');
