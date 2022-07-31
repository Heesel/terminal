<template>
    <div class="h-screen flex flex-col m-6">
        <div class="inverse-toggle h-3/4 px-5 shadow-2xl 
        text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800
        pt-4 rounded-lg loading-normal overflow-hidden">
            <div class="mb-2 flex gap-x-3">
                <div class="bg-red-500 h-3 w-3 rounded-full"></div>
                <div class="bg-orange-300 h-3 w-3 rounded-full"></div>
                <div class="bg-green-500 h-3 w-3 rounded-full"></div>
            </div>
            <div class="flex flex-col mt-4 text-gray-500">
                <VueWriter :array="['Web terminal [Version 1.0.2]']" :typeSpeed="70" :iterations="0"/>
                <VueWriter :array="[`&copy; Hessel P ${date}. All rights served`]" :typeSpeed="70" :start="70" :iterations="0"/>
                <span class="text-gray-500"></span>   
            </div>
            <div class="flex flex-col lines">
                <div class="flex mt-4">
                    <span class="text-green-400">computer:~$</span>
                    <input v-model="text" class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0"/>
                </div>
                <div class="mt-4 ml-4">
                    output
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import VueWriter from 'vue-writer'
export default {
    components: {
        VueWriter
    },
    setup() {     
        
        const date = new Date().getFullYear().toString()
        const text = ref('') 
        const newCommandLine = () => {
            const input = document.querySelector('input')
            const line = document.createElement('div')
            line.classList.add('flex', 'mt-4')
            line.innerHTML = `
                <span class="text-green-400">computer:~$</span>
                <input class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0"/>
            `

            document.querySelector('.lines').append(line)
            input.value = ''
        }

        onMounted(() => {
            document.querySelector('input').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    console.log(e)
                    newCommandLine()
                }
            })
            /**
            * @todo Implement commands.
            * 
            */
        })



        

        return { newCommandLine, date, text }
    }
}
</script>