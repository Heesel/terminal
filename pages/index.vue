<template>
    <div class="h-screen flex flex-col m-6">
        <div class="inverse-toggle h-3/4 px-5 shadow-2xl text-gray-100 text-sm font-mono subpixel-antialiased bg-gray-800 pt-4 rounded-lg loading-normal overflow-hidden pr-0">
            <div class="mb-2 flex gap-x-3 h-3">
                <div class="bg-red-500 h-3 w-3 rounded-full"></div>
                <div class="bg-orange-300 h-3 w-3 rounded-full"></div>
                <div class="bg-green-500 h-3 w-3 rounded-full"></div>
            </div>
            <div class="h-[calc(100%-1.75rem)] overflow-y-auto scrollbar">
                <div class="flex flex-col mt-4 text-gray-500">
                    <VueWriter :array="['Web terminal [Version 1.0.2]']" :typeSpeed="70" :iterations="1" />
                    <VueWriter :array="[`&copy; Hessel P ${date}. All rights served`]" :typeSpeed="70" :start="70" :iterations="1" />
                    <br/>
                    <VueWriter :array="[`Use the help command to get started`]" :typeSpeed="70" :start="70" :iterations="1" />
                    
                </div>
                <div class="flex flex-col lines">
                    <!-- v-for -->
                    <div class="flex mt-4 justify-start" v-for="(line, index) in lines" :key="index">
                        <template v-if="line.type === 'input'">
                            <span id="prefix" class="text-green-400">computer:~$</span>
                            <input v-if="inputVisible" @keydown="previousCommands" v-model="text" @keypress.enter="enterPressed" class="border-0 border-transparent w-full bg-transparent focus:outline-none focus:ring-0" />
                        </template>
                        <span v-html="line.text" class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0"></span>
                    </div>
                    <!-- /v-for-->
                    
                    <div class="flex mt-4">
                        <span id="prefix" class="text-green-400">computer:~$</span>
                        <input v-model="text" @keydown="previousCommands" @keypress.enter="enterPressed" class="border-0 border-transparent w-full bg-transparent ml-3 focus:outline-none focus:ring-0" />
                    </div>
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
            const history = [];
            const inputVisible = ref(true);
            const currentCommandIndex = ref(-1);
            
            const enterPressed = () => {
                const command = text.value;
                if(typeof command !== 'string' || command.length === 0) return;
                
                lines.push({ text: command, type: "input" });
                history.unshift({ text: command, type: "history" });
                executeCommand({command, lines, currentCommandIndex});

                text.value = "";
                inputVisible.value = false;
            };

            const previousCommands = (event) => {
                if(history.length === 0) return;

                //if neither arrow up now arrow down is pressed, we will not do anything.
                if(![38, 40].includes(event.keyCode)) return;

                //up arrow - moves backward in time
                if (event.keyCode === 38 && currentCommandIndex.value < history.length - 1)
                    currentCommandIndex.value = currentCommandIndex.value + 1;
                //down arrow - moves forward in time
                if (event.keyCode === 40 && currentCommandIndex.value > -1)
                    currentCommandIndex.value = currentCommandIndex.value - 1;

                //if index is not -1, we'll put in a command from history
                if(currentCommandIndex.value !== -1) {
                    text.value = history[currentCommandIndex.value].text;
                //if index is -1 and text is not empty, we'll clear the text
                } else if (currentCommandIndex.value === -1 && text.value.length > 0) 
                    text.value = '';
                else {
                    return
                }
            }

            return { lines, enterPressed, date, text, inputVisible, previousCommands };
        },
    };
</script>
