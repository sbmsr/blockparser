// bitcoind block parser
// Ref 1 : https://2.bp.blogspot.com/-DaJcdsyqQSs/UsiTXNHP-0I/AAAAAAAATC0/kiFRowh-J18/s1600/blockchain.png
// Ref 2 : https://en.bitcoin.it/wiki/Protocol_documentation

const fs = require('fs');
const {U64, I64} = require('n64');
var file = fs.readFileSync('r_blk00000.dat'); //redacted blk00000.dat //TODO: Async

// BEGIN BLOCK
const magic   = file.hexSlice(0,4)    // 4
const size     = file.hexSlice(4,8)   // 4

// 80 (Block Header )
const version  = file.hexSlice(8,12)  // 4
const p_block  = file.hexSlice(12,44) // 32
const merkroot = file.hexSlice(44,76) // 32 (TODO: what endianess?)
const created  = file.hexSlice(76,80) // 4
const target   = file.hexSlice(80,84) // 4
const nonce    = file.hexSlice(84,88) // 4

// Details : (https://en.bitcoin.it/wiki/Protocol_documentation#Variable_length_integer)
var n_transact = 0
if (file[89] < 253)  { /* 1 byte  */ n_transact = file[89] } else
if (file[89] == 253) { /* 3 bytes */ n_transact = file.subarray(90,91).readUInt16BE()  } else
if (file[89] == 254) { /* 5 bytes */ n_transact = file.subarray(90,93).readUInt32BE() } else
if (file[89] == 255) { /* 9 bytes */ n_transact = file.subarray(90,97).readUInt64BE() } //TODO: need readUInt64
else {/* oops */}



// Helper Functions

function reverseString(str) {
    var newString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        newString += str[i];
    }
    return newString;
}

function endianFlip(str) {
  var newStr = ''
  for (var i = 0; i < str.length; i += 2){
    newStr += str[i+1] + str[i]
  }
  return reverseString(newStr);
}
