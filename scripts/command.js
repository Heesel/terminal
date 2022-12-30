function help() { 
    let list = document.createElement('ul');

    const items = [
        'hello world - prints hello world',
        'github - prints github link',
        'linkedin - prints linkedin link', 
        'help - shows this list',
        'colors - shows a list of colors',
        'color [color] - changes the color of the terminal',
        'clear - clears the terminal'
    ]

    items.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item;
        list.appendChild(li);
    });
    
    return list.innerHTML;
}

function colors() { 
    let list = document.createElement('ul');

    const colors = [
        { color: 'green', style: '#22c55e'},
        { color: 'red', style: '#dc2626'},
        { color: 'blue', style: '#2563eb'},
        { color: 'yellow', style: '#facc15'},
        { color: 'orange', style: '#f97316'},
        { color: 'purple', style: '#9333ea'},
    ]

    colors.forEach(item => {
        let li = document.createElement('li');
        li.innerText = item.color;
        li.style.color = item.style;
        list.appendChild(li);
    });

    return list.innerHTML;
}

function link(command) { 
    const anchor = document.createElement('a');

    if(command === 'github') {
        anchor.innerHTML = 'https://github.com/Heesel';
        anchor.setAttribute('href', 'https://github.com/Heesel')
    } else if(command === 'linkedin') {
        
        anchor.innerHTML = 'https://www.linkedin.com/in/hessel-palland-26a06720b/';
        anchor.setAttribute('href', 'https://www.linkedin.com/in/hessel-palland-26a06720b/')
    }

    anchor.setAttribute('target', '_blank');
    anchor.style.color = '#3b82f6'
    anchor.style.textDecoration = 'underline';

    return anchor.outerHTML;
}


function changeColor(args) {

    const colors = [
        { color: 'green', style: '#22c55e'},
        { color: 'red', style: '#dc2626'},
        { color: 'blue', style: '#2563eb'},
        { color: 'yellow', style: '#facc15'},
        { color: 'orange', style: '#f97316'},
        { color: 'purple', style: '#9333ea'},
    ]

    if(args.length === 1) return 'Please specify a color';
    if(!colors.find(item => item.color === args[1])) return 'Invalid color. Please use the colors command to see a list of colors';

    const color = args[1];
    const terminal = document.getElementById('prefix');

    colors.forEach(item => {
        if(item.color === color) {
            terminal.style.color = item.style;
        }
    });

    return 'Color changed';
}

/**
 * Maar als je types gaat noteren, dan kun je miss beter gewoon typescript gaan leren :P
 * typescript is 100% JS-compatibel, dus je kunt gwn geleidelijk overstappen.
 * te grote stap voor nu
 * Ja oke, maar het fijne aan TS is dat je niet in één keer alles om hoeft te gooien. Kun je gwn geleidelijk doen.
 * ooit zal ik het wel doen Oke.
 * @param {command} string 
 * @param {lines} {text: string, type: string}[]
 */
export function executeCommand({ command, lines }) {
    const args = command.split(" ");

    if(args[0] === "color") {
        lines.push({ text: changeColor(args), type: "output" });
        return;
    }
    
    switch (command) {
        case "hello world":
            lines.push({ text: "Hello world!", type: "output" });
            break;
        case "github":
            lines.push({ text: link(command), type: "output" });  
            break;
        case "linkedin":
            lines.push({ text: link(command), type: "output" }); 
            break;
        case "help":
            lines.push({ text: help(), type: "output" });
            break;
        case "colors":
            lines.push({ text: colors(), type: "output" });
            break;
        case "clear":
            lines.splice(0, lines.length);
            break;
        default:
            lines.push({ text: "Unknown command", type: "output" });
            break;
    }
}