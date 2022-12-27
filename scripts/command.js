export function executeCommand(command) {
    switch (command) {
      case "hello world":
        return { text: "Hello world!", type: "output" };
      case "command2":
        return executeCommand2();
      default:
        return { text: "Unknown command", type: "output" };
    }
}