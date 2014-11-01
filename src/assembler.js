module.exports = Assembler();

function Assembler() {
    var OPCODES = require('./opcodes.js');

    function create() {

        function readLine(line) {
            var machineCode;

            line.split(' ').forEach(function(token) {
                var OP = OPCODES[token];
                if(OP !== undefined) {
                    machineCode = OP;
                }
            });

            return machineCode;
        }

        function parse(program) {
            if (typeof program !== 'string') {
                throw new Error('invalid program');
            }

            return [readLine(program)];
        }

        return {
            parse: parse
        };
    }

    return {
        create: create
    };
}