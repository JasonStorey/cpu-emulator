module.exports = CPU();

function CPU() {

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize || 256);

        function getMemory() {
            return memory;
        }

        function load(program) {
            if(program.length > memory.length) {
                throw new Error('Out of range error');
            }

            program.forEach(function(val, i) {
                memory[i] = val;
            });
        }

        return {
            getMemory: getMemory,
            load: load
        };
    }

    return {
        create: create
    };
}