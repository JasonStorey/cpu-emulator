module.exports = Assembler();

function Assembler() {
    var OPCODES = require('./opcodes.js');

    function create() {

        function readLine(line) {
            return line.split(' ').map(function(token) {
                return OPCODES[token] !== undefined ? OPCODES[token] : parseInt(token);
            });
        }

        function parse(program) {
            var machineCode = [];

            if (typeof program !== 'string') {
                throw new Error('invalid program');
            }

            program.split('\n').forEach(function(line){
                machineCode = machineCode.concat(readLine(line));
            });

            return machineCode;
        }

        return {
            parse: parse
        };
    }

    return {
        create: create
    };
}