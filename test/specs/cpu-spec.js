var CPU = require('../../src/cpu.js');

describe('CPU', function() {

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

            expect(cpu.load.bind(null, program)).to.throw('Out of bounds error');
        });

    });

    describe('exec', function() {
        var cpu;

        beforeEach(function() {
            cpu = CPU.create();
        });

        it('throws error if program contains unrecognised opcode', function() {
            cpu.load([256]);

            expect(cpu.exec.bind(null)).to.throw('Unrecognised OPCODE : 256');
        });

        it('BRK stops program execution', function() {
            cpu.load([0]);
            cpu.exec();

            expect(cpu.getPC()).to.equal(0);
        });

        it('LDA stores value from next memory address in register A', function() {
            cpu.load([1, 100, 0]);
            cpu.exec();

            expect(cpu.getRegisterA()).to.equal(100);
            expect(cpu.getPC()).to.equal(2);
        });

        it('ADC adds value from next memory address to register A', function() {
            cpu.load([1, 5, 2, 5, 0]);
            cpu.exec();

            expect(cpu.getRegisterA()).to.equal(10);
            expect(cpu.getPC()).to.equal(4);
        });

        it('STA stores register A contents in memory location specified by value at next memory address', function() {
            cpu.load([1, 5, 3, 2, 0]);
            cpu.exec();

            expect(cpu.getRegisterA()).to.equal(5);
            expect(cpu.getMemory()[2]).to.equal(cpu.getRegisterA());
            expect(cpu.getPC()).to.equal(4);
        });

        it('LDX stores value from next memory address in register X', function() {
            cpu.load([4, 99, 0]);
            cpu.exec();

            expect(cpu.getRegisterX()).to.equal(99);
            expect(cpu.getPC()).to.equal(2);
        });

        it('INX increment value in register X', function() {
            cpu.load([4, 99, 5, 0]);
            cpu.exec();

            expect(cpu.getRegisterX()).to.equal(100);
            expect(cpu.getPC()).to.equal(3);
        });

        it('CMY compares value from next memory address to registerY and sets boolean flag to true when same', function() {
            cpu.load([10, 20, 6, 20, 0]);
            cpu.exec();

            expect(cpu.getRegisterY()).to.equal(20);
            expect(cpu.getFlag()).to.be.true;
            expect(cpu.getPC()).to.equal(4);
        });

        it('CMY compares value from next memory address to registerY and sets boolean flag to false when different', function() {
            cpu.load([10, 20, 6, 21, 0]);
            cpu.exec();

            expect(cpu.getRegisterY()).to.equal(20);
            expect(cpu.getFlag()).to.be.false;
            expect(cpu.getPC()).to.equal(4);
        });

        it('BNE adds value in next memory address to PC if flag is false', function() {
            cpu.load([10, 20, 6, 21, 7, 94, 0]);
            cpu.exec();

            expect(cpu.getFlag()).to.be.false;
            expect(cpu.getPC()).to.equal(100);
        });

        it('STA_X stores register A contents in memory location specified by value in register X', function() {
            cpu.load([1, 100, 4, 30, 8, 0]);
            cpu.exec();

            expect(cpu.getMemory()[30]).to.equal(100);
            expect(cpu.getPC()).to.equal(5);
        });

        it('DEY decrement the value in register Y', function() {
            cpu.load([10, 101, 9, 0]);
            cpu.exec();

            expect(cpu.getRegisterY()).to.equal(100);
            expect(cpu.getPC()).to.equal(3);
        });

        it('LDY stores value from next memory address in register Y', function() {
            cpu.load([10, 99, 0]);
            cpu.exec();

            expect(cpu.getRegisterY()).to.equal(99);
            expect(cpu.getPC()).to.equal(2);
        });
    });

    describe('using stack', function() {
        var cpu;

        beforeEach(function() {
            cpu = CPU.create(640);
        });

        it('SP is initialised at the last memory address', function() {
            expect(cpu.getSP()).to.equal(639);
        });

        it('JSR stores the PC in the memory address pointed to by the SP, decrements the SP, and sets the PC to point to the next value -1', function() {
            cpu.load([11, 10, 0]);

            cpu.exec();

            expect(cpu.getSP()).to.equal(cpu.getMemory().length - 2);
            expect(cpu.getPC()).to.equal(cpu.getMemory()[1]);
        });

        it('RTS increments the SP, and sets PC to be one more than the value stored in the memory address pointed to by the SP', function() {
            cpu.load([12, 99, 0]);
            cpu._setSP(0);
            cpu.exec();

            expect(cpu.getSP()).to.equal(1);
            expect(cpu.getPC() - 1).to.equal(cpu.getMemory()[cpu.getSP()] + 1);
        });
    });
});