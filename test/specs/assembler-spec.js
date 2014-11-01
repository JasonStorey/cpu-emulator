var Assembler = require('../../src/assembler.js');

describe('Assembler', function() {
    var assembler;

    beforeEach(function() {
        assembler = Assembler.create();
    });

    describe('parse', function() {
        it('throws an error when given invalid data', function() {
            var invalidProgram = 0;
            expect(assembler.parse.bind(null, invalidProgram)).to.throw('invalid program');
        });

        it('returns 0 for BRK', function() {
            var program = 'BRK';
            expect(assembler.parse(program)).to.eql([0]);
        });
    });

});