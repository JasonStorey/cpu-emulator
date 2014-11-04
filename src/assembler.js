module.exports = Assembler();

function Assembler() {
    var OPCODES = require('./opcodes.js'),
        labels = [];

    function create() {

        function trim(string) { return string.trim(); }

        function extractLabelName(token) {
            return token.substring(0, token.length - 1);
        }

        function isLabel(token) {
            return token.charAt(token.length - 1) === ':';
        }

        function readLine(line) {
            return line.split(' ').map(function(token) {
                return OPCODES[token] !== undefined ? OPCODES[token] : token;
            });
        }

        function parse(program) {
            var machineCode = [];

            if (typeof program !== 'string') {
                throw new Error('invalid program');
            }

            program.split('\n')
                .map(trim)
                .filter(function(trimmedLine, index) {
                    var trimmedLineIsLabel = isLabel(trimmedLine);
                    if(trimmedLineIsLabel) {
                        labels[extractLabelName(trimmedLine)] = index;
                    }
                    return !trimmedLineIsLabel;
                })
                .forEach(function(trimmedLine){
                    if(trimmedLine.length > 0) {
                        machineCode = machineCode.concat(readLine(trimmedLine));
                    }
                });

            // TODO: Refactor this piece of nasty

            return machineCode.map(function replaceLabels(op, index) {
                if(labels[op] !== undefined) {
                    return labels[op] - index;
                }
                return parseInt(op);
            });
        }

        return {
            parse: parse
        };
    }

    return {
        create: create
    };
}