<template>
    <div class="h-screen flex flex-col m-6">
        <div class="inverse-toggle h-3/4 px-5 shadow-2xl text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800 pt-4 rounded-lg loading-normal overflow-hidden">
            <div class="mb-2 flex gap-x-3">
                <div class="bg-red-500 h-3 w-3 rounded-full"></div>
                <div class="bg-orange-300 h-3 w-3 rounded-full"></div>
                <div class="bg-green-500 h-3 w-3 rounded-full"></div>
            </div>
            <div class="flex flex-col mt-4 text-gray-500">
                <VueWriter :array="['Web terminal [Version 1.0.2]']" :typeSpeed="70" :iterations="1" />
                <VueWriter :array="[`&copy; Hessel P ${date}. All rights served`]" :typeSpeed="70" :start="70" :iterations="1" />
                <span class="text-gray-500"></span>
            </div>
            <div class="flex flex-col lines">
                <!-- v-for -->
                <div class="flex mt-4 justify-start" v-for="(line, index) in lines" :key="index">
                    <template v-if="line.type === 'input'">
                        <span class="text-green-400">computer:~$</span>
                        <input v-if="inputVisible" v-model="text" @keypress.enter="enterPressed" class="border-0 border-transparent w-full bg-transparent focus:outline-none focus:ring-0" />
                    </template>
                    <span class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0">{{line.text}}</span>
                </div>
                <!-- /v-for-->
                <!-- input staat hieronder, als extra regel-->
                <div class="flex mt-4">
                    <span class="text-green-400">computer:~$</span>
                    <input v-model="text" @keypress.enter="enterPressed" class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { ref } from "vue";
    import VueWriter from "vue-writer";
    import { executeCommand } from "../scripts/command.js";
    export default {
        components: {
            VueWriter,
        },
        setup() {
            const date = new Date().getFullYear().toString();
            const text = ref("");
            const lines = [];
            const inputVisible = ref(true);


            const enterPressed = () => {
                const command = text.value;

                let output = executeCommand(command);

                lines.push({ text: command, type: "input" });
                lines.push(output);
                text.value = "";
                inputVisible.value = false;
            };

            return { lines, enterPressed, date, text, inputVisible };
        },
    };
</script>
