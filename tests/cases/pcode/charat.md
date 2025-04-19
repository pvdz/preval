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
    [ r1 dotcall $Math_random {r2 -} ]
    [ r3 * r1 - - 62 ]
    [ r4 = $Math_floor - ]
    [ r5 dotcall $Math_floor {r2 -} r3 - ]
    [ r6 = $string_charAt - ]
    [ r7 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r5 - ]
    [ r8 call $coerce {- undefined} r7 - - "plustr" ]
    [ r9 = $Math_random - ]
    [ r10 dotcall $Math_random {r2 -} ]
    [ r11 * r10 - - 62 ]
    [ r12 = $Math_floor - ]
    [ r13 dotcall $Math_floor {r2 -} r11 - ]
    [ r14 = $string_charAt - ]
    [ r15 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r13 - ]
    [ r16 + r8 - r15 - ]
    [ r17 = $Math_random - ]
    [ r18 dotcall $Math_random {r2 -} ]
    [ r19 * r18 - - 62 ]
    [ r20 = $Math_floor - ]
    [ r21 dotcall $Math_floor {r2 -} r19 - ]
    [ r22 = $string_charAt - ]
    [ r23 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r21 - ]
    [ r24 + r16 - r23 - ]
    [ r25 = $Math_random - ]
    [ r26 dotcall $Math_random {r2 -} ]
    [ r27 * r26 - - 62 ]
    [ r28 = $Math_floor - ]
    [ r29 dotcall $Math_floor {r2 -} r27 - ]
    [ r30 = $string_charAt - ]
    [ r31 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r29 - ]
    [ r32 + r24 - r31 - ]
    [ r33 = $Math_random - ]
    [ r34 dotcall $Math_random {r2 -} ]
    [ r35 * r34 - - 62 ]
    [ r36 = $Math_floor - ]
    [ r37 dotcall $Math_floor {r2 -} r35 - ]
    [ r38 = $string_charAt - ]
    [ r39 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r37 - ]
    [ r40 + r32 - r39 - ]
    [ r41 = $Math_random - ]
    [ r42 dotcall $Math_random {r2 -} ]
    [ r43 * r42 - - 62 ]
    [ r44 = $Math_floor - ]
    [ r45 dotcall $Math_floor {r2 -} r43 - ]
    [ r46 = $string_charAt - ]
    [ r47 dotcall $string_charAt {- "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"} r45 - ]
    [ r48 + r40 - r47 - ]
    [ return r48 - ]
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