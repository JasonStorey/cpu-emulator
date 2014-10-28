var expect = require('chai').expect,
    CPU = require('../src/cpu.js');

describe('cpu', function() {

    it('is initialised with 256 bytes of memory by default', function() {
        var cpu = CPU.create();
        expect(cpu.getMemory().length).to.equal(256);
    });

    it('is initialised with specified bytes of memory', function() {
        var cpu = CPU.create(256);
        expect(cpu.getMemory().length).to.equal(256);
    });

    it('memory is pre-populated with zeros', function() {
        var cpu = CPU.create(1);
        expect(cpu.getMemory()[0]).to.equal(0);
    });

    describe('load', function() {

        it('loads program into memory', function() {
            var cpu = CPU.create(16),
                program = [1,2,3,4,5,6,7,8];

            cpu.load(program);
            expect(cpu.getMemory().length).to.equal(16);
            expect(cpu.getMemory().slice(0, 8)).to.eql(program);
        });

        it('throws an error if program doesn\'t fit in memory', function() {
            var cpu = CPU.create(1),
                program = [1,2];

            expect(cpu.load.bind(null, program)).to.throw('Out of range error');
        });

    });

});