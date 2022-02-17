export default {
    data(){
        return{
            apiUrl : 'https://vue3-course-api.hexschool.io/v2' ,
            apiPath : 'nd5726-hexschool',
            open_detail : false,
            tempProduct : []
        }
    },
    props : ['id'],
    watch:{
        id(){
            this.getProduct(this.id);
        }
    },
    methods :{
        getProduct(id){
            axios.get(`${this.apiUrl}/api/${this.apiPath}/product/${id}`)
            .then((res)=>{
                this.tempProduct = res.data.product;
            })
            .catch((err)=>{
            })
        }
    },
    mounted(){
    },
    template: `
    <div id="detailModal"  aria-hidden="true" v-show="open_detail" class="flex overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 justify-center items-center h-modal md:h-full md:inset-0 bg-black bg-opacity-80 ">
        <div class="flex flex-col w-3/5 relative shadow-xl">
            <button type="button"  @click="open_detail = false" class="absolute right-4 top-4 text-gray-700 bg-transparent hover:bg-gray-200 hover:text-white rounded-lg text-lg p-1.5 ml-auto inline-flex items-center hover:bg-gray-600 hover:text-white">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <div class=" shrink-0 border-l-8 border-slate-600 flex item-start bg-gray-200 p-8">
                <div class="flex w-1/2 flex-shrink-0 flex-col items-stretch">
                    <div class="w-full">
                        <img v-bind:src="tempProduct.imageUrl" v-bind:alt="tempProduct.title">
                    </div>
                    <ul class="w-full mt-4 flex imageslist">
                        <li v-for="images in tempProduct.imagesUrl" class="mb-4 w-1/5 pr-4">
                            <img v-bind:src="images" alt="">
                        </li>
                    </ul>
                </div>
                <div class="flex flex-col items-start p-8">
                    <div class="flex items-center">
                        <h1 class="text-slate-600 text-2xl font-bold mr-4">{{ tempProduct.title }}</h1>
                        <span class="text-white bg-gray-500 rounded text-sm px-2 py-1">{{ tempProduct.category }}</span>
                    </div>
                    
                    <p class="text-gray-500 text-base font-bold my-2">{{ tempProduct.description }}</p>
                    <p class="text-gray-500 text-base font-bold my-2">{{ tempProduct.content }}</p>
                    <p class="text-slate-600 text-lg font-bold mr-4">售價 : {{ tempProduct.price }} /<span class="line-through ml-2">{{ tempProduct.origin_price }}</span> {{ tempProduct.unit }}</p>
                </div>
                
            </div>
        </div>
    </div>
    `
}