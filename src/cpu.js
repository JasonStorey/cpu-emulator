module.exports = CPU();

function CPU() {

    var OPCODES = {
        '0': 'BRK',
        '1': 'LDA',
        '2': 'ADC',
        '3': 'STA',
        '4': 'LDX',
        '5': 'INX',
        '6': 'CMY',
        '7': 'BNE',
        '8': 'STA_X',
        '9': 'DEY',
        '10': 'LDY'
    };

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize || 256),
            PC = 0,
            flag,
            registerA,
            registerX,
            registerY;

        function getMemory() { return memory; }

        function getPC() { return PC; }

        function getFlag() { return flag; }

        function getRegisterA() { return registerA; }

        function getRegisterX() { return registerX; }

        function getRegisterY() { return registerY; }

        function getCurrentOp() { return OPCODES[getCurrent()]; }

        function getCurrent() { return memory[PC]; }

        function advance() { PC++; }

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

                    case 'ADC':
                        advance();
                        registerA += getCurrent();
                        break;

                    case 'STA':
                        advance();
                        memory[getCurrent()] = getRegisterA();
                        break;

                    case 'LDX':
                        advance();
                        registerX = getCurrent();
                        break;

                    case 'INX':
                        registerX++;
                        break;

                    case 'CMY':
                        advance();
                        flag = (getCurrent() === getRegisterY());
                        break;

                    case 'BNE':
                        advance();
                        if(!getFlag()) {
                            PC += getCurrent();
                        }
                        break;

                    case 'STA_X':
                        memory[getRegisterX()] = getRegisterA();
                        break;

                    case 'DEY':
                        registerY--;
                        break;

                    case 'LDY':
                        advance();
                        registerY = getCurrent();
                        break;

                    default :
                        throw new Error('Unrecognised OPCODE : ' + getCurrent());
                }
                advance();
            }
        }

        return {
            getMemory: getMemory,
            load: load,
            exec: exec,
            getPC: getPC,
            getFlag: getFlag,
            getRegisterA: getRegisterA,
            getRegisterX: getRegisterX,
            getRegisterY: getRegisterY
        };
    }

    return {
        create: create
    };
}