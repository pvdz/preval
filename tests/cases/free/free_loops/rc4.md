# Preval test case

# rc4.md

> Free > Free loops > Rc4
>
> Example in the wild doing RC4 decoding

At its core the rc4 function is free. But we have to allow arrays to make that work.
And we can, if the arrays are fully predictable and don't escape the free function...

We solve this with freeLoops

## Options

Preval goes apeshit if you allow it
- unroll: 0
- loopProtectLimit: 100

## Input

`````js filename=intro
const freeA = function $free(a, b, c, d) {
  const tmpRet = d + $dotCall($string_charCodeAt, c, `charCodeAt`, a % b);
  return tmpRet;
};
const freeB = function $free(e, f) {
  const tmpRet2 = (e + f) % 256;
  return tmpRet2;
};
const freeC = function $free(g, h) {
  const tmpRet3 = $String_fromCharCode(g ^ h);
  return tmpRet3;
};
const rc4 = function(key, str) {
  // This is "RC4 Key Scheduling"
  let stepper1 = 0;
  let counter1 = 0;
  const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255];
  while (true) {
    if (counter1 < 256) {
      const tmpBinBothLhs$2 = stepper1 + arr[counter1];
      stepper1 = $frfr(freeA, counter1, key.length, key, tmpBinBothLhs$2) % 256;
      // swap:
      const arr_val = arr[counter1];
      const arr_val2 = arr[stepper1];
      arr[counter1] = arr_val2;
      arr[stepper1] = arr_val;

      counter1 = counter1 + 1;
    } else {
      break;
    }
  }

  // This is "RC4 PRGA"
  let result = ``;
  let counter2 = 0;
  let stepper2 = 0;
  let pointer = 0;
  while (true) {
    const raw_str = atob(str);
    if (pointer < raw_str.length) {
      counter2 = (counter2 + 1) % 256;
      stepper2 = (stepper2 + arr[counter2]) % 256;
      // swap
      const swap_a = arr[counter2];
      const swap_b = arr[stepper2];
      arr[counter2] = swap_b;
      arr[stepper2] = swap_a;

      const chr = $dotCall($string_charCodeAt, raw_str, `charCodeAt`, pointer);
      const fra = $frfr(freeB, arr[counter2], arr[stepper2]);
      const frb = $frfr(freeC, chr, arr[fra]);
      result = `${result}${frb}`;
      pointer = pointer + 1;
    } else {
      break;
    }
  }

  // $('final:', result);

  return result;
};

$(rc4(`s6T^`, "W4bWW6pcPSoU"));
$(rc4(`eZDG`, "WQNcNaOVnG"));
$(rc4(`yfRM`, "aaddP0j+"));
$(rc4(`dcGC`, "nJW9W5Ke"));
`````


## Settled


`````js filename=intro
const freeA /*:(number, number, string, primitive)=>primitive*/ = function $free($$0, $$1, $$2, $$3) {
  const a /*:number*/ = $$0;
  const b /*:number*/ = $$1;
  const c /*:string*/ = $$2;
  const d /*:primitive*/ = $$3;
  debugger;
  const tmpCalleeParam$3 /*:number*/ = a % b;
  const tmpBinBothRhs /*:number*/ = $dotCall($string_charCodeAt, c, `charCodeAt`, tmpCalleeParam$3);
  const tmpRet /*:primitive*/ = d + tmpBinBothRhs;
  return tmpRet;
};
const freeB /*:(primitive, primitive)=>number*/ = function $free($$0, $$1) {
  const e /*:primitive*/ = $$0;
  const f /*:primitive*/ = $$1;
  debugger;
  const tmpBinLhs /*:primitive*/ = e + f;
  const tmpRet2 /*:number*/ = tmpBinLhs % 256;
  return tmpRet2;
};
const freeC /*:(number, primitive)=>string*/ = function $free($$0, $$1) {
  const g /*:number*/ = $$0;
  const h /*:primitive*/ = $$1;
  debugger;
  const tmpCalleeParam$5 /*:number*/ = g ^ h;
  const tmpRet3 /*:string*/ = $String_fromCharCode(tmpCalleeParam$5);
  return tmpRet3;
};
const rc4 /*:(string, string)=>string*/ = function ($$0, $$1) {
  const key$1 /*:string*/ = $$0;
  const str /*:string*/ = $$1;
  debugger;
  let stepper1 /*:number*/ = 0;
  let counter1 /*:number*/ = 0;
  const arr /*:array*/ /*truthy*/ = [
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
    const tmpIfTest /*:boolean*/ = counter1 < 256;
    if (tmpIfTest) {
      const tmpBinBothRhs$1 /*:primitive*/ = arr[counter1];
      const tmpBinBothLhs$3 /*:primitive*/ = stepper1 + tmpBinBothRhs$1;
      const tmpCalleeParam$4 /*:number*/ = key$1.length;
      const tmpBinLhs$1 /*:primitive*/ = $frfr(freeA, counter1, tmpCalleeParam$4, key$1, tmpBinBothLhs$3);
      stepper1 = tmpBinLhs$1 % 256;
      const arr_val /*:primitive*/ = arr[counter1];
      const arr_val2 /*:primitive*/ = arr[stepper1];
      arr[counter1] = arr_val2;
      arr[stepper1] = arr_val;
      counter1 = counter1 + 1;
    } else {
      break;
    }
  }
  let result$1 /*:string*/ = ``;
  let counter2 /*:number*/ = 0;
  let stepper2 /*:number*/ = 0;
  let pointer /*:number*/ = 0;
  while (true) {
    const raw_str /*:string*/ = atob(str);
    const tmpBinBothRhs$3 /*:number*/ = raw_str.length;
    const tmpIfTest$1 /*:boolean*/ = pointer < tmpBinBothRhs$3;
    if (tmpIfTest$1) {
      const tmpBinLhs$3 /*:number*/ = counter2 + 1;
      counter2 = tmpBinLhs$3 % 256;
      const tmpBinBothRhs$5 /*:primitive*/ = arr[counter2];
      const tmpBinLhs$5 /*:primitive*/ = stepper2 + tmpBinBothRhs$5;
      stepper2 = tmpBinLhs$5 % 256;
      const swap_a /*:primitive*/ = arr[counter2];
      const swap_b /*:primitive*/ = arr[stepper2];
      arr[counter2] = swap_b;
      arr[stepper2] = swap_a;
      const chr /*:number*/ = $dotCall($string_charCodeAt, raw_str, `charCodeAt`, pointer);
      const tmpCalleeParam$19 /*:primitive*/ = arr[counter2];
      const tmpCalleeParam$21 /*:primitive*/ = arr[stepper2];
      const fra /*:number*/ = $frfr(freeB, tmpCalleeParam$19, tmpCalleeParam$21);
      const tmpCalleeParam$27 /*:primitive*/ = arr[fra];
      const frb /*:string*/ = $frfr(freeC, chr, tmpCalleeParam$27);
      result$1 = `${result$1}${frb}`;
      pointer = pointer + 1;
    } else {
      break;
    }
  }
  return result$1;
};
const tmpCalleeParam$29 /*:string*/ = rc4(`s6T^`, `W4bWW6pcPSoU`);
$(tmpCalleeParam$29);
const tmpCalleeParam$31 /*:string*/ = rc4(`eZDG`, `WQNcNaOVnG`);
$(tmpCalleeParam$31);
const tmpCalleeParam$33 /*:string*/ = rc4(`yfRM`, `aaddP0j+`);
$(tmpCalleeParam$33);
const tmpCalleeParam$35 /*:string*/ = rc4(`dcGC`, `nJW9W5Ke`);
$(tmpCalleeParam$35);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const freeA = function $free(a, b, c, d) {
  const tmpRet = d + $dotCall($string_charCodeAt, c, `charCodeAt`, a % b);
  return tmpRet;
};
const freeB = function $free(e, f) {
  const tmpRet2 = (e + f) % 256;
  return tmpRet2;
};
const freeC = function $free(g, h) {
  const tmpRet3 = $String_fromCharCode(g ^ h);
  return tmpRet3;
};
const rc4 = function (key$1, str) {
  let stepper1 = 0;
  let counter1 = 0;
  const arr = [
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
    if (counter1 < 256) {
      const tmpBinBothLhs$3 = stepper1 + arr[counter1];
      stepper1 = freeA(counter1, key$1.length, key$1, tmpBinBothLhs$3) % 256;
      const arr_val = arr[counter1];
      const arr_val2 = arr[stepper1];
      arr[counter1] = arr_val2;
      arr[stepper1] = arr_val;
      counter1 = counter1 + 1;
    } else {
      break;
    }
  }
  let result$1 = ``;
  let counter2 = 0;
  let stepper2 = 0;
  let pointer = 0;
  while (true) {
    const raw_str = atob(str);
    if (pointer < raw_str.length) {
      counter2 = (counter2 + 1) % 256;
      stepper2 = (stepper2 + arr[counter2]) % 256;
      const swap_a = arr[counter2];
      const swap_b = arr[stepper2];
      arr[counter2] = swap_b;
      arr[stepper2] = swap_a;
      const chr = $dotCall($string_charCodeAt, raw_str, `charCodeAt`, pointer);
      const fra = freeB(arr[counter2], arr[stepper2]);
      const frb = freeC(chr, arr[fra]);
      result$1 = `${result$1}${frb}`;
      pointer = pointer + 1;
    } else {
      break;
    }
  }
  return result$1;
};
$(rc4(`s6T^`, `W4bWW6pcPSoU`));
$(rc4(`eZDG`, `WQNcNaOVnG`));
$(rc4(`yfRM`, `aaddP0j+`));
$(rc4(`dcGC`, `nJW9W5Ke`));
`````


## PST Settled
With rename=true

`````js filename=intro
const a = function $free($$0,$$1,$$2,$$3 ) {
  const b = $$0;
  const c = $$1;
  const d = $$2;
  const e = $$3;
  debugger;
  const f = b % c;
  const g = $dotCall( $string_charCodeAt, d, "charCodeAt", f );
  const h = e + g;
  return h;
};
const i = function $free($$0,$$1 ) {
  const j = $$0;
  const k = $$1;
  debugger;
  const l = j + k;
  const m = l % 256;
  return m;
};
const n = function $free($$0,$$1 ) {
  const o = $$0;
  const p = $$1;
  debugger;
  const q = o ^ p;
  const r = $String_fromCharCode( q );
  return r;
};
const s = function($$0,$$1 ) {
  const t = $$0;
  const u = $$1;
  debugger;
  let v = 0;
  let w = 0;
  const x = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255 ];
  while (true) {
    const y = w < 256;
    if (y) {
      const z = x[ w ];
      const ba = v + z;
      const bb = t.length;
      const bc = bd( a, w, bb, t, ba );
      v = bc % 256;
      const be = x[ w ];
      const bf = x[ v ];
      x[w] = bf;
      x[v] = be;
      w = w + 1;
    }
    else {
      break;
    }
  }
  let bg = "";
  let bh = 0;
  let bi = 0;
  let bj = 0;
  while (true) {
    const bk = atob( u );
    const bl = bk.length;
    const bm = bj < bl;
    if (bm) {
      const bn = bh + 1;
      bh = bn % 256;
      const bo = x[ bh ];
      const bp = bi + bo;
      bi = bp % 256;
      const bq = x[ bh ];
      const br = x[ bi ];
      x[bh] = br;
      x[bi] = bq;
      const bs = $dotCall( $string_charCodeAt, bk, "charCodeAt", bj );
      const bt = x[ bh ];
      const bu = x[ bi ];
      const bv = bd( i, bt, bu );
      const bw = x[ bv ];
      const bx = bd( n, bs, bw );
      bg = `${bg}${bx}`;
      bj = bj + 1;
    }
    else {
      break;
    }
  }
  return bg;
};
const by = s( "s6T^", "W4bWW6pcPSoU" );
$( by );
const bz = s( "eZDG", "WQNcNaOVnG" );
$( bz );
const ca = s( "yfRM", "aaddP0j+" );
$( ca );
const cb = s( "dcGC", "nJW9W5Ke" );
$( cb );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
const freeA = function $free($$0, $$1, $$2, $$3) {
  let a = $$0;
  let b = $$1;
  let c = $$2;
  let d = $$3;
  debugger;
  const tmpBinBothLhs = d;
  let tmpCalleeParam = $string_charCodeAt;
  let tmpCalleeParam$1 = c;
  let tmpCalleeParam$3 = a % b;
  const tmpBinBothRhs = $dotCall(tmpCalleeParam, tmpCalleeParam$1, `charCodeAt`, tmpCalleeParam$3);
  const tmpRet = tmpBinBothLhs + tmpBinBothRhs;
  return tmpRet;
};
const freeB = function $free($$0, $$1) {
  let e = $$0;
  let f = $$1;
  debugger;
  const tmpBinLhs = e + f;
  const tmpRet2 = tmpBinLhs % 256;
  return tmpRet2;
};
const freeC = function $free($$0, $$1) {
  let g = $$0;
  let h = $$1;
  debugger;
  let tmpCalleeParam$5 = g ^ h;
  const tmpRet3 = $String_fromCharCode(tmpCalleeParam$5);
  return tmpRet3;
};
const rc4 = function ($$0, $$1) {
  let key = $$0;
  let str = $$1;
  debugger;
  let stepper1 = 0;
  let counter1 = 0;
  const arr = [
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
    const tmpIfTest = counter1 < 256;
    if (tmpIfTest) {
      const tmpBinBothLhs$1 = stepper1;
      const tmpBinBothRhs$1 = arr[counter1];
      const tmpBinBothLhs$2 = tmpBinBothLhs$1 + tmpBinBothRhs$1;
      let tmpCalleeParam$7 = freeA;
      let tmpCalleeParam$9 = counter1;
      let tmpCalleeParam$11 = key.length;
      let tmpCalleeParam$13 = key;
      let tmpCalleeParam$15 = tmpBinBothLhs$2;
      const tmpBinLhs$1 = $frfr(freeA, tmpCalleeParam$9, tmpCalleeParam$11, tmpCalleeParam$13, tmpBinBothLhs$2);
      stepper1 = tmpBinLhs$1 % 256;
      const arr_val = arr[counter1];
      const arr_val2 = arr[stepper1];
      arr[counter1] = arr_val2;
      arr[stepper1] = arr_val;
      counter1 = counter1 + 1;
    } else {
      break;
    }
  }
  let result = ``;
  let counter2 = 0;
  let stepper2 = 0;
  let pointer = 0;
  while (true) {
    const raw_str = atob(str);
    const tmpBinBothLhs$3 = pointer;
    const tmpBinBothRhs$3 = raw_str.length;
    const tmpIfTest$1 = tmpBinBothLhs$3 < tmpBinBothRhs$3;
    if (tmpIfTest$1) {
      const tmpBinLhs$3 = counter2 + 1;
      counter2 = tmpBinLhs$3 % 256;
      const tmpBinBothLhs$5 = stepper2;
      const tmpBinBothRhs$5 = arr[counter2];
      const tmpBinLhs$5 = tmpBinBothLhs$5 + tmpBinBothRhs$5;
      stepper2 = tmpBinLhs$5 % 256;
      const swap_a = arr[counter2];
      const swap_b = arr[stepper2];
      arr[counter2] = swap_b;
      arr[stepper2] = swap_a;
      const chr = $dotCall($string_charCodeAt, raw_str, `charCodeAt`, pointer);
      let tmpCalleeParam$17 = freeB;
      let tmpCalleeParam$19 = arr[counter2];
      let tmpCalleeParam$21 = arr[stepper2];
      const fra = $frfr(freeB, tmpCalleeParam$19, tmpCalleeParam$21);
      let tmpCalleeParam$23 = freeC;
      let tmpCalleeParam$25 = chr;
      let tmpCalleeParam$27 = arr[fra];
      const frb = $frfr(freeC, tmpCalleeParam$25, tmpCalleeParam$27);
      const tmpBinBothLhs$9 = ``;
      const tmpBinBothRhs$9 = $coerce(result, `string`);
      const tmpBinLhs$9 = tmpBinBothLhs$9 + tmpBinBothRhs$9;
      const tmpBinBothLhs$7 = $coerce(tmpBinLhs$9, `plustr`);
      const tmpBinBothRhs$7 = $coerce(frb, `string`);
      const tmpBinLhs$7 = tmpBinBothLhs$7 + tmpBinBothRhs$7;
      result = $coerce(tmpBinLhs$7, `plustr`);
      pointer = pointer + 1;
    } else {
      break;
    }
  }
  return result;
};
let tmpCalleeParam$29 = rc4(`s6T^`, `W4bWW6pcPSoU`);
$(tmpCalleeParam$29);
let tmpCalleeParam$31 = rc4(`eZDG`, `WQNcNaOVnG`);
$(tmpCalleeParam$31);
let tmpCalleeParam$33 = rc4(`yfRM`, `aaddP0j+`);
$(tmpCalleeParam$33);
let tmpCalleeParam$35 = rc4(`dcGC`, `nJW9W5Ke`);
$(tmpCalleeParam$35);
`````


## Todos triggered


- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) Support string.charCodeAt when the object is not a string literal
- (todo) Support this node type in isFree: DebuggerStatement
- (todo) regular property access of an ident feels tricky;


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 'ñ:°G\u000b¦ë:'
 - 2: 'SlI_'
 - 3: 'ú\u0007Îµ'
 - 4: 'M\tÐ\u000eõ'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
