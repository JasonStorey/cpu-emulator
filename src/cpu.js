module.exports = CPU();

function CPU() {

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize);

        function getMemory() {
            return memory;
        }

        return {
            getMemory: getMemory
        };
    }

    return {
        create: create
    };
}