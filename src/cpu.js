module.exports = CPU();

function CPU() {

    function createMemory(size) {
        var memory = [];
        while(memory.length < size) { memory.push(0); }
        return memory;
    }

    function create(memorySize) {
        var memory = createMemory(memorySize || 256),
            SP = memory.length - 1,
            PC = 0,
            flag,
            registerA,
            registerX,
            registerY;

        function getMemory() { return memory; }

        function getPC() { return PC; }

        function getSP() { return SP; }

        function setSP(n) { SP = n; }

        function getFlag() { return flag; }

        function getRegisterA() { return registerA; }

        function getRegisterX() { return registerX; }

        function getRegisterY() { return registerY; }

        function getCurrent() { return memory[PC]; }

        function advance() { PC++; }

        function load(program) {
            if(program.length > memory.length) { throw new Error('Out of bounds error'); }
            program.forEach(function(val, i) { memory[i] = val; });
        }

        function exec() {
            while(getCurrent() !== 0) {
                switch(getCurrent()) {
                    case 1: // 'LDA'
                        advance();
                        registerA = getCurrent();
                        break;

                    case 2: // 'ADC'
                        advance();
                        registerA += getCurrent();
                        break;

                    case 3: // 'STA'
                        advance();
                        memory[getCurrent()] = getRegisterA();
                        break;

                    case 4: // 'LDX'
                        advance();
                        registerX = getCurrent();
                        break;

                    case 5: // 'INX'
                        registerX++;
                        break;

                    case 6: // 'CMY'
                        advance();
                        flag = (getCurrent() === getRegisterY());
                        break;

                    case 7: // 'BNE'
                        advance();
                        if(!getFlag()) {
                            PC += getCurrent();
                        }
                        break;

                    case 8: // 'STA_X'
                        memory[getRegisterX()] = getRegisterA();
                        break;

                    case 9: // 'DEY'
                        registerY--;
                        break;

                    case 10: // 'LDY'
                        advance();
                        registerY = getCurrent();
                        break;

                    case 11: // 'JSR'
                        memory[SP] = PC;
                        SP--;
                        advance();
                        PC = getCurrent() - 1;
                        break;

                    case 12: // 'RTS'
                        SP++;
                        PC = memory[SP] + 1;
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
            getSP: getSP,
            _setSP: setSP,
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