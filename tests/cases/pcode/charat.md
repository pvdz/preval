# Preval test case

# charat.md

> Pcode > Charat

## Options

- pcode

## Input

`````js filename=intro
const rngstr = function() {
  const tmpBinBothLhs$7 = Math.random();
  const tmpCalleeParam$5 = tmpBinBothLhs$7 * 62;
  const tmpCalleeParam$6 = Math.floor(tmpCalleeParam$5);
  const tmpBinBothRhs$3 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$6);
  const tmpClusterSSA_o$13 = $coerce(tmpBinBothRhs$3, `plustr`);
  const tmpBinBothLhs$3 = Math.random();
  const tmpCalleeParam$1 = tmpBinBothLhs$3 * 62;
  const tmpCalleeParam$3 = Math.floor(tmpCalleeParam$1);
  const tmpBinBothRhs$1 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$3);
  const tmpClusterSSA_o$1 = tmpClusterSSA_o$13 + tmpBinBothRhs$1;
  const tmpBinBothLhs$4 = Math.random();
  const tmpCalleeParam$2 = tmpBinBothLhs$4 * 62;
  const tmpCalleeParam$4 = Math.floor(tmpCalleeParam$2);
  const tmpBinBothRhs$2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$4);
  const tmpClusterSSA_o$2 = tmpClusterSSA_o$1 + tmpBinBothRhs$2;
  const tmpBinBothLhs$5 = Math.random();
  const tmpCalleeParam$7 = tmpBinBothLhs$5 * 62;
  const tmpCalleeParam$9 = Math.floor(tmpCalleeParam$7);
  const tmpBinBothRhs$4 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$9);
  const tmpClusterSSA_o$3 = tmpClusterSSA_o$2 + tmpBinBothRhs$4;
  const tmpBinBothLhs$6 = Math.random();
  const tmpCalleeParam$8 = tmpBinBothLhs$6 * 62;
  const tmpCalleeParam$10 = Math.floor(tmpCalleeParam$8);
  const tmpBinBothRhs$5 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$10);
  const tmpClusterSSA_o$7 = tmpClusterSSA_o$3 + tmpBinBothRhs$5;
  const tmpBinBothLhs$8 = Math.random();
  const tmpCalleeParam$11 = tmpBinBothLhs$8 * 62;
  const tmpCalleeParam$13 = Math.floor(tmpCalleeParam$11);
  const tmpBinBothRhs$6 = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(tmpCalleeParam$13);
  const tmpClusterSSA_o$8 = tmpClusterSSA_o$7 + tmpBinBothRhs$6;
  return tmpClusterSSA_o$8;
};
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
$(rngstr());
`````


## Pcode output


`````fileintro
rngstr =
    [ r0 = $Math_random - ]
    [ r1 call $Math_random {- undefined} ]
    [ r2 * r1 - - 62 ]
    [ r3 = $Math_floor - ]
    [ r4 call $Math_floor {- undefined} r2 - ]
    [ r5 = $string_charAt - ]
    [ r6 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r4 - ]
    [ r7 call $coerce {- undefined} r6 - - "plustr" ]
    [ r8 = $Math_random - ]
    [ r9 call $Math_random {- undefined} ]
    [ r10 * r9 - - 62 ]
    [ r11 = $Math_floor - ]
    [ r12 call $Math_floor {- undefined} r10 - ]
    [ r13 = $string_charAt - ]
    [ r14 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r12 - ]
    [ r15 + r7 - r14 - ]
    [ r16 = $Math_random - ]
    [ r17 call $Math_random {- undefined} ]
    [ r18 * r17 - - 62 ]
    [ r19 = $Math_floor - ]
    [ r20 call $Math_floor {- undefined} r18 - ]
    [ r21 = $string_charAt - ]
    [ r22 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r20 - ]
    [ r23 + r15 - r22 - ]
    [ r24 = $Math_random - ]
    [ r25 call $Math_random {- undefined} ]
    [ r26 * r25 - - 62 ]
    [ r27 = $Math_floor - ]
    [ r28 call $Math_floor {- undefined} r26 - ]
    [ r29 = $string_charAt - ]
    [ r30 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r28 - ]
    [ r31 + r23 - r30 - ]
    [ r32 = $Math_random - ]
    [ r33 call $Math_random {- undefined} ]
    [ r34 * r33 - - 62 ]
    [ r35 = $Math_floor - ]
    [ r36 call $Math_floor {- undefined} r34 - ]
    [ r37 = $string_charAt - ]
    [ r38 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r36 - ]
    [ r39 + r31 - r38 - ]
    [ r40 = $Math_random - ]
    [ r41 call $Math_random {- undefined} ]
    [ r42 * r41 - - 62 ]
    [ r43 = $Math_floor - ]
    [ r44 call $Math_floor {- undefined} r42 - ]
    [ r45 = $string_charAt - ]
    [ r46 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r44 - ]
    [ r47 + r39 - r46 - ]
    [ return r47 - ]
`````




## Todos triggered


None


## Pcode result


Running function "rngstr":

                                    pcode          =>   eval
 - `rngstr()`                  => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(undefined)`         => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(null)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(true)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(false)`             => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr("")`                => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr("preval")`          => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(0)`                 => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(1)`                 => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(0, 0)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(0, 1)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(1, 0)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
 - `rngstr(1, 1)`              => `"HhOxMW"`       => `"HhOxMW"`        Ok
