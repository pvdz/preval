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
    [ r0 call $Math_random - ]
    [ r1 * r0 - - 62 ]
    [ r2 call $Math_floor - - undefined ]
    [ r3 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r4 call $coerce - - "" plustr - ]
    [ r5 call $Math_random - ]
    [ r6 * r5 - - 62 ]
    [ r7 call $Math_floor - - undefined ]
    [ r8 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r9 + r4 - r8 - ]
    [ r10 call $Math_random - ]
    [ r11 * r10 - - 62 ]
    [ r12 call $Math_floor - - undefined ]
    [ r13 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r14 + r9 - r13 - ]
    [ r15 call $Math_random - ]
    [ r16 * r15 - - 62 ]
    [ r17 call $Math_floor - - undefined ]
    [ r18 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r19 + r14 - r18 - ]
    [ r20 call $Math_random - ]
    [ r21 * r20 - - 62 ]
    [ r22 call $Math_floor - - undefined ]
    [ r23 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r24 + r19 - r23 - ]
    [ r25 call $Math_random - ]
    [ r26 * r25 - - 62 ]
    [ r27 call $Math_floor - - undefined ]
    [ r28 call $string_charAt - ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 - - undefined ]
    [ r29 + r24 - r28 - ]
    [ return r29 - ]
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