module.exports = CPU();

function CPU() {
    var OPCODES = {
        '0': 'BRK',
        '1': 'LDA'
    };

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize || 256),
            PC = 0,
            registerA;

        function getMemory() { return memory; }

        function getPC() { return PC; }

        function getRegisterA() { return registerA; }

        function getCurrentOp() { return OPCODES[getCurrent()]; }

        function getCurrent() { return memory[PC]; }

        function load(program) {
            if(program.length > memory.length) { throw new Error('Out of bounds error'); }
            program.forEach(function(val, i) { memory[i] = val; });
        }

        function exec() {
            while(getCurrentOp() !== OPCODES[0]) {
                switch(getCurrentOp()) {
                    case 'LDA':
                        advance();
                        registerA = getCurrent();
                        break;

                    default :
                        throw new Error('Unrecognised OPCODE : ' + getCurrent());
                }
                advance();
            }
        }

        function advance() { PC++; }

        return {
            getMemory: getMemory,
            load: load,
            exec: exec,
            getPC: getPC,
            getRegisterA: getRegisterA
        };
    }

    return {
        create: create
    };
}