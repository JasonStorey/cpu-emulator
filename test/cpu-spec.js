var expect = require('chai').expect;

describe('cpu', function() {
    var CPU = require('../src/cpu.js');

    it('is initialised with 256 bytes of memory', function() {
        var cpu = CPU.create(256);
        expect(cpu.getMemory().length).equal(256);
    });

    it('memory is pre-populated with zeros', function() {
        var cpu = CPU.create(1);
        expect(cpu.getMemory()[0]).equal(0);
    });
});