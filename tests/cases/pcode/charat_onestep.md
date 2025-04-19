# Preval test case

# charat_onestep.md

> Pcode > Charat onestep

## Options

- pcode

## Input

`````js filename=intro
const rngstr = function() {
  const rand = Math.random();
  const mul = rand * 62;
  const flr = Math.floor(mul);
  const chrt = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`.charAt(flr);
  const cors = $coerce(chrt, `plustr`);
  return cors;
};
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
    [ return r8 - ]
`````




## Todos triggered


None


## Pcode result


Running function "rngstr":

                                    pcode          =>   eval
 - `rngstr()`                  => `"H"`            => `"H"`             Ok
 - `rngstr(undefined)`         => `"H"`            => `"H"`             Ok
 - `rngstr(null)`              => `"H"`            => `"H"`             Ok
 - `rngstr(true)`              => `"H"`            => `"H"`             Ok
 - `rngstr(false)`             => `"H"`            => `"H"`             Ok
 - `rngstr("")`                => `"H"`            => `"H"`             Ok
 - `rngstr("preval")`          => `"H"`            => `"H"`             Ok
 - `rngstr(0)`                 => `"H"`            => `"H"`             Ok
 - `rngstr(1)`                 => `"H"`            => `"H"`             Ok
 - `rngstr(0, 0)`              => `"H"`            => `"H"`             Ok
 - `rngstr(0, 1)`              => `"H"`            => `"H"`             Ok
 - `rngstr(1, 0)`              => `"H"`            => `"H"`             Ok
 - `rngstr(1, 1)`              => `"H"`            => `"H"`             Ok
