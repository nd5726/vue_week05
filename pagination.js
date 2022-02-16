export default {
  props:['pages'],
  template : `
    <nav class="flex justify-center">
    <ul class="pagination flex font-bold items-center">
      <li class="bg-gray-200 text-white">
        <a class="flex px-4 py-2 mr-1" :class="{ 'text-black hover:text-white hover:bg-gray-700' : pages.has_pre }" href="#">＜</a>
      </li>
      <li class="bg-gray-200 text-black" v-for="page in pages.total_pages" :key="page+'page'">
        <a  class=" flex px-4 py-2 hover:bg-gray-700 hover:text-white" :class="{'text-white bg-gray-700' : pages.current_page == page }"  href="#" @click="$emit('get-product', page)" >{{ page }}</a>
      </li>
      <li class="bg-gray-200 text-white">
        <a class="flex px-4 py-2 mr-1" :class="{ 'text-black hover:text-white hover:bg-gray-700' : pages.has_next }"  href="#">＞</a>
      </li>
    </ul>
  </nav>`
}