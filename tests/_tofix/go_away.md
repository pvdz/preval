# Preval test case

# go_away.md

> Tofix > go away
>
> we can simplify this surely

## Input

`````js filename=intro
function f() {
  const tmpSSA_i$51/*:array*/ = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`];
  const tmpSSA_n$37/*:array*/ = [];
  const tmpBinBothRhs$175/*:string*/ = typeof Uint8Array;
  if (`undefined` === tmpBinBothRhs$175) {
    a$27 = Array;
  } else {
    a$27 = Uint8Array;
  }
  const tmpAssignComMemLhsProp$14/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  tmpSSA_n$37[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  tmpSSA_n$37[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  tmpSSA_n$37[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  tmpSSA_n$37[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  tmpSSA_n$37[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  tmpSSA_n$37[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  tmpSSA_n$37[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  tmpSSA_n$37[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  tmpSSA_n$37[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  tmpSSA_n$37[tmpAssignComMemLhsProp$25] = 10;
  let tmpClusterSSA_s$27/*:number*/ = 11;
  while (true) {
    if (tmpClusterSSA_s$27 < 64) {
      const tmpAssignComputedRhs$73 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$27];
      tmpSSA_i$51[tmpClusterSSA_s$27] = tmpAssignComputedRhs$73;
      const tmpAssignComMemLhsProp$26/*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(tmpClusterSSA_s$27);
      tmpSSA_n$37[tmpAssignComMemLhsProp$26] = tmpClusterSSA_s$27;
      tmpClusterSSA_s$27 = tmpClusterSSA_s$27 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13/*:number*/ = `-`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15/*:number*/ = `_`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$15] = 63;


  $(tmpSSA_n$37, tmpSSA_i$51)
};
$(f);
`````

## Settled


`````js filename=intro
const f /*:()=>undefined*/ = function () {
  debugger;
  const tmpBinBothRhs$175 /*:string*/ = typeof Uint8Array;
  const tmpIfTest /*:boolean*/ = `undefined` === tmpBinBothRhs$175;
  if (tmpIfTest) {
    a$27 = Array;
  } else {
    a$27 = Uint8Array;
  }
  const tmpAssignComMemLhsProp$14 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  const tmpSSA_n$37 /*:array*/ = [];
  tmpSSA_n$37[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  tmpSSA_n$37[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  tmpSSA_n$37[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  tmpSSA_n$37[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  tmpSSA_n$37[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  tmpSSA_n$37[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  tmpSSA_n$37[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  tmpSSA_n$37[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  tmpSSA_n$37[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  tmpSSA_n$37[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  tmpSSA_n$37[tmpAssignComMemLhsProp$25] = 10;
  const tmpAssignComMemLhsProp$26 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(11);
  tmpSSA_n$37[tmpAssignComMemLhsProp$26] = 11;
  const tmpAssignComMemLhsProp$1 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(12);
  tmpSSA_n$37[tmpAssignComMemLhsProp$1] = 12;
  const tmpAssignComMemLhsProp$2 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(13);
  tmpSSA_n$37[tmpAssignComMemLhsProp$2] = 13;
  const tmpAssignComMemLhsProp$3 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(14);
  tmpSSA_n$37[tmpAssignComMemLhsProp$3] = 14;
  const tmpAssignComMemLhsProp$4 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(15);
  tmpSSA_n$37[tmpAssignComMemLhsProp$4] = 15;
  const tmpAssignComMemLhsProp$5 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(16);
  tmpSSA_n$37[tmpAssignComMemLhsProp$5] = 16;
  const tmpAssignComMemLhsProp$6 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(17);
  tmpSSA_n$37[tmpAssignComMemLhsProp$6] = 17;
  const tmpAssignComMemLhsProp$7 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(18);
  tmpSSA_n$37[tmpAssignComMemLhsProp$7] = 18;
  const tmpAssignComMemLhsProp$8 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(19);
  tmpSSA_n$37[tmpAssignComMemLhsProp$8] = 19;
  const tmpAssignComMemLhsProp$9 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(20);
  tmpSSA_n$37[tmpAssignComMemLhsProp$9] = 20;
  const tmpAssignComMemLhsProp$10 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(21);
  tmpSSA_n$37[tmpAssignComMemLhsProp$10] = 21;
  let tmpClusterSSA_s$1 /*:number*/ = 22;
  const tmpSSA_i$51 /*:array*/ = [
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
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const tmpIfTest$2 /*:boolean*/ = tmpClusterSSA_s$1 < 64;
    if (tmpIfTest$2) {
      const tmpAssignComputedRhs$1 /*:unknown*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$1];
      tmpSSA_i$51[tmpClusterSSA_s$1] = tmpAssignComputedRhs$1;
      const tmpAssignComMemLhsProp$11 /*:number*/ = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(
        tmpClusterSSA_s$1,
      );
      tmpSSA_n$37[tmpAssignComMemLhsProp$11] = tmpClusterSSA_s$1;
      tmpClusterSSA_s$1 = tmpClusterSSA_s$1 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13 /*:number*/ = `-`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15 /*:number*/ = `_`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$15] = 63;
  $(tmpSSA_n$37, tmpSSA_i$51);
  return undefined;
};
$(f);
`````

## Denormalized
(This ought to be the final result)

`````js filename=intro
$(function () {
  const tmpBinBothRhs$175 = typeof Uint8Array;
  if (`undefined` === tmpBinBothRhs$175) {
    a$27 = Array;
  } else {
    a$27 = Uint8Array;
  }
  const tmpAssignComMemLhsProp$14 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  const tmpSSA_n$37 = [];
  tmpSSA_n$37[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  tmpSSA_n$37[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  tmpSSA_n$37[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  tmpSSA_n$37[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  tmpSSA_n$37[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  tmpSSA_n$37[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  tmpSSA_n$37[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  tmpSSA_n$37[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  tmpSSA_n$37[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  tmpSSA_n$37[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  tmpSSA_n$37[tmpAssignComMemLhsProp$25] = 10;
  const tmpAssignComMemLhsProp$26 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(11);
  tmpSSA_n$37[tmpAssignComMemLhsProp$26] = 11;
  const tmpAssignComMemLhsProp$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(12);
  tmpSSA_n$37[tmpAssignComMemLhsProp$1] = 12;
  const tmpAssignComMemLhsProp$2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(13);
  tmpSSA_n$37[tmpAssignComMemLhsProp$2] = 13;
  const tmpAssignComMemLhsProp$3 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(14);
  tmpSSA_n$37[tmpAssignComMemLhsProp$3] = 14;
  const tmpAssignComMemLhsProp$4 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(15);
  tmpSSA_n$37[tmpAssignComMemLhsProp$4] = 15;
  const tmpAssignComMemLhsProp$5 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(16);
  tmpSSA_n$37[tmpAssignComMemLhsProp$5] = 16;
  const tmpAssignComMemLhsProp$6 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(17);
  tmpSSA_n$37[tmpAssignComMemLhsProp$6] = 17;
  const tmpAssignComMemLhsProp$7 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(18);
  tmpSSA_n$37[tmpAssignComMemLhsProp$7] = 18;
  const tmpAssignComMemLhsProp$8 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(19);
  tmpSSA_n$37[tmpAssignComMemLhsProp$8] = 19;
  const tmpAssignComMemLhsProp$9 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(20);
  tmpSSA_n$37[tmpAssignComMemLhsProp$9] = 20;
  const tmpAssignComMemLhsProp$10 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(21);
  tmpSSA_n$37[tmpAssignComMemLhsProp$10] = 21;
  let tmpClusterSSA_s$1 = 22;
  const tmpSSA_i$51 = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`, `U`, `V`];
  while (true) {
    if (tmpClusterSSA_s$1 < 64) {
      const tmpAssignComputedRhs$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$1];
      tmpSSA_i$51[tmpClusterSSA_s$1] = tmpAssignComputedRhs$1;
      const tmpAssignComMemLhsProp$11 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(tmpClusterSSA_s$1);
      tmpSSA_n$37[tmpAssignComMemLhsProp$11] = tmpClusterSSA_s$1;
      tmpClusterSSA_s$1 = tmpClusterSSA_s$1 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13 = `-`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15 = `_`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$15] = 63;
  $(tmpSSA_n$37, tmpSSA_i$51);
});
`````

## Pre Normal


`````js filename=intro
let f = function () {
  debugger;
  const tmpSSA_i$51 = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`];
  const tmpSSA_n$37 = [];
  const tmpBinBothRhs$175 = typeof Uint8Array;
  if (`undefined` === tmpBinBothRhs$175) {
    a$27 = Array;
  } else {
    a$27 = Uint8Array;
  }
  const tmpAssignComMemLhsProp$14 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  tmpSSA_n$37[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  tmpSSA_n$37[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  tmpSSA_n$37[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  tmpSSA_n$37[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  tmpSSA_n$37[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  tmpSSA_n$37[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  tmpSSA_n$37[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  tmpSSA_n$37[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  tmpSSA_n$37[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  tmpSSA_n$37[tmpAssignComMemLhsProp$25] = 10;
  let tmpClusterSSA_s$27 = 11;
  while (true) {
    if (tmpClusterSSA_s$27 < 64) {
      const tmpAssignComputedRhs$73 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$27];
      tmpSSA_i$51[tmpClusterSSA_s$27] = tmpAssignComputedRhs$73;
      const tmpAssignComMemLhsProp$26 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(tmpClusterSSA_s$27);
      tmpSSA_n$37[tmpAssignComMemLhsProp$26] = tmpClusterSSA_s$27;
      tmpClusterSSA_s$27 = tmpClusterSSA_s$27 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13 = `-`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15 = `_`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$15] = 63;
  $(tmpSSA_n$37, tmpSSA_i$51);
};
$(f);
`````

## Normalized


`````js filename=intro
let f = function () {
  debugger;
  const tmpSSA_i$51 = [`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`];
  const tmpSSA_n$37 = [];
  const tmpBinBothRhs$175 = typeof Uint8Array;
  const tmpIfTest = `undefined` === tmpBinBothRhs$175;
  if (tmpIfTest) {
    a$27 = Array;
  } else {
    a$27 = Uint8Array;
  }
  const tmpAssignComMemLhsProp$14 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$14] = 0;
  const tmpAssignComMemLhsProp$12 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(1);
  tmpSSA_n$37[tmpAssignComMemLhsProp$12] = 1;
  const tmpAssignComMemLhsProp$16 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(2);
  tmpSSA_n$37[tmpAssignComMemLhsProp$16] = 2;
  const tmpAssignComMemLhsProp$17 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(3);
  tmpSSA_n$37[tmpAssignComMemLhsProp$17] = 3;
  const tmpAssignComMemLhsProp$18 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(4);
  tmpSSA_n$37[tmpAssignComMemLhsProp$18] = 4;
  const tmpAssignComMemLhsProp$19 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(5);
  tmpSSA_n$37[tmpAssignComMemLhsProp$19] = 5;
  const tmpAssignComMemLhsProp$20 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(6);
  tmpSSA_n$37[tmpAssignComMemLhsProp$20] = 6;
  const tmpAssignComMemLhsProp$21 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(7);
  tmpSSA_n$37[tmpAssignComMemLhsProp$21] = 7;
  const tmpAssignComMemLhsProp$22 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(8);
  tmpSSA_n$37[tmpAssignComMemLhsProp$22] = 8;
  const tmpAssignComMemLhsProp$24 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(9);
  tmpSSA_n$37[tmpAssignComMemLhsProp$24] = 9;
  const tmpAssignComMemLhsProp$25 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(10);
  tmpSSA_n$37[tmpAssignComMemLhsProp$25] = 10;
  let tmpClusterSSA_s$27 = 11;
  while (true) {
    const tmpIfTest$1 = tmpClusterSSA_s$27 < 64;
    if (tmpIfTest$1) {
      const tmpAssignComputedRhs$73 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`[tmpClusterSSA_s$27];
      tmpSSA_i$51[tmpClusterSSA_s$27] = tmpAssignComputedRhs$73;
      const tmpAssignComMemLhsProp$26 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/`.charCodeAt(tmpClusterSSA_s$27);
      tmpSSA_n$37[tmpAssignComMemLhsProp$26] = tmpClusterSSA_s$27;
      tmpClusterSSA_s$27 = tmpClusterSSA_s$27 + 1;
    } else {
      break;
    }
  }
  const tmpAssignComMemLhsProp$13 = `-`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$13] = 62;
  const tmpAssignComMemLhsProp$15 = `_`.charCodeAt(0);
  tmpSSA_n$37[tmpAssignComMemLhsProp$15] = 63;
  $(tmpSSA_n$37, tmpSSA_i$51);
  return undefined;
};
$(f);
`````

## PST Settled
With rename=true

`````js filename=intro
const a = function() {
  debugger;
  const b = typeof Uint8Array;
  const c = "undefined" === b;
  if (c) {
    a$27 = Array;
  }
  else {
    a$27 = Uint8Array;
  }
  const d = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 0 );
  const e = [];
  e[d] = 0;
  const f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 1 );
  e[f] = 1;
  const g = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 2 );
  e[g] = 2;
  const h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 3 );
  e[h] = 3;
  const i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 4 );
  e[i] = 4;
  const j = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 5 );
  e[j] = 5;
  const k = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 6 );
  e[k] = 6;
  const l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 7 );
  e[l] = 7;
  const m = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 8 );
  e[m] = 8;
  const n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 9 );
  e[n] = 9;
  const o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 10 );
  e[o] = 10;
  const p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 11 );
  e[p] = 11;
  const q = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 12 );
  e[q] = 12;
  const r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 13 );
  e[r] = 13;
  const s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 14 );
  e[s] = 14;
  const t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 15 );
  e[t] = 15;
  const u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 16 );
  e[u] = 16;
  const v = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 17 );
  e[v] = 17;
  const w = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 18 );
  e[w] = 18;
  const x = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 19 );
  e[x] = 19;
  const y = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 20 );
  e[y] = 20;
  const z = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( 21 );
  e[z] = 21;
  let ba = 22;
  const bb = [ "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V" ];
  while ($LOOP_DONE_UNROLLING_ALWAYS_TRUE) {
    const bc = ba < 64;
    if (bc) {
      const bd = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[ ba ];
      bb[ba] = bd;
      const be = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charCodeAt( ba );
      e[be] = ba;
      ba = ba + 1;
    }
    else {
      break;
    }
  }
  const bf = "-".charCodeAt( 0 );
  e[bf] = 62;
  const bg = "_".charCodeAt( 0 );
  e[bg] = 63;
  $( e, bb );
  return undefined;
};
$( a );
`````

## Globals

BAD@! Found 2 implicit global bindings:

Uint8Array, a$27

## Runtime Outcome

Should call `$` with:
 - 1: '<function>'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Post settled calls: Same

Denormalized calls: Same

Todos triggered:
- type trackeed tricks can possibly support resolving the type for calling this builtin symbol: $string_charCodeAt
