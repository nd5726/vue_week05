// import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';
import  productDetail  from './product-detail.js';
    
Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
        VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});
VeeValidateI18n.loadLocaleFromURL('./zh_TW.json');
VeeValidate.configure({
    generateMessage: VeeValidateI18n.localize('zh_TW'),
    validateOnInput: false, // 調整為：輸入文字時，就立即進行驗證
});

const app = Vue.createApp({
    data(){
        return{
            apiUrl : 'https://vue3-course-api.hexschool.io/v2' ,
            apiPath : 'nd5726-hexschool',
            tempProduct:[],
            productList : [],
            productID : '',
            isLoading :false,
            cartList:[],
            isLoadingitem : '',
            form : {
                user : {
                    name: '' ,
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
        }
    },
    methods :{
        getProduct(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/products/all`)
            .then((res)=>{
                this.productList = res.data.products;
            })
            .catch((err)=>{
            })
        },
        viewDetail(id){
            this.productID = id ;
            this.isLoading = true ;
            setTimeout(()=>{
                this.$refs.detailModal.open_detail = true ;
                this.isLoading = false ;
            },1000)
        },
        getCart(){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/cart`)
            .then((res)=>{
                this.cartList = res.data.data;
            })
            .catch((err)=>{
                
            })
        },
        addtoCart(id,qty = 1){
            this.isLoadingitem = id ;
            this.isLoading = true ;
            const data = {
                product_id :id,
                qty
            };
            axios.post(`${this.apiUrl}/api/${this.apiPath}/cart` , { data } )
            .then((res)=>{
                this.isLoadingitem = '';
                this.getCart();
                this.isLoading = false ;
                this.$refs.detailModal.open_detail = false ;
                alert(res.data.message);
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        deleteCartitem(id){
            this.isLoading = true ;
            this.isLoadingitem = id ;
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/cart/${id}`)
            .then((res)=>{
                this.isLoadingitem = '';
                this.isLoading = false ;
                alert(res.data.message);
                this.getCart();
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        deleteAllCart(){
            this.isLoading = true ;
            axios.delete(`${this.apiUrl}/api/${this.apiPath}/carts`)
            .then((res)=>{
                this.isLoading = false ;
                alert(res.data.message);
                this.getCart();
            })
            .catch((err)=>{
                alert(err.response.data.message);
                this.isLoading = false ;
            })
        },
        updateCart(item){
            const data = {
                product_id :item.product_id,
                qty : item.qty
            };
            axios.put(`${this.apiUrl}/api/${this.apiPath}/cart/${item.id}` , { data } )
            .then((res)=>{
                alert(res.data.message);
                this.getCart();
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })
        },
        onSubmit() {
            const data = this.form;
            axios.post(`${this.apiUrl}/api/${this.apiPath}/order` , { data } )
            .then((res)=>{
               alert(res.data.message);
               this.$refs.cartForm.resetForm();
               this.getCart();
            })
            .catch((err)=>{
                alert(err.response.data.message);
            })   
        }  
    },
    mounted(){
        this.getProduct();
        this.getCart();
    }
})
app.component('productDetail', productDetail );
app.component('loading', VueLoading.Component);

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');
