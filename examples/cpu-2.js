var CPU = require('../src/cpu.js');

var PROGRAM = [4, 128, 1, 0x77, 8, 5, 1, 0x68, 8, 5, 1, 0x6F, 8, 5, 1, 0x20, 8, 5, 1, 0x6c, 8, 5, 1, 0x65, 8, 5, 1, 0x74, 8, 5, 1, 0x20, 8, 5, 1, 0x74, 8, 5, 1, 0x68, 8, 5, 1, 0x65, 8, 5, 1, 0x20, 8, 5, 1, 0x64, 8, 5, 1, 0x6F, 8, 5, 1, 0x67, 8, 5, 1, 0x73, 8, 5, 1, 0x20, 8, 5, 1, 0x6F, 8, 5, 1, 0x75, 8, 5, 1, 0x74, 8, 5, 1, 0x20, 8, 5, 10, 3, 1, 0x77, 8, 5, 1, 0x68, 8, 5, 1, 0x6F, 8, 5, 1, 0x20, 8, 5, 9, 6, 0, 7, -21, 0];

var cpu = CPU.create();

cpu.load(PROGRAM);
cpu.exec();

printStringFromMemory(cpu.getMemory(), 128, 256);

function printStringFromMemory(memory, s, e) {
    var str = '';

    memory.slice(s, e).forEach(function (charCode) {
        str += String.fromCharCode(charCode);
    });
    console.log(str);
}