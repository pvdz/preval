# Preval test case

# charat_only.md

> Pcode > Charat only

## Options

- pcode

## Input

`````js filename=intro
const rng = function() {
  const a = Math.random();
  const b = Math.floor(a);
  return b;
};
$(rng());
`````


## Pcode output


`````fileintro
rng =
    [ r0 = $Math_random - ]
    [ r1 call $Math_random {- undefined} ]
    [ r2 = $Math_floor - ]
    [ r3 call $Math_floor {- undefined} r1 - ]
    [ return r3 - ]
`````




## Todos triggered


None


## Pcode result


Running function "rng":

                                    pcode          =>   eval
 - `rng()`                     => `0`              => `0`               Ok
 - `rng(undefined)`            => `0`              => `0`               Ok
 - `rng(null)`                 => `0`              => `0`               Ok
 - `rng(true)`                 => `0`              => `0`               Ok
 - `rng(false)`                => `0`              => `0`               Ok
 - `rng("")`                   => `0`              => `0`               Ok
 - `rng("preval")`             => `0`              => `0`               Ok
 - `rng(0)`                    => `0`              => `0`               Ok
 - `rng(1)`                    => `0`              => `0`               Ok
 - `rng(0, 0)`                 => `0`              => `0`               Ok
 - `rng(0, 1)`                 => `0`              => `0`               Ok
 - `rng(1, 0)`                 => `0`              => `0`               Ok
 - `rng(1, 1)`                 => `0`              => `0`               Ok
