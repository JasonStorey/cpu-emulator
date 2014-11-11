module.exports = Assembler();

function Assembler() {
    var OPCODES = require('./opcodes.js'),
        LABELS = {};

    function create() {

        function parse(program) {
            var tokens;

            if (typeof program !== 'string') {
                throw new Error('invalid program');
            }

            tokens = program.split(/\s+/g).filter(trim);

            return getOpcodes(tokens);
        }

        function getOpcodes(tokensWithLabels) {
            var tokens = [],
                machineCode = [];

            tokensWithLabels.forEach(function extractLabels(token, index) {
                if(isLabel(token)) {
                    LABELS[extractLabelName(token)] = index;
                } else {
                    tokens.push(token);
                }
            });

            tokens.forEach(function(token, index) {
                machineCode[index] = getVal(token, tokens[index - 1], index);
            });

            return machineCode;
        }

        function getVal(token, previousToken, index) {
            if(OPCODES[token] !== undefined) {
                return OPCODES[token];
            }

            if(LABELS[token] !== undefined) {
                switch(previousToken) {
                    case 'BNE':
                        return LABELS[token] - index - 1;
                        break;

                    default:
                        throw new Error('invalid label usage');
                }
            }

            return parseInt(token, 10);
        }

        function trim(string) { return string.trim(); }

        function extractLabelName(token) {
            return token.substring(0, token.length - 1);
        }

        function isLabel(token) {
            return token.charAt(token.length - 1) === ':';
        }

        return {
            parse: parse
        };
    }

    return {
        create: create
    };
}