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

        describe('single assembly codes', function() {

            it('returns 0 for BRK', function() {
                var program = 'BRK';
                expect(assembler.parse(program)).to.eql([0]);
            });

            it('returns 1 for LDA', function() {
                var program = 'LDA';
                expect(assembler.parse(program)).to.eql([1]);
            });

            it('returns 2 for ADC', function() {
                var program = 'ADC';
                expect(assembler.parse(program)).to.eql([2]);
            });

            it('returns 3 for STA', function() {
                var program = 'STA';
                expect(assembler.parse(program)).to.eql([3]);
            });

            it('returns 4 for LDX', function() {
                var program = 'LDX';
                expect(assembler.parse(program)).to.eql([4]);
            });

            it('returns 5 for INX', function() {
                var program = 'INX';
                expect(assembler.parse(program)).to.eql([5]);
            });

            it('returns 6 for CMY', function() {
                var program = 'CMY';
                expect(assembler.parse(program)).to.eql([6]);
            });

            it('returns 7 for BNE', function() {
                var program = 'BNE';
                expect(assembler.parse(program)).to.eql([7]);
            });

            it('returns 8 for STA_X', function() {
                var program = 'STA_X';
                expect(assembler.parse(program)).to.eql([8]);
            });

            it('returns 9 for DEY', function() {
                var program = 'DEY';
                expect(assembler.parse(program)).to.eql([9]);
            });

            it('returns 10 for LDY', function() {
                var program = 'LDY';
                expect(assembler.parse(program)).to.eql([10]);
            });

            it('returns 11 for JSR', function() {
                var program = 'JSR';
                expect(assembler.parse(program)).to.eql([11]);
            });

            it('returns 12 for RTS', function() {
                var program = 'RTS';
                expect(assembler.parse(program)).to.eql([12]);
            });
        });

        describe('multiple assembly codes', function() {

            it('splits on newline character', function() {
                var program = 'INX\nDEY\nBRK';
                expect(assembler.parse(program)).to.eql([5,9,0]);
            });

            it('splits on space character', function() {
                var program = 'LDA 100';
                expect(assembler.parse(program)).to.eql([1,100]);
            });

            it('splits on newline and space character', function() {
                var program = 'LDA 100\nADC 7\nSTA 5\nBRK';
                expect(assembler.parse(program)).to.eql([1,100,2,7,3,5,0]);
            });

        });
    });

});