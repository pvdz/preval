# Preval test case

# rc4.md

> Free > Func > Rc4
>
> TODO: clean up

This is the more elaborate case of rc4. More accurate.
We solve it with freeloops.

## Options

Preval goes apeshit if you allow it
- unroll: 0
- loopProtectLimit: 100

## Input

`````js filename=intro
{
  const tmpFree/*:(number, number, string, primitive)=>primitive*/ = function $free($$0, $$1, $$2, $$3) {
    const tmpClusterSSA__0x2f4501$3/*:number*/ = $$0;
    const tmpBinBothRhs$61/*:number*/ = $$1;
    const _0x2934b2/*:string*/ = $$2;
    const tmpBinBothLhs$57/*:primitive*/ = $$3;
    debugger;
    const tmpMCP$9/*:number*/ = tmpClusterSSA__0x2f4501$3 % tmpBinBothRhs$61;
    const tmpBinBothRhs$57/*:number*/ = $dotCall($string_charCodeAt, _0x2934b2, `charCodeAt`, tmpMCP$9);
    const tmpRet/*:primitive*/ = tmpBinBothLhs$57 + tmpBinBothRhs$57;
    return tmpRet;
  };
  const tmpFree$2/*:(number, primitive)=>string*/ = function $free($$0, $$1) {
    const tmpBinBothLhs$93/*:number*/ = $$0;
    const tmpBinBothRhs$93/*:primitive*/ = $$1;
    debugger;
    const tmpMCP$11/*:number*/ = tmpBinBothLhs$93 ^ tmpBinBothRhs$93;
    const tmpRet$2/*:string*/ = $String_fromCharCode(tmpMCP$11);
    return tmpRet$2;
  };
  const tmpFree$21/*:(number, string)=>boolean*/ = function $free($$0, $$1) {
    const _0x100da1/*:number*/ = $$0;
    const _0x107c2f$1/*:string*/ = $$1;
    debugger;
    const tmpMCP$1/*:number*/ = _0x100da1 + 10;
    const tmpBinBothLhs$15/*:number*/ = $dotCall($string_charCodeAt, _0x107c2f$1, `charCodeAt`, tmpMCP$1);
    const tmpBinBothLhs$13/*:number*/ = tmpBinBothLhs$15 - 10;
    const tmpRet$19/*:boolean*/ = tmpBinBothLhs$13 === 0;
    return tmpRet$19;
  };
  const tmpFree$66/*:(string, number)=>string*/ = function $free($$0, $$1) {
    const _0x6a543b$4/*:string*/ = $$0;
    const _0x49e06f$1/*:number*/ = $$1;
    debugger;
    const tmpRet$55/*:number*/ = $dotCall($string_charCodeAt, _0x6a543b$4, `charCodeAt`, _0x49e06f$1);
    const tmpStringConcatL/*:string*/ = $dotCall($number_toString, tmpRet$55, `toString`, 16);
    const tmpMCOO/*:string*/ /*truthy*/ = `00${tmpStringConcatL}`;
    const tmpBinBothRhs$37/*:string*/ = $dotCall($string_slice, tmpMCOO, `slice`, -2);
    return tmpBinBothRhs$37;
  };
  const tmpFree$64/*:(number, unknown)=>number*/ = function $free($$0, $$1) {
    const _0xfb56b2$1/*:number*/ = $$0;
    const _0xe44bb2/*:unknown*/ = $$1;
    debugger;
    const tmpBinBothLhs$27/*:number*/ = (-2) * _0xfb56b2$1;
    const tmpBinBothRhs$25/*:number*/ /*&6*/ = tmpBinBothLhs$27 & 6;
    const tmpBinBothRhs$21/*:number*/ = _0xe44bb2 >> tmpBinBothRhs$25;
    const tmpRet$62/*:number*/ /*&255*/ = 255 & tmpBinBothRhs$21;
    return tmpRet$62;
  };
  const tmpFree$60/*:(primitive, primitive)=>number*/ = function $free($$0, $$1) {
    const tmpBinBothLhs$97/*:primitive*/ = $$0;
    const tmpBinBothRhs$97/*:primitive*/ = $$1;
    debugger;
    const tmpBinBothLhs$95/*:primitive*/ = tmpBinBothLhs$97 + tmpBinBothRhs$97;
    const tmpRet$58/*:number*/ = tmpBinBothLhs$95 % 256;
    return tmpRet$58;
  };
  const BASESIXTANDURLDECODE/*:(primitive)=>string*/ = function($$0) {
    const _0x1a31cc$1/*:primitive*/ = $$0;
    debugger;
    let _0x6a543b$3/*:string*/ = ``;
    let _0x3f61ee$2/*:string*/ = ``;
    const _0x107c2f$2/*:string*/ = 'function(){}'; // $coerce(_0xe548a5, `plustr`);
    let _0xfb56b2$2/*:number*/ = 0;
    let _0xe44bb2$1/*:primitive*/ = undefined;
    let _0x100da1$1/*:number*/ = 0;
    while (true) {
      const tmpMCF/*:unknown*/ = _0x1a31cc$1.charAt;
      const tmpPostUpdArgIdent/*:number*/ = _0x100da1$1;
      _0x100da1$1 = _0x100da1$1 + 1;
      const tmpClusterSSA__0x23e39f/*:unknown*/ = $dotCall(tmpMCF, _0x1a31cc$1, `charAt`, tmpPostUpdArgIdent);
      if (tmpClusterSSA__0x23e39f) {
        const tmpClusterSSA__0x23e39f$1/*:number*/ = $dotCall($string_indexOf, `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`, `indexOf`, tmpClusterSSA__0x23e39f);
        const tmpIfTest$3/*:number*/ = ~tmpClusterSSA__0x23e39f$1;
        if (tmpIfTest$3) {
          const tmpIfTest$5/*:number*/ = _0xfb56b2$2 % 4;
          if (tmpIfTest$5) {
            const tmpBinLhs$13/*:number*/ = _0xe44bb2$1 * 64;
            _0xe44bb2$1 = tmpBinLhs$13 + tmpClusterSSA__0x23e39f$1;
          } else {
            _0xe44bb2$1 = tmpClusterSSA__0x23e39f$1;
          }
          const tmpPostUpdArgIdent$1/*:number*/ = _0xfb56b2$2;
          _0xfb56b2$2 = _0xfb56b2$2 + 1;
          const tmpClusterSSA_tmpIfTest$3/*:number*/ = tmpPostUpdArgIdent$1 % 4;
          if (tmpClusterSSA_tmpIfTest$3) {
            let tmpBinBothRhs$11/*:primitive*/ /*ternaryConst*/ = undefined;
            const tmpIfTest$7/*:boolean*/ = $frfr(tmpFree$21, _0x100da1$1, _0x107c2f$2);
            if (tmpIfTest$7) {
              tmpBinBothRhs$11 = _0xfb56b2$2;
            } else {
              const tmpMCP$3/*:number*/ = $frfr(tmpFree$64, _0xfb56b2$2, _0xe44bb2$1);
              tmpBinBothRhs$11 = $String_fromCharCode(tmpMCP$3);
            }
            _0x6a543b$3 = _0x6a543b$3 + tmpBinBothRhs$11;
          } else {

          }
        } else {

        }
      } else {
        break;
      }
    }
    let _0x49e06f$2/*:number*/ = 0;
    const _0xe36e0/*:number*/ = _0x6a543b$3.length;
    while (true) {
      const tmpIfTest$9/*:boolean*/ = _0x49e06f$2 < _0xe36e0;
      if (tmpIfTest$9) {
        const tmpStringConcatL$1/*:string*/ = $frfr(tmpFree$66, _0x6a543b$3, _0x49e06f$2);
        _0x3f61ee$2 = `${_0x3f61ee$2}%${tmpStringConcatL$1}`;
        _0x49e06f$2 = _0x49e06f$2 + 1;
      } else {
        break;
      }
    }
    const tmpReturnArg$3/*:string*/ = decodeURIComponent(_0x3f61ee$2);
    return tmpReturnArg$3;
  };
  const DECODER_FUNC/*:(string, number)=>unknown*/ = function($$0, $$1) {
    const _0x2934b2$1/*:string*/ = $$0;
    const _0x346405/*:number*/ = $$1;
    debugger;
    let _0x5b220f/*:number*/ = 0;
    let _0x449d44/*:string*/ = ``;
    const tmpSSA__0x3849a1$2/*:string*/ = BASESIXTANDURLDECODE(_0x346405);
    let tmpClusterSSA__0x2f4501$1/*:number*/ = 0;
    const _0x23cc4c/*:array*/ /*truthy*/ = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
    while (true) {
      const tmpIfTest$13/*:boolean*/ = tmpClusterSSA__0x2f4501$1 < 256;
      if (tmpIfTest$13) {
        const tmpBinBothRhs$59/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
        const tmpBinBothLhs$1/*:primitive*/ = _0x5b220f + tmpBinBothRhs$59;
        const tmpBinBothRhs$2/*:number*/ = _0x2934b2$1.length;
        const tmpBinBothLhs$55/*:primitive*/ = $frfr(tmpFree, tmpClusterSSA__0x2f4501$1, tmpBinBothRhs$2, _0x2934b2$1, tmpBinBothLhs$1);
        _0x5b220f = tmpBinBothLhs$55 % 256;
        const tmpClusterSSA__0x1a8c54/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
        const tmpAssignComputedRhs/*:primitive*/ = _0x23cc4c[_0x5b220f];
        _0x23cc4c[tmpClusterSSA__0x2f4501$1] = tmpAssignComputedRhs;
        _0x23cc4c[_0x5b220f] = tmpClusterSSA__0x1a8c54;
        tmpClusterSSA__0x2f4501$1 = tmpClusterSSA__0x2f4501$1 + 1;
      } else {
        break;
      }
    }
    let tmpClusterSSA__0x2f4501$4/*:number*/ = 0;
    let tmpClusterSSA__0x5b220f/*:number*/ = 0;
    let _0xc5c59f$1/*:number*/ = 0;
    while (true) {
      const tmpBinBothRhs$75/*:number*/ = tmpSSA__0x3849a1$2.length;
      const tmpIfTest$15/*:boolean*/ = _0xc5c59f$1 < tmpBinBothRhs$75;
      if (tmpIfTest$15) {
        const tmpBinBothLhs$77/*:number*/ = tmpClusterSSA__0x2f4501$4 + 1;
        tmpClusterSSA__0x2f4501$4 = tmpBinBothLhs$77 % 256;
        const tmpBinBothRhs$87/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
        const tmpBinBothLhs$85/*:primitive*/ = tmpClusterSSA__0x5b220f + tmpBinBothRhs$87;
        tmpClusterSSA__0x5b220f = tmpBinBothLhs$85 % 256;
        const tmpClusterSSA__0x1a8c54$1/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
        const tmpAssignComputedRhs$1/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x5b220f];
        _0x23cc4c[tmpClusterSSA__0x2f4501$4] = tmpAssignComputedRhs$1;
        _0x23cc4c[tmpClusterSSA__0x5b220f] = tmpClusterSSA__0x1a8c54$1;
        const tmpBinBothLhs$2/*:number*/ = $dotCall($string_charCodeAt, tmpSSA__0x3849a1$2, `charCodeAt`, _0xc5c59f$1);
        const tmpBinBothLhs$4/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
        const tmpBinBothRhs$5/*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x5b220f];
        const tmpCalleeParam$26/*:number*/ = $frfr(tmpFree$60, tmpBinBothLhs$4, tmpBinBothRhs$5);
        const tmpBinBothRhs$6/*:primitive*/ = _0x23cc4c[tmpCalleeParam$26];
        const tmpBinBothRhs$91/*:string*/ = $frfr(tmpFree$2, tmpBinBothLhs$2, tmpBinBothRhs$6);
        _0x449d44 = `${_0x449d44}${tmpBinBothRhs$91}`;
        _0xc5c59f$1 = _0xc5c59f$1 + 1;
      } else {
        break;
      }
    }
    return _0x449d44;
  };
  $(DECODER_FUNC(`s6T^`, 'W6CVcEg5HSka'))
  $(DECODER_FUNC(`s6T^`, 'W6CVcEg5HSka'))
  $(DECODER_FUNC(`s6T^`, 'W6CVcEg5HSka'))
}
`````


## Settled


`````js filename=intro
const tmpFree$3 /*:(number, primitive, number)=>primitive*/ = function $free($$0, $$1, $$2) {
  const _0x5b220f /*:number*/ = $$0;
  const tmpBinBothRhs$59 /*:primitive*/ = $$1;
  const tmpClusterSSA__0x2f4501$2 /*:number*/ = $$2;
  debugger;
  const tmpMCP$9 /*:number*/ = tmpClusterSSA__0x2f4501$2 % 4;
  const tmpBinBothRhs$57 /*:number*/ = $dotCall($string_charCodeAt, `s6T^`, `charCodeAt`, tmpMCP$9);
  const tmpBinBothLhs$2 /*:primitive*/ = _0x5b220f + tmpBinBothRhs$59;
  const tmpRet /*:primitive*/ = tmpBinBothLhs$2 + tmpBinBothRhs$57;
  return tmpRet;
};
const tmpFree$2 /*:(number, primitive)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$4 /*:number*/ = $$0;
  const $dlr_$$6 /*:primitive*/ = $$1;
  debugger;
  const tmpMCP$11 /*:number*/ = $dlr_$$4 ^ $dlr_$$6;
  const tmpRet$2 /*:string*/ = $String_fromCharCode(tmpMCP$11);
  return tmpRet$2;
};
const tmpFree$21 /*:(number)=>boolean*/ = function $free($$0) {
  const $dlr_$$8 /*:number*/ = $$0;
  debugger;
  const tmpMCP$1 /*:number*/ = $dlr_$$8 + 10;
  const tmpBinBothLhs$15 /*:number*/ = $dotCall($string_charCodeAt, `function(){}`, `charCodeAt`, tmpMCP$1);
  const tmpBinBothLhs$13 /*:number*/ = tmpBinBothLhs$15 - 10;
  const tmpRet$19 /*:boolean*/ = tmpBinBothLhs$13 === 0;
  return tmpRet$19;
};
const tmpFree$66 /*:(string, number)=>string*/ = function $free($$0, $$1) {
  const $dlr_$$12 /*:string*/ = $$0;
  const $dlr_$$14 /*:number*/ = $$1;
  debugger;
  const tmpRet$55 /*:number*/ = $dotCall($string_charCodeAt, $dlr_$$12, `charCodeAt`, $dlr_$$14);
  const tmpStringConcatL /*:string*/ = $dotCall($number_toString, tmpRet$55, `toString`, 16);
  const tmpMCOO /*:string*/ /*truthy*/ = `00${tmpStringConcatL}`;
  const tmpBinBothRhs$37 /*:string*/ = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpBinBothRhs$37;
};
const tmpFree$64 /*:(number, unknown)=>number*/ = function $free($$0, $$1) {
  const $dlr_$$16 /*:number*/ = $$0;
  const $dlr_$$18 /*:unknown*/ = $$1;
  debugger;
  const tmpBinBothLhs$27 /*:number*/ = -2 * $dlr_$$16;
  const tmpBinBothRhs$25 /*:number*/ /*&6*/ = tmpBinBothLhs$27 & 6;
  const tmpBinBothRhs$21 /*:number*/ = $dlr_$$18 >> tmpBinBothRhs$25;
  const tmpRet$62 /*:number*/ /*&255*/ = 255 & tmpBinBothRhs$21;
  return tmpRet$62;
};
const tmpFree$60 /*:(primitive, primitive)=>number*/ = function $free($$0, $$1) {
  const $dlr_$$20 /*:primitive*/ = $$0;
  const $dlr_$$22 /*:primitive*/ = $$1;
  debugger;
  const tmpBinBothLhs$95 /*:primitive*/ = $dlr_$$20 + $dlr_$$22;
  const tmpRet$58 /*:number*/ = tmpBinBothLhs$95 % 256;
  return tmpRet$58;
};
const DECODER_FUNC /*:()=>string*/ = function () {
  debugger;
  let _0x5b220f$1 /*:number*/ = 0;
  let _0x449d44$1 /*:string*/ = ``;
  let _0x6a543b$3 /*:string*/ = ``;
  let _0x3f61ee$1 /*:string*/ = ``;
  let _0xfb56b2$2 /*:number*/ = 0;
  let _0xe44bb2$1 /*:primitive*/ = undefined;
  let _0x100da1$2 /*:number*/ = 0;
  while (true) {
    const tmpPostUpdArgIdent$1 /*:number*/ = _0x100da1$2;
    _0x100da1$2 = _0x100da1$2 + 1;
    const tmpClusterSSA__0x23e39f /*:string*/ = $dotCall($string_charAt, `W6CVcEg5HSka`, `charAt`, tmpPostUpdArgIdent$1);
    if (tmpClusterSSA__0x23e39f) {
      const tmpClusterSSA__0x23e39f$1 /*:number*/ = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        tmpClusterSSA__0x23e39f,
      );
      const tmpIfTest$3 /*:number*/ = ~tmpClusterSSA__0x23e39f$1;
      if (tmpIfTest$3) {
        const tmpIfTest$5 /*:number*/ = _0xfb56b2$2 % 4;
        if (tmpIfTest$5) {
          const tmpBinLhs$13 /*:number*/ = _0xe44bb2$1 * 64;
          _0xe44bb2$1 = tmpBinLhs$13 + tmpClusterSSA__0x23e39f$1;
        } else {
          _0xe44bb2$1 = tmpClusterSSA__0x23e39f$1;
        }
        const tmpPostUpdArgIdent$3 /*:number*/ = _0xfb56b2$2;
        _0xfb56b2$2 = _0xfb56b2$2 + 1;
        const tmpClusterSSA_tmpIfTest$3 /*:number*/ = tmpPostUpdArgIdent$3 % 4;
        if (tmpClusterSSA_tmpIfTest$3) {
          let tmpBinBothRhs$11 /*:primitive*/ /*ternaryConst*/ = undefined;
          const tmpIfTest$7 /*:boolean*/ = $frfr(tmpFree$21, _0x100da1$2);
          if (tmpIfTest$7) {
            tmpBinBothRhs$11 = _0xfb56b2$2;
          } else {
            const tmpMCP$3 /*:number*/ = $frfr(tmpFree$64, _0xfb56b2$2, _0xe44bb2$1);
            tmpBinBothRhs$11 = $String_fromCharCode(tmpMCP$3);
          }
          _0x6a543b$3 = _0x6a543b$3 + tmpBinBothRhs$11;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  let _0x49e06f$2 /*:number*/ = 0;
  const _0xe36e0 /*:number*/ = _0x6a543b$3.length;
  while (true) {
    const tmpIfTest$9 /*:boolean*/ = _0x49e06f$2 < _0xe36e0;
    if (tmpIfTest$9) {
      const tmpStringConcatL$1 /*:string*/ = $frfr(tmpFree$66, _0x6a543b$3, _0x49e06f$2);
      _0x3f61ee$1 = `${_0x3f61ee$1}%${tmpStringConcatL$1}`;
      _0x49e06f$2 = _0x49e06f$2 + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA_tmpSSA__0x3849a1$2 /*:string*/ = decodeURIComponent(_0x3f61ee$1);
  let tmpClusterSSA__0x2f4501$1 /*:number*/ = 0;
  const _0x23cc4c /*:array*/ /*truthy*/ = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    156,
    157,
    158,
    159,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    179,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    195,
    196,
    197,
    198,
    199,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    215,
    216,
    217,
    218,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    241,
    242,
    243,
    244,
    245,
    246,
    247,
    248,
    249,
    250,
    251,
    252,
    253,
    254,
    255,
  ];
  while (true) {
    const tmpIfTest$13 /*:boolean*/ = tmpClusterSSA__0x2f4501$1 < 256;
    if (tmpIfTest$13) {
      const tmpBinBothRhs$1 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
      const tmpBinBothLhs$55 /*:primitive*/ = $frfr(tmpFree$3, _0x5b220f$1, tmpBinBothRhs$1, tmpClusterSSA__0x2f4501$1);
      _0x5b220f$1 = tmpBinBothLhs$55 % 256;
      const tmpClusterSSA__0x1a8c54 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
      const tmpAssignComputedRhs /*:primitive*/ = _0x23cc4c[_0x5b220f$1];
      _0x23cc4c[tmpClusterSSA__0x2f4501$1] = tmpAssignComputedRhs;
      _0x23cc4c[_0x5b220f$1] = tmpClusterSSA__0x1a8c54;
      tmpClusterSSA__0x2f4501$1 = tmpClusterSSA__0x2f4501$1 + 1;
    } else {
      break;
    }
  }
  let tmpClusterSSA__0x2f4501$4 /*:number*/ = 0;
  let tmpClusterSSA__0x5b220f /*:number*/ = 0;
  let _0xc5c59f$1 /*:number*/ = 0;
  while (true) {
    const tmpBinBothRhs$75 /*:number*/ = tmpClusterSSA_tmpSSA__0x3849a1$2.length;
    const tmpIfTest$15 /*:boolean*/ = _0xc5c59f$1 < tmpBinBothRhs$75;
    if (tmpIfTest$15) {
      const tmpBinBothLhs$77 /*:number*/ = tmpClusterSSA__0x2f4501$4 + 1;
      tmpClusterSSA__0x2f4501$4 = tmpBinBothLhs$77 % 256;
      const tmpBinBothRhs$87 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpBinBothLhs$85 /*:primitive*/ = tmpClusterSSA__0x5b220f + tmpBinBothRhs$87;
      tmpClusterSSA__0x5b220f = tmpBinBothLhs$85 % 256;
      const tmpClusterSSA__0x1a8c54$1 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpAssignComputedRhs$1 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x5b220f];
      _0x23cc4c[tmpClusterSSA__0x2f4501$4] = tmpAssignComputedRhs$1;
      _0x23cc4c[tmpClusterSSA__0x5b220f] = tmpClusterSSA__0x1a8c54$1;
      const tmpBinBothLhs$4 /*:number*/ = $dotCall($string_charCodeAt, tmpClusterSSA_tmpSSA__0x3849a1$2, `charCodeAt`, _0xc5c59f$1);
      const tmpBinBothLhs$6 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpBinBothRhs$5 /*:primitive*/ = _0x23cc4c[tmpClusterSSA__0x5b220f];
      const tmpCalleeParam$26 /*:number*/ = $frfr(tmpFree$60, tmpBinBothLhs$6, tmpBinBothRhs$5);
      const tmpBinBothRhs$6 /*:primitive*/ = _0x23cc4c[tmpCalleeParam$26];
      const tmpBinBothRhs$91 /*:string*/ = $frfr(tmpFree$2, tmpBinBothLhs$4, tmpBinBothRhs$6);
      _0x449d44$1 = `${_0x449d44$1}${tmpBinBothRhs$91}`;
      _0xc5c59f$1 = _0xc5c59f$1 + 1;
    } else {
      break;
    }
  }
  return _0x449d44$1;
};
const tmpCalleeParam /*:string*/ = DECODER_FUNC();
$(tmpCalleeParam);
const tmpCalleeParam$1 /*:string*/ = DECODER_FUNC();
$(tmpCalleeParam$1);
const tmpCalleeParam$3 /*:string*/ = DECODER_FUNC();
$(tmpCalleeParam$3);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const tmpFree$3 = function $free(_0x5b220f, tmpBinBothRhs$59, tmpClusterSSA__0x2f4501$2) {
  const tmpBinBothRhs$57 = $dotCall($string_charCodeAt, `s6T^`, `charCodeAt`, tmpClusterSSA__0x2f4501$2 % 4);
  const tmpRet = _0x5b220f + tmpBinBothRhs$59 + tmpBinBothRhs$57;
  return tmpRet;
};
const tmpFree$2 = function $free($dlr_$$4, $dlr_$$6) {
  const tmpRet$2 = $String_fromCharCode($dlr_$$4 ^ $dlr_$$6);
  return tmpRet$2;
};
const tmpFree$21 = function $free($dlr_$$8) {
  const tmpRet$19 = $dotCall($string_charCodeAt, `function(){}`, `charCodeAt`, $dlr_$$8 + 10) - 10 === 0;
  return tmpRet$19;
};
const tmpFree$66 = function $free($dlr_$$12, $dlr_$$14) {
  const tmpStringConcatL = $dotCall($number_toString, $dotCall($string_charCodeAt, $dlr_$$12, `charCodeAt`, $dlr_$$14), `toString`, 16);
  const tmpBinBothRhs$37 = $dotCall($string_slice, `00${tmpStringConcatL}`, `slice`, -2);
  return tmpBinBothRhs$37;
};
const tmpFree$64 = function $free($dlr_$$16, $dlr_$$18) {
  const tmpBinBothRhs$21 = $dlr_$$18 >> ((-2 * $dlr_$$16) & 6);
  const tmpRet$62 = 255 & tmpBinBothRhs$21;
  return tmpRet$62;
};
const tmpFree$60 = function $free($dlr_$$20, $dlr_$$22) {
  const tmpRet$58 = ($dlr_$$20 + $dlr_$$22) % 256;
  return tmpRet$58;
};
const DECODER_FUNC = function () {
  let _0x5b220f$1 = 0;
  let _0x449d44$1 = ``;
  let _0x6a543b$3 = ``;
  let _0x3f61ee$1 = ``;
  let _0xfb56b2$2 = 0;
  let _0xe44bb2$1 = undefined;
  let _0x100da1$2 = 0;
  while (true) {
    const tmpPostUpdArgIdent$1 = _0x100da1$2;
    _0x100da1$2 = _0x100da1$2 + 1;
    const tmpClusterSSA__0x23e39f = $dotCall($string_charAt, `W6CVcEg5HSka`, `charAt`, tmpPostUpdArgIdent$1);
    if (tmpClusterSSA__0x23e39f) {
      const tmpClusterSSA__0x23e39f$1 = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        tmpClusterSSA__0x23e39f,
      );
      if (~tmpClusterSSA__0x23e39f$1) {
        if (_0xfb56b2$2 % 4) {
          _0xe44bb2$1 = _0xe44bb2$1 * 64 + tmpClusterSSA__0x23e39f$1;
        } else {
          _0xe44bb2$1 = tmpClusterSSA__0x23e39f$1;
        }
        const tmpPostUpdArgIdent$3 = _0xfb56b2$2;
        _0xfb56b2$2 = _0xfb56b2$2 + 1;
        if (tmpPostUpdArgIdent$3 % 4) {
          let tmpBinBothRhs$11 = undefined;
          if (tmpFree$21(_0x100da1$2)) {
            tmpBinBothRhs$11 = _0xfb56b2$2;
          } else {
            tmpBinBothRhs$11 = $String_fromCharCode(tmpFree$64(_0xfb56b2$2, _0xe44bb2$1));
          }
          _0x6a543b$3 = _0x6a543b$3 + tmpBinBothRhs$11;
        }
      }
    } else {
      break;
    }
  }
  let _0x49e06f$2 = 0;
  const _0xe36e0 = _0x6a543b$3.length;
  while (true) {
    if (_0x49e06f$2 < _0xe36e0) {
      const tmpStringConcatL$1 = tmpFree$66(_0x6a543b$3, _0x49e06f$2);
      _0x3f61ee$1 = `${_0x3f61ee$1}%${tmpStringConcatL$1}`;
      _0x49e06f$2 = _0x49e06f$2 + 1;
    } else {
      break;
    }
  }
  const tmpClusterSSA_tmpSSA__0x3849a1$2 = decodeURIComponent(_0x3f61ee$1);
  let tmpClusterSSA__0x2f4501$1 = 0;
  const _0x23cc4c = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    156,
    157,
    158,
    159,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    179,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    195,
    196,
    197,
    198,
    199,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    215,
    216,
    217,
    218,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    241,
    242,
    243,
    244,
    245,
    246,
    247,
    248,
    249,
    250,
    251,
    252,
    253,
    254,
    255,
  ];
  while (true) {
    if (tmpClusterSSA__0x2f4501$1 < 256) {
      _0x5b220f$1 = tmpFree$3(_0x5b220f$1, _0x23cc4c[tmpClusterSSA__0x2f4501$1], tmpClusterSSA__0x2f4501$1) % 256;
      const tmpClusterSSA__0x1a8c54 = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
      const tmpAssignComputedRhs = _0x23cc4c[_0x5b220f$1];
      _0x23cc4c[tmpClusterSSA__0x2f4501$1] = tmpAssignComputedRhs;
      _0x23cc4c[_0x5b220f$1] = tmpClusterSSA__0x1a8c54;
      tmpClusterSSA__0x2f4501$1 = tmpClusterSSA__0x2f4501$1 + 1;
    } else {
      break;
    }
  }
  let tmpClusterSSA__0x2f4501$4 = 0;
  let tmpClusterSSA__0x5b220f = 0;
  let _0xc5c59f$1 = 0;
  while (true) {
    if (_0xc5c59f$1 < tmpClusterSSA_tmpSSA__0x3849a1$2.length) {
      tmpClusterSSA__0x2f4501$4 = (tmpClusterSSA__0x2f4501$4 + 1) % 256;
      tmpClusterSSA__0x5b220f = (tmpClusterSSA__0x5b220f + _0x23cc4c[tmpClusterSSA__0x2f4501$4]) % 256;
      const tmpClusterSSA__0x1a8c54$1 = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpAssignComputedRhs$1 = _0x23cc4c[tmpClusterSSA__0x5b220f];
      _0x23cc4c[tmpClusterSSA__0x2f4501$4] = tmpAssignComputedRhs$1;
      _0x23cc4c[tmpClusterSSA__0x5b220f] = tmpClusterSSA__0x1a8c54$1;
      const tmpBinBothLhs$4 = $dotCall($string_charCodeAt, tmpClusterSSA_tmpSSA__0x3849a1$2, `charCodeAt`, _0xc5c59f$1);
      const tmpCalleeParam$26 = tmpFree$60(_0x23cc4c[tmpClusterSSA__0x2f4501$4], _0x23cc4c[tmpClusterSSA__0x5b220f]);
      const tmpBinBothRhs$91 = tmpFree$2(tmpBinBothLhs$4, _0x23cc4c[tmpCalleeParam$26]);
      _0x449d44$1 = `${_0x449d44$1}${tmpBinBothRhs$91}`;
      _0xc5c59f$1 = _0xc5c59f$1 + 1;
    } else {
      break;
    }
  }
  return _0x449d44$1;
};
$(DECODER_FUNC());
$(DECODER_FUNC());
$(DECODER_FUNC());
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1,$$2 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  debugger;
  const e = d % 4;
  const f = $dotCall( $string_charCodeAt, "s6T^", "charCodeAt", e );
  const g = b + c;
  const h = g + f;
  return h;
};
const i = function $free($$0,$$1 ) {
  const j = $$0;
  const k = $$1;
  debugger;
  const l = j ^ k;
  const m = $String_fromCharCode( l );
  return m;
};
const n = function $free($$0 ) {
  const o = $$0;
  debugger;
  const p = o + 10;
  const q = $dotCall( $string_charCodeAt, "function(){}", "charCodeAt", p );
  const r = q - 10;
  const s = r === 0;
  return s;
};
const t = function $free($$0,$$1 ) {
  const u = $$0;
  const v = $$1;
  debugger;
  const w = $dotCall( $string_charCodeAt, u, "charCodeAt", v );
  const x = $dotCall( $number_toString, w, "toString", 16 );
  const y = `00${x}`;
  const z = $dotCall( $string_slice, y, "slice", -2 );
  return z;
};
const ba = function $free($$0,$$1 ) {
  const bb = $$0;
  const bc = $$1;
  debugger;
  const bd = -2 * bb;
  const be = bd & 6;
  const bf = bc >> be;
  const bg = 255 & bf;
  return bg;
};
const bh = function $free($$0,$$1 ) {
  const bi = $$0;
  const bj = $$1;
  debugger;
  const bk = bi + bj;
  const bl = bk % 256;
  return bl;
};
const bm = function() {
  debugger;
  let bn = 0;
  let bo = "";
  let bp = "";
  let bq = "";
  let br = 0;
  let bs = undefined;
  let bt = 0;
  while (true) {
    const bu = bt;
    bt = bt + 1;
    const bv = $dotCall( $string_charAt, "W6CVcEg5HSka", "charAt", bu );
    if (bv) {
      const bw = $dotCall( $string_indexOf, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=", "indexOf", bv );
      const bx = ~bw;
      if (bx) {
        const by = br % 4;
        if (by) {
          const bz = bs * 64;
          bs = bz + bw;
        }
        else {
          bs = bw;
        }
        const ca = br;
        br = br + 1;
        const cb = ca % 4;
        if (cb) {
          let cc = undefined;
          const cd = ce( n, bt );
          if (cd) {
            cc = br;
          }
          else {
            const cf = ce( ba, br, bs );
            cc = $String_fromCharCode( cf );
          }
          bp = bp + cc;
        }
      }
    }
    else {
      break;
    }
  }
  let cg = 0;
  const ch = bp.length;
  while (true) {
    const ci = cg < ch;
    if (ci) {
      const cj = ce( t, bp, cg );
      bq = `${bq}%${cj}`;
      cg = cg + 1;
    }
    else {
      break;
    }
  }
  const ck = decodeURIComponent( bq );
  let cl = 0;
  const cm = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255 ];
  while (true) {
    const cn = cl < 256;
    if (cn) {
      const co = cm[ cl ];
      const cp = ce( a, bn, co, cl );
      bn = cp % 256;
      const cq = cm[ cl ];
      const cr = cm[ bn ];
      cm[cl] = cr;
      cm[bn] = cq;
      cl = cl + 1;
    }
    else {
      break;
    }
  }
  let cs = 0;
  let ct = 0;
  let cu = 0;
  while (true) {
    const cv = ck.length;
    const cw = cu < cv;
    if (cw) {
      const cx = cs + 1;
      cs = cx % 256;
      const cy = cm[ cs ];
      const cz = ct + cy;
      ct = cz % 256;
      const da = cm[ cs ];
      const db = cm[ ct ];
      cm[cs] = db;
      cm[ct] = da;
      const dc = $dotCall( $string_charCodeAt, ck, "charCodeAt", cu );
      const dd = cm[ cs ];
      const de = cm[ ct ];
      const df = ce( bh, dd, de );
      const dg = cm[ df ];
      const dh = ce( i, dc, dg );
      bo = `${bo}${dh}`;
      cu = cu + 1;
    }
    else {
      break;
    }
  }
  return bo;
};
const di = bm();
$( di );
const dj = bm();
$( dj );
const dk = bm();
$( dk );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const tmpFree = function $free($$0, $$1, $$2, $$3) {
  let $dlr_$$0 = $$0;
  let $dlr_$$1 = $$1;
  let $dlr_$$2 = $$2;
  let $dlr_$$3 = $$3;
  debugger;
  const tmpClusterSSA__0x2f4501$3 = $dlr_$$0;
  const tmpBinBothRhs$61 = $dlr_$$1;
  const _0x2934b2 = $dlr_$$2;
  const tmpBinBothLhs$57 = $dlr_$$3;
  const tmpMCP$9 = tmpClusterSSA__0x2f4501$3 % tmpBinBothRhs$61;
  const tmpBinBothRhs$57 = $dotCall($string_charCodeAt, _0x2934b2, `charCodeAt`, tmpMCP$9);
  const tmpRet = tmpBinBothLhs$57 + tmpBinBothRhs$57;
  return tmpRet;
};
const tmpFree$2 = function $free($$0, $$1) {
  let $dlr_$$4 = $$0;
  let $dlr_$$6 = $$1;
  debugger;
  const tmpBinBothLhs$93 = $dlr_$$4;
  const tmpBinBothRhs$93 = $dlr_$$6;
  const tmpMCP$11 = tmpBinBothLhs$93 ^ tmpBinBothRhs$93;
  const tmpRet$2 = $String_fromCharCode(tmpMCP$11);
  return tmpRet$2;
};
const tmpFree$21 = function $free($$0, $$1) {
  let $dlr_$$8 = $$0;
  let $dlr_$$10 = $$1;
  debugger;
  const _0x100da1 = $dlr_$$8;
  const _0x107c2f$1 = $dlr_$$10;
  const tmpMCP$1 = _0x100da1 + 10;
  const tmpBinBothLhs$15 = $dotCall($string_charCodeAt, _0x107c2f$1, `charCodeAt`, tmpMCP$1);
  const tmpBinBothLhs$13 = tmpBinBothLhs$15 - 10;
  const tmpRet$19 = tmpBinBothLhs$13 === 0;
  return tmpRet$19;
};
const tmpFree$66 = function $free($$0, $$1) {
  let $dlr_$$12 = $$0;
  let $dlr_$$14 = $$1;
  debugger;
  const _0x6a543b$4 = $dlr_$$12;
  const _0x49e06f$1 = $dlr_$$14;
  const tmpRet$55 = $dotCall($string_charCodeAt, _0x6a543b$4, `charCodeAt`, $dlr_$$14);
  const tmpStringConcatL = $dotCall($number_toString, tmpRet$55, `toString`, 16);
  const tmpBinBothLhs = `00`;
  const tmpBinBothRhs = $coerce(tmpStringConcatL, `string`);
  const tmpBinLhs = tmpBinBothLhs + tmpBinBothRhs;
  const tmpMCOO = $coerce(tmpBinLhs, `plustr`);
  const tmpBinBothRhs$37 = $dotCall($string_slice, tmpMCOO, `slice`, -2);
  return tmpBinBothRhs$37;
};
const tmpFree$64 = function $free($$0, $$1) {
  let $dlr_$$16 = $$0;
  let $dlr_$$18 = $$1;
  debugger;
  const _0xfb56b2$1 = $dlr_$$16;
  const _0xe44bb2 = $dlr_$$18;
  const tmpBinBothLhs$27 = -2 * _0xfb56b2$1;
  const tmpBinBothRhs$25 = tmpBinBothLhs$27 & 6;
  const tmpBinBothRhs$21 = _0xe44bb2 >> tmpBinBothRhs$25;
  const tmpRet$62 = 255 & tmpBinBothRhs$21;
  return tmpRet$62;
};
const tmpFree$60 = function $free($$0, $$1) {
  let $dlr_$$20 = $$0;
  let $dlr_$$22 = $$1;
  debugger;
  const tmpBinBothLhs$97 = $dlr_$$20;
  const tmpBinBothRhs$97 = $dlr_$$22;
  const tmpBinBothLhs$95 = tmpBinBothLhs$97 + tmpBinBothRhs$97;
  const tmpRet$58 = tmpBinBothLhs$95 % 256;
  return tmpRet$58;
};
const BASESIXTANDURLDECODE = function ($$0) {
  let $dlr_$$24 = $$0;
  debugger;
  const _0x1a31cc$1 = $dlr_$$24;
  let _0x6a543b$3 = ``;
  let _0x3f61ee$2 = ``;
  const _0x107c2f$2 = `function(){}`;
  let _0xfb56b2$2 = 0;
  let _0xe44bb2$1 = undefined;
  let _0x100da1$1 = 0;
  while (true) {
    const tmpMCF = _0x1a31cc$1.charAt;
    const tmpPostUpdArgIdent = _0x100da1$1;
    _0x100da1$1 = _0x100da1$1 + 1;
    const tmpClusterSSA__0x23e39f = $dotCall(tmpMCF, _0x1a31cc$1, `charAt`, tmpPostUpdArgIdent);
    if (tmpClusterSSA__0x23e39f) {
      const tmpClusterSSA__0x23e39f$1 = $dotCall(
        $string_indexOf,
        `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=`,
        `indexOf`,
        tmpClusterSSA__0x23e39f,
      );
      const tmpIfTest$3 = ~tmpClusterSSA__0x23e39f$1;
      if (tmpIfTest$3) {
        const tmpIfTest$5 = _0xfb56b2$2 % 4;
        if (tmpIfTest$5) {
          const tmpBinLhs$13 = _0xe44bb2$1 * 64;
          _0xe44bb2$1 = tmpBinLhs$13 + tmpClusterSSA__0x23e39f$1;
        } else {
          _0xe44bb2$1 = tmpClusterSSA__0x23e39f$1;
        }
        const tmpPostUpdArgIdent$1 = _0xfb56b2$2;
        _0xfb56b2$2 = _0xfb56b2$2 + 1;
        const tmpClusterSSA_tmpIfTest$3 = tmpPostUpdArgIdent$1 % 4;
        if (tmpClusterSSA_tmpIfTest$3) {
          let tmpBinBothRhs$11 = undefined;
          const tmpIfTest$7 = $frfr(tmpFree$21, _0x100da1$1, _0x107c2f$2);
          if (tmpIfTest$7) {
            tmpBinBothRhs$11 = _0xfb56b2$2;
          } else {
            const tmpMCP$3 = $frfr(tmpFree$64, _0xfb56b2$2, _0xe44bb2$1);
            tmpBinBothRhs$11 = $String_fromCharCode(tmpMCP$3);
          }
          _0x6a543b$3 = _0x6a543b$3 + tmpBinBothRhs$11;
        } else {
        }
      } else {
      }
    } else {
      break;
    }
  }
  let _0x49e06f$2 = 0;
  const _0xe36e0 = _0x6a543b$3.length;
  while (true) {
    const tmpIfTest$9 = _0x49e06f$2 < _0xe36e0;
    if (tmpIfTest$9) {
      const tmpStringConcatL$1 = $frfr(tmpFree$66, _0x6a543b$3, _0x49e06f$2);
      const tmpBinBothLhs$5 = ``;
      const tmpBinBothRhs$3 = $coerce(_0x3f61ee$2, `string`);
      const tmpBinLhs$3 = tmpBinBothLhs$5 + tmpBinBothRhs$3;
      const tmpStringConcatR = $coerce(tmpBinLhs$3, `plustr`);
      const tmpBinBothLhs$3 = `${tmpStringConcatR}%`;
      const tmpBinBothRhs$1 = $coerce(tmpStringConcatL$1, `string`);
      const tmpBinLhs$1 = tmpBinBothLhs$3 + tmpBinBothRhs$1;
      _0x3f61ee$2 = $coerce(tmpBinLhs$1, `plustr`);
      _0x49e06f$2 = _0x49e06f$2 + 1;
    } else {
      break;
    }
  }
  const tmpReturnArg$3 = decodeURIComponent(_0x3f61ee$2);
  return tmpReturnArg$3;
};
const DECODER_FUNC = function ($$0, $$1) {
  let $dlr_$$26 = $$0;
  let $dlr_$$28 = $$1;
  debugger;
  const _0x2934b2$1 = $dlr_$$26;
  const _0x346405 = $dlr_$$28;
  let _0x5b220f = 0;
  let _0x449d44 = ``;
  const tmpSSA__0x3849a1$2 = BASESIXTANDURLDECODE(_0x346405);
  let tmpClusterSSA__0x2f4501$1 = 0;
  const _0x23cc4c = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    90,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99,
    100,
    101,
    102,
    103,
    104,
    105,
    106,
    107,
    108,
    109,
    110,
    111,
    112,
    113,
    114,
    115,
    116,
    117,
    118,
    119,
    120,
    121,
    122,
    123,
    124,
    125,
    126,
    127,
    128,
    129,
    130,
    131,
    132,
    133,
    134,
    135,
    136,
    137,
    138,
    139,
    140,
    141,
    142,
    143,
    144,
    145,
    146,
    147,
    148,
    149,
    150,
    151,
    152,
    153,
    154,
    155,
    156,
    157,
    158,
    159,
    160,
    161,
    162,
    163,
    164,
    165,
    166,
    167,
    168,
    169,
    170,
    171,
    172,
    173,
    174,
    175,
    176,
    177,
    178,
    179,
    180,
    181,
    182,
    183,
    184,
    185,
    186,
    187,
    188,
    189,
    190,
    191,
    192,
    193,
    194,
    195,
    196,
    197,
    198,
    199,
    200,
    201,
    202,
    203,
    204,
    205,
    206,
    207,
    208,
    209,
    210,
    211,
    212,
    213,
    214,
    215,
    216,
    217,
    218,
    219,
    220,
    221,
    222,
    223,
    224,
    225,
    226,
    227,
    228,
    229,
    230,
    231,
    232,
    233,
    234,
    235,
    236,
    237,
    238,
    239,
    240,
    241,
    242,
    243,
    244,
    245,
    246,
    247,
    248,
    249,
    250,
    251,
    252,
    253,
    254,
    255,
  ];
  while (true) {
    const tmpIfTest$13 = tmpClusterSSA__0x2f4501$1 < 256;
    if (tmpIfTest$13) {
      const tmpBinBothRhs$59 = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
      const tmpBinBothLhs$1 = _0x5b220f + tmpBinBothRhs$59;
      const tmpBinBothRhs$2 = _0x2934b2$1.length;
      const tmpBinBothLhs$55 = $frfr(tmpFree, tmpClusterSSA__0x2f4501$1, tmpBinBothRhs$2, _0x2934b2$1, tmpBinBothLhs$1);
      _0x5b220f = tmpBinBothLhs$55 % 256;
      const tmpClusterSSA__0x1a8c54 = _0x23cc4c[tmpClusterSSA__0x2f4501$1];
      const tmpAssignComputedRhs = _0x23cc4c[_0x5b220f];
      _0x23cc4c[tmpClusterSSA__0x2f4501$1] = tmpAssignComputedRhs;
      _0x23cc4c[_0x5b220f] = tmpClusterSSA__0x1a8c54;
      tmpClusterSSA__0x2f4501$1 = tmpClusterSSA__0x2f4501$1 + 1;
    } else {
      break;
    }
  }
  let tmpClusterSSA__0x2f4501$4 = 0;
  let tmpClusterSSA__0x5b220f = 0;
  let _0xc5c59f$1 = 0;
  while (true) {
    const tmpBinBothRhs$75 = tmpSSA__0x3849a1$2.length;
    const tmpIfTest$15 = _0xc5c59f$1 < tmpBinBothRhs$75;
    if (tmpIfTest$15) {
      const tmpBinBothLhs$77 = tmpClusterSSA__0x2f4501$4 + 1;
      tmpClusterSSA__0x2f4501$4 = tmpBinBothLhs$77 % 256;
      const tmpBinBothRhs$87 = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpBinBothLhs$85 = tmpClusterSSA__0x5b220f + tmpBinBothRhs$87;
      tmpClusterSSA__0x5b220f = tmpBinBothLhs$85 % 256;
      const tmpClusterSSA__0x1a8c54$1 = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpAssignComputedRhs$1 = _0x23cc4c[tmpClusterSSA__0x5b220f];
      _0x23cc4c[tmpClusterSSA__0x2f4501$4] = tmpAssignComputedRhs$1;
      _0x23cc4c[tmpClusterSSA__0x5b220f] = tmpClusterSSA__0x1a8c54$1;
      const tmpBinBothLhs$2 = $dotCall($string_charCodeAt, tmpSSA__0x3849a1$2, `charCodeAt`, _0xc5c59f$1);
      const tmpBinBothLhs$4 = _0x23cc4c[tmpClusterSSA__0x2f4501$4];
      const tmpBinBothRhs$5 = _0x23cc4c[tmpClusterSSA__0x5b220f];
      const tmpCalleeParam$26 = $frfr(tmpFree$60, tmpBinBothLhs$4, tmpBinBothRhs$5);
      const tmpBinBothRhs$6 = _0x23cc4c[tmpCalleeParam$26];
      const tmpBinBothRhs$91 = $frfr(tmpFree$2, tmpBinBothLhs$2, tmpBinBothRhs$6);
      const tmpBinBothLhs$9 = ``;
      const tmpBinBothRhs$9 = $coerce(_0x449d44, `string`);
      const tmpBinLhs$7 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
      const tmpBinBothLhs$7 = $coerce(tmpBinLhs$7, `plustr`);
      const tmpBinBothRhs$7 = $coerce(tmpBinBothRhs$91, `string`);
      const tmpBinLhs$5 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
      _0x449d44 = $coerce(tmpBinLhs$5, `plustr`);
      _0xc5c59f$1 = _0xc5c59f$1 + 1;
    } else {
      break;
    }
  }
  return _0x449d44;
};
let tmpCalleeParam = DECODER_FUNC(`s6T^`, `W6CVcEg5HSka`);
$(tmpCalleeParam);
let tmpCalleeParam$1 = DECODER_FUNC(`s6T^`, `W6CVcEg5HSka`);
$(tmpCalleeParam$1);
let tmpCalleeParam$3 = DECODER_FUNC(`s6T^`, `W6CVcEg5HSka`);
$(tmpCalleeParam$3);
`````


## Todos triggered


- (todo) - at least one of the call args to
- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) Support string.charCodeAt when the object is not a string literal
- (todo) Support this ident in isFree CallExpression: $string_indexOf
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) free with zero args, we can eliminate this?
- (todo) regular property access of an ident feels tricky;
- (todo) support Identifier as var init in let_hoisting noob check
- (todo) we can still proceed with the loop as long as there is no let-write anywhere in the loop, inc nested


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: '(Xåậm'
 - 2: '(Xåậm'
 - 3: '(Xåậm'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
