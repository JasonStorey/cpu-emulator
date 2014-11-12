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
                numOfLabels = 0;

            tokensWithLabels.forEach(function(token, index) {
                if(isLabel(token)) {
                    LABELS[extractLabelName(token)] = index - numOfLabels;
                    numOfLabels++;
                } else {
                    tokens.push(token);
                }
            });

            return tokens.map(function(token, index) {
                return getVal(token, tokens[index - 1], index);
            });
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

                    case 'JSR':
                        return LABELS[token];
                        break;

                    default:
                        throw new Error('invalid label usage : ' + token);
                }
            }

            return parseInt(token, 10);
        }

        function trim(string) { return string.trim(); }

        function isLabel(token) {
            return token.charAt(token.length - 1) === ':';
        }

        function extractLabelName(token) {
            return token.substring(0, token.length - 1);
        }

        return {
            parse: parse
        };
    }

    return {
        create: create
    };
}