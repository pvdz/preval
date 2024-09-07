# Preval test case

# simple.md

> Pcode > Simple

## Options

- pcode

## Input

`````js filename=intro
let pcode = function(a, b) {
  return a * b;
};
pcode(5, 20);
pcode(19, 38);
`````

## Pre Normal


`````js filename=intro
let pcode = function ($$0, $$1) {
  let a = $$0;
  let b = $$1;
  debugger;
  return a * b;
};
pcode(5, 20);
pcode(19, 38);
`````

## Pcode output

`````fileintro
pcode =
    [ r0 = $$0 - ]
    [ r1 = $$1 - ]
    [ r2 * r0 - r1 - ]
    [ return r2 - ]
`````

Running function "pcode":

                                    pcode          =>   eval
 - `pcode()`                   => `null`           => `null`            Ok
 - `pcode(undefined)`          => `null`           => `null`            Ok
 - `pcode(null)`               => `null`           => `null`            Ok
 - `pcode(true)`               => `null`           => `null`            Ok
 - `pcode(false)`              => `null`           => `null`            Ok
 - `pcode("")`                 => `null`           => `null`            Ok
 - `pcode("preval")`           => `null`           => `null`            Ok
 - `pcode(0)`                  => `null`           => `null`            Ok
 - `pcode(1)`                  => `null`           => `null`            Ok
 - `pcode(0, 0)`               => `0`              => `0`               Ok
 - `pcode(0, 1)`               => `0`              => `0`               Ok
 - `pcode(1, 0)`               => `0`              => `0`               Ok
 - `pcode(1, 1)`               => `1`              => `1`               Ok
 - `pcode(5, 20)`              => `100`            => `100`             Ok
 - `pcode(19, 38)`             => `722`            => `722`             Ok
