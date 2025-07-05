# Preval test case

# go_away.md

> Tofix > go away
>
> we can simplify this surely

## Input

`````js filename=intro
function f() {
  const chars/*:array*/ = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`];
  const index2char/*:array*/ = [];
  const tmpAssignComMemLhsProp$14/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  index2char[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  index2char[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  index2char[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  index2char[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  index2char[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  index2char[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  index2char[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  index2char[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  index2char[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  index2char[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  index2char[tmpAssignComMemLhsProp$25] = 10;
  let tmpClusterSSA_s$27/*:number*/ = 11;
  while (true) {
    if (tmpClusterSSA_s$27 < 64) {
      const tmpAssignComputedRhs$73 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$27];
      chars[tmpClusterSSA_s$27] = tmpAssignComputedRhs$73;
      const tmpAssignComMemLhsProp$26/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(tmpClusterSSA_s$27);
      index2char[tmpAssignComMemLhsProp$26] = tmpClusterSSA_s$27;
      tmpClusterSSA_s$27 = tmpClusterSSA_s$27 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13/*:number*/ = `-`.charCodeAt(0);
  index2char[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15/*:number*/ = `_`.charCodeAt(0);
  index2char[tmpAssignComMemLhsProp$15] = 63;


  $(index2char, chars)
};
$(f());
`````


## Settled


`````js filename=intro
const index2char /*:array*/ /*truthy*/ = [];
index2char[65] = 0;
index2char[66] = 1;
index2char[67] = 2;
index2char[68] = 3;
index2char[69] = 4;
index2char[70] = 5;
index2char[71] = 6;
index2char[72] = 7;
index2char[73] = 8;
index2char[74] = 9;
index2char[75] = 10;
index2char[76] = 11;
index2char[77] = 12;
index2char[78] = 13;
index2char[79] = 14;
index2char[80] = 15;
index2char[81] = 16;
index2char[82] = 17;
index2char[83] = 18;
index2char[84] = 19;
index2char[85] = 20;
index2char[86] = 21;
let tmpClusterSSA_s$1 /*:number*/ = 22;
const chars /*:array*/ /*truthy*/ = [
  `A`,
  `B`,
  `C`,
  `D`,
  `E`,
  `F`,
  `G`,
  `H`,
  `I`,
  `J`,
  `K`,
  `L`,
  `M`,
  `N`,
  `O`,
  `P`,
  `Q`,
  `R`,
  `S`,
  `T`,
  `U`,
  `V`,
];
while ($LOOP_NO_UNROLLS_LEFT) {
  const tmpIfTest$1 /*:boolean*/ = tmpClusterSSA_s$1 < 64;
  if (tmpIfTest$1) {
    const tmpAssignComputedRhs$1 /*:unknown*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$1];
    chars[tmpClusterSSA_s$1] = tmpAssignComputedRhs$1;
    const tmpAssignComMemLhsProp$1 /*:number*/ = $dotCall(
      $string_charCodeAt,
      `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
      `charCodeAt`,
      tmpClusterSSA_s$1,
    );
    index2char[tmpAssignComMemLhsProp$1] = tmpClusterSSA_s$1;
    tmpClusterSSA_s$1 = tmpClusterSSA_s$1 + 1;
  } else {
    break;
  }
}
index2char[45] = 62;
index2char[95] = 63;
$(index2char, chars);
$(undefined);
`````


## Denormalized
(This ought to be the final result)

`````js filename=intro
const index2char = [];
index2char[65] = 0;
index2char[66] = 1;
index2char[67] = 2;
index2char[68] = 3;
index2char[69] = 4;
index2char[70] = 5;
index2char[71] = 6;
index2char[72] = 7;
index2char[73] = 8;
index2char[74] = 9;
index2char[75] = 10;
index2char[76] = 11;
index2char[77] = 12;
index2char[78] = 13;
index2char[79] = 14;
index2char[80] = 15;
index2char[81] = 16;
index2char[82] = 17;
index2char[83] = 18;
index2char[84] = 19;
index2char[85] = 20;
index2char[86] = 21;
let tmpClusterSSA_s$1 = 22;
const chars = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`];
while (true) {
  if (tmpClusterSSA_s$1 < 64) {
    const tmpAssignComputedRhs$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$1];
    chars[tmpClusterSSA_s$1] = tmpAssignComputedRhs$1;
    const tmpAssignComMemLhsProp$1 = $dotCall(
      $string_charCodeAt,
      `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
      `charCodeAt`,
      tmpClusterSSA_s$1,
    );
    index2char[tmpAssignComMemLhsProp$1] = tmpClusterSSA_s$1;
    tmpClusterSSA_s$1 = tmpClusterSSA_s$1 + 1;
  } else {
    break;
  }
}
index2char[45] = 62;
index2char[95] = 63;
$(index2char, chars);
$(undefined);
`````


## PST Settled
With rename=true

`````js filename=intro
const a = [];
a[65] = 0;
a[66] = 1;
a[67] = 2;
a[68] = 3;
a[69] = 4;
a[70] = 5;
a[71] = 6;
a[72] = 7;
a[73] = 8;
a[74] = 9;
a[75] = 10;
a[76] = 11;
a[77] = 12;
a[78] = 13;
a[79] = 14;
a[80] = 15;
a[81] = 16;
a[82] = 17;
a[83] = 18;
a[84] = 19;
a[85] = 20;
a[86] = 21;
let b = 22;
const c = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V" ];
while ($LOOP_NO_UNROLLS_LEFT) {
  const d = b < 64;
  if (d) {
    const e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[ b ];
    c[b] = e;
    const f = $dotCall( $string_charCodeAt, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "charCodeAt", b );
    a[f] = b;
    b = b + 1;
  }
  else {
    break;
  }
}
a[45] = 62;
a[95] = 63;
$( a, c );
$( undefined );
`````


## Normalized
(This is what phase1 received the first time)

`````js filename=intro
let f = function () {
  debugger;
  const chars = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`];
  const index2char = [];
  const tmpMCF = $string_charCodeAt;
  const tmpAssignComMemLhsProp$14 = 65;
  index2char[tmpAssignComMemLhsProp$14] = 0;
  const tmpMCF$1 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$12 = 66;
  index2char[tmpAssignComMemLhsProp$12] = 1;
  const tmpMCF$3 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$16 = 67;
  index2char[tmpAssignComMemLhsProp$16] = 2;
  const tmpMCF$5 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$17 = 68;
  index2char[tmpAssignComMemLhsProp$17] = 3;
  const tmpMCF$7 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$18 = 69;
  index2char[tmpAssignComMemLhsProp$18] = 4;
  const tmpMCF$9 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$19 = 70;
  index2char[tmpAssignComMemLhsProp$19] = 5;
  const tmpMCF$11 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$20 = 71;
  index2char[tmpAssignComMemLhsProp$20] = 6;
  const tmpMCF$13 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$21 = 72;
  index2char[tmpAssignComMemLhsProp$21] = 7;
  const tmpMCF$15 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$22 = 73;
  index2char[tmpAssignComMemLhsProp$22] = 8;
  const tmpMCF$17 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$24 = 74;
  index2char[tmpAssignComMemLhsProp$24] = 9;
  const tmpMCF$19 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$25 = 75;
  index2char[tmpAssignComMemLhsProp$25] = 10;
  let tmpClusterSSA_s$27 = 11;
  while (true) {
    const tmpIfTest = tmpClusterSSA_s$27 < 64;
    if (tmpIfTest) {
      const tmpAssignComputedRhs$73 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$27];
      chars[tmpClusterSSA_s$27] = tmpAssignComputedRhs$73;
      const tmpMCF$21 = $string_charCodeAt;
      const tmpAssignComMemLhsProp$26 = $dotCall(
        $string_charCodeAt,
        `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`,
        `charCodeAt`,
        tmpClusterSSA_s$27,
      );
      index2char[tmpAssignComMemLhsProp$26] = tmpClusterSSA_s$27;
      tmpClusterSSA_s$27 = tmpClusterSSA_s$27 + 1;
    } else {
      break;
    }
  }
  const tmpMCF$23 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$13 = 45;
  index2char[tmpAssignComMemLhsProp$13] = 62;
  const tmpMCF$25 = $string_charCodeAt;
  const tmpAssignComMemLhsProp$15 = 95;
  index2char[tmpAssignComMemLhsProp$15] = 63;
  $(index2char, chars);
  return undefined;
};
let tmpCalleeParam = f();
$(tmpCalleeParam);
`````


## Todos triggered


- (todo) In some (many?) cases the array can access this value so we could move the rhs into the array...
- (todo) Support string.charCodeAt when the arg is not a string literal
- (todo) computed property of a primitive access on an unknown expr;
- (todo) support array reads statement type ExpressionStatement
- (todo) support array reads statement type WhileStatement


## Globals


None


## Runtime Outcome


Should call `$` with:
 - 1: 
  [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    62,
    ,
    62,
    ,
    63,
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
    ,
    ,
    ,
    ,
    ,
    ,
    ,
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
    ,
    ,
    ,
    ,
    63,
    ,
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
  ],
  [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
    'z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '+',
    '/',
  ],

 - 2: undefined
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same
