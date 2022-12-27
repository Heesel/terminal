function help() { 
    let list = document.createElement('ul');

    const items = [
        'hello world - prints hello world',
        'github - prints github link',
        'linkedin - prints linkedin link', 
        'help - shows this list',
        'colors - shows a list of colors',
        'color [color] - changes the color of the terminal'
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

export function executeCommand(command) {
    switch (command) {
        case "hello world":
            return { text: "Hello world!", type: "output" };
        case "github":
            return { text: link(command), type: "output" };  
        case "linkedin":
            return { text: link(command), type: "output" }; 
        case "help":
            return { text: help(), type: "output" };
        case "colors":
            return { text: colors(), type: "output" };
        case "color":
            return { text: "Please specify a color. Use the colors command for all the colors", type: "output" };
        default:
            return { text: "Unknown command", type: "output" };
    }
}