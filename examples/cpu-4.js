var CPU = require('../src/cpu.js'),
    Assembler = require('../src/assembler.js'),
    fs = require('fs');

var assembler = Assembler.create(),
    cpu = CPU.create();

var assembly = fs.readFileSync('./assets/cpu-app-4.asm', 'utf-8'),
    program = assembler.parse(assembly);

cpu.load(program);
cpu.exec();

printStringFromMemory(cpu.getMemory(), 128, cpu.getMemory().length - 1);

function printStringFromMemory(memory, s, e) {
    var str = '';

    memory.slice(s, e).forEach(function (charCode) {
        str += String.fromCharCode(charCode);
    });
    console.log(str);
}