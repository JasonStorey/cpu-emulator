module.exports = CPU();

function CPU() {
    var OPCODES = {
        '0': 'BRK'
    };

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize || 256),
            PC = 0;

        function getMemory() { return memory; }

        function getPC() { return PC; }

        function load(program) {
            if(program.length > memory.length) { throw new Error('Out of bounds error'); }
            program.forEach(function(val, i) { memory[i] = val; });
        }

        function exec() {
            while(getCurrentOp() !== OPCODES[0]) {
                advance();
            }
        }

        function getCurrentOp() {
            return OPCODES[memory[PC]];
        }

        function advance() {
            PC++;
        }

        return {
            getMemory: getMemory,
            load: load,
            exec: exec,
            getPC: getPC
        };
    }

    return {
        create: create
    };
}